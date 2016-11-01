import $ from 'webpack-zepto';
import {operate_close} from '../../js/components/remove_write';
import {validate} from '../../js/components/form_valid';
import {time_down} from '../../js/components/time_count';
import Vue from 'vue';
import headerNav from '../../components/header_nav.vue';

/*import {flea_ajax,toast} from '../../js/components/ajax';
import {flea_ajax,toast} from '../../js/components/ajax';*/
new Vue({
    el:'#forget_pass',
    data:{
        'title':'忘记密码'
    },
    components:{
        headerNav,
    }
})

$(function(){
	let toast = new auiToast({});
	//倒计时的判断条件
	let flag = {
		judge :false
	};

	let btn_flag = false,
		reset_flag = false;

	// let temp_token;


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


	$('.display_password').click(function(){
		if(!this.t){
			$(this).siblings('.aui-list-item-input').find('input').attr('type','text');
			$(this).find('i').removeClass('aui-icon-hide').addClass('aui-icon-display');
		}else{
			$(this).siblings('.aui-list-item-input').find('input').attr('type','password');
			$(this).find('i').removeClass('aui-icon-display').addClass('aui-icon-hide');
		}

		this.t = !this.t;
		
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
			alert( error_msg );
			return false;
		}

		// 请求的ajax

		toast.loading({
			title:'加载中',
			duration:2000
		},function(ret){
			$.ajax({
			  type: 'POST',
			  url: 'http://api.tiaozaoj.com/forgot_password/step/1',
			  data: {
				target:$('#register_methods').val()
			  },
			  dataType: 'json',
			  crossDomain: true,
			  success: function(data,status,xhr){
			  	toast.hide();
			   	if(data.errNum == '0'){
			   		time_down(60,$('#get_res_code'),flag);
			   		$('#next_step_btn').prop('disabled',false);
			   		
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
			  },
			  error: function(xhr, type){
			    toast.hide();
				toast.fail({
    	        	title:'发送失败',
    	        	duration:2000
    	        });
			  }
			})
		})
	
		})

	// 点击下一步
	$('#next_step_btn').click(()=>{
		
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

		
		if(btn_flag){
			return ;
		}

		btn_flag =true;



		toast.loading({
			title:'验证中',
			duration:2000
		},function(ret){
			$.ajax({
			  type: 'POST',
			  url: 'http://api.tiaozaoj.com/forgot_password/step/2',
			  data: {
				target:$('#register_methods').val(),
				verifyCode:$('#register_code').val()
			},
			  dataType: 'json',
			  crossDomain: true,
			  success: function(data,status,xhr){
			  	toast.hide();
			   	if(data.errNum == '0'){
			   		console.log(data);
			   		$('#next_step').addClass('fade-in');
			   		$('#first_step').addClass('fade-out');
			   		
			   		window.sessionStorage.register_token = data.retData.tempToken;
			   	}else{
			   		toast.fail({
                	    title:data.retMsg,
                	    duration:2000
                	});
			   	}

			   	btn_flag = false;
			  },
			  error: function(xhr, type){
			    toast.hide();
				toast.fail({
    	        	title:'请求失败',
    	        	duration:2000
    	        });

    	        btn_flag = false;
			  }
			})
		})

		
	})




	$('#sure_reset').click(()=>{

		let err_msg = validate.init([
				{
					val:$('#user_password').val(),
					task:{
						require:{
							err_msg:'密码不能为空'
						},
						min_length:{
							err_msg:'密码不小于8位',
							length:8
						}
					}
				}
			]);

		if(err_msg){
			alert( err_msg );
			return false;
		}

		if(reset_flag){
			return ;
		}

		reset_flag =true;

		

		// ajax提交
		toast.loading({
			title:'请求中',
			duration:2000
		},function(ret){
			$.ajax({
			  type: 'POST',
			  url: 'http://api.tiaozaoj.com/forgot_password/step/3',
			  data: {
			  	newPassword:$('#user_password').val()
			  },
			  dataType: 'json',
			  beforeSend:function(request){
		  	   	var msg = window.sessionStorage.getItem('register_token');
          	        request.setRequestHeader('temp-token', msg);
          	  },
			  crossDomain: true,
			  success: function(data,status,xhr){
			  toast.hide();
			  console.log(data);
			   	if(data.errNum == '0'){
			   		toast.success({
					    title:data.retMsg,
					    duration:2000
					});

					window.location.href = '/page/login/login.html'
			   	}else{
			   		toast.fail({
                	    title:data.retMsg,
                	    duration:2000
                	});

                	window.reload(true);
			   	}


			   	reset_flag = false;
			  },
			  error: function(xhr, type){
			  	console.log(xhr)
			    toast.hide();
				toast.fail({
    	        	title:'请求失败',
    	        	duration:2000
    	        });

    	        reset_flag = false;
			  }
			})
		})
		

	})






})