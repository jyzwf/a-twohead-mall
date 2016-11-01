import $ from 'webpack-zepto';
import Vue from 'vue';
import {operate_close} from '../../js/components/remove_write';
import {validate} from '../../js/components/form_valid';
import {time_down} from '../../js/components/time_count';
import {flea_ajax,toast} from '../../js/components/ajax';
import headerNav from '../../components/header_nav.vue';

new Vue({
	el:'#flea_reg',
	data:{
		title:'快捷注册'
	},
	components:{
		headerNav,
	}
})

$(function(){
	//倒计时的判断条件
	let flag = {
		judge :false
	};

	//判断是否为手机或邮箱
	let p_e = (str)=>{
		return str.indexOf('@') == -1 ? {'type':'isphone','msg':'手机号格式不正确'}:{'type':'ismail','msg':'邮箱格式不正确'};
	}

	// 点击叉清楚输入框内容
	$('.close_account').click(function(ev){
		ev.stopPropagation();
		operate_close.remove_all.call(this);
	})

	// 监听输入框显示右边的叉
	$('input').on('input propertychange',function(){
		operate_close.display_close.call(this);
	})


// 点击获取验证码
	$('#get_res_code').click(()=>{
		console.log(flag.judge);
		if(flag.judge){
			return false;
		}
		let sure = p_e($('#register_methods').val());

		// 要验证的对象
		let validate_arr = [
				{
					val:$('#register_methods').val(),
					task:{
						require:{
							err_msg:'手机号或邮箱不能为空'
						}
					}
				}
			];

			// 增加手机号或邮箱的验证
			validate_arr[0].task[sure.type] = {
				err_msg:sure.msg
			};

			// 开始验证
		let error_msg = validate.init(validate_arr);

		if(error_msg){
			return false;
		}

		// 请求的ajax
		flea_ajax({
			way:'POST',
			url:'http://api.tiaozaoj.com/reg/step/1',
			data:{
				target:$('#register_methods').val()
			},
			cb(data){
				toast.hide();
			   	if(data.errNum == '0'){
			   		time_down(60,$('#get_res_code'),flag);
			   		$('.flea-register-btn').prop('disabled',false);
			   		
			   		toast.success({
					    title:data.retMsg,
					    duration:2000
					});
			   	}else{
			   		toast.fail({
                	    title:data.retMsg,
                	    duration:2000
                	});
			   	}
			}
		});		
	
		})

	// 点击下一步
	$('.flea-register-btn').click(()=>{
		let sure = p_e($('#register_methods').val());
		// 要验证的对象
		let validate_arr = [
				{
					val:$('#register_methods').val(),
					task:{
						require:{
							err_msg:'手机号或邮箱不能为空'
						}
					}
				},

				{
					val:$('#register_code').val(),
					task:{
						require:{
							err_msg:'验证码不能为空'
						},
						isNum:{
							err_msg:'验证码为6位数字'
						}
					}
				}
			];

		// 增加手机号或邮箱的验证
		validate_arr[0].task[sure.type] = {
				err_msg:sure.msg
		};

		// 开始验证
		let err_msg = validate.init(validate_arr);

		if(err_msg){
			alert( err_msg );
			return false;
		}

		
		flea_ajax({
			way:'POST',
			url:'http://api.tiaozaoj.com/reg/step/2',
			data:{
				target:$('#register_methods').val(),
				verifyCode:$('#register_code').val()
			},
			cb(data){
				toast.hide();
			   	if(data.errNum == '0'){
			   		toast.success({
                	    title:'验证成功',
                	    duration:2000
                	});
			   		window.sessionStorage.register_token = data.retData.tempToken;
			   		// console.log(window.sessionStorage.getItem('register_token'));
			   		window.location.href = '/page/register/register_step2.html';
			   	}else{
			   		toast.fail({
                	    title:data.retMsg,
                	    duration:2000
                	});
			   	}
			}
		});

		
	})

})