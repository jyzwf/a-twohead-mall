import Vue from 'vue';
import $ from 'webpack-zepto';

import {validate} from '../../js/components/form_valid';
import headerNav from '../../components/header_nav.vue';
import remove_dire from '../../js/directives/remove_content';

	new Vue({
	el:'#flea_login',
	data:{
		login_account:'',
		login_password:'',
        title: '用户登录'
	},
	components:{
		headerNav
	},
	methods:{
		to_login(){
			
		let err_msg = this.form_validation();
		let _this = this;
		if(err_msg){
			alert( err_msg );
			return false;
		}

		let toast = new auiToast({});
		toast.loading({
    		title:"正在登录",
		    duration:2000
		},function(ret){
		    $.ajax({
			  type: 'post',
			  url: 'http://api.tiaozaoj.com/login',
			  data: {
			  		account:_this.login_account,
			  		password:_this.login_password
			  },
			  dataType: 'json',
			  success: function(data){
			  	toast.hide();
			  	if(data.errNum === 0){
			  		window.localStorage.token = data.retData.token;
			  		toast.success({
					    title:"登录成功",
					    duration:2000
					});
			  		if(window.sessionStorage.getItem('passUrl')){
			  			window.location.href = window.sessionStorage.getItem('passUrl');
			  		}else{
			  			window.location.href='/page/my_center/my_center.html';
			  		}
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
                    title:"密码错误",
                    duration:2000
                });
			  }
			})
		});
		},

		form_validation(){
			// 验证表单
			let err_msg = validate.init([
				{
					val:this.login_account,
					task:{
						require:{
							err_msg:'账号不能为空'
						}
					}
				},

				{
					val:this.login_password,
					task:{
						require:{
							err_msg:'密码不能为空'
						},
					}
				}
			]);

			return err_msg;
		}
	}
})
