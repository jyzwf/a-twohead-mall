import $ from 'webpack-zepto';
import Vue from 'vue';
import {operate_close} from '../../js/components/remove_write';
import {validate} from '../../js/components/form_valid';
import {flea_post,toast} from '../../js/components/post';
import headerNav from '../../components/header_nav.vue';
import uuid from 'node-uuid';
import loader from '../../components/loader';

new Vue({
    el:'#flea_reg',
    data:{
        title: '快捷注册'
    },
    components:{
        headerNav,
        loader
    }
})

$(function(){

	var qn_token = '',
		heading_key = '',
		really_heading_img = null,
		uploader = null;

	// 点击叉清楚输入框内容
	$('.close_account').click(function(ev){
		ev.stopPropagation();
		operate_close.remove_all.call(this);
	})

	// 监听输入框显示右边的叉
	$('#user_name').on('input propertychange',function(){
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
	// 完成注册
	$('.flea-register-btn').click(()=>{

		let err_msg = validate.init([
				{
					val:$('#user_name').val(),
					task:{
						require:{
							err_msg:'昵称不能为空'
						}
					}
				},

				{
					val:$('#user_password').val(),
					task:{
						require:{
							err_msg:'密码不能为空'
						},
						min_length:{
							err_msg:'密码不小于6位',
							length:6
						}
					}
				}
			]);

		if(err_msg){
			alert( err_msg );
			return false;
		}

		uploader.addFile(really_heading_img);

		uploader.start();

		
		
	});

	// ajax提交
	function sendRegisterInfo(){
		flea_post({
			url:'http://api.tiaozaoj.com/reg/step/3',
			data:{
				nickname:$('#user_name').val(),
				password:$('#user_password').val(),
				avatar:heading_key
			},
			cb(data){
				toast.hide();
			   	if(data.errNum == '0'){
			   		toast.success({
					    title:data.retMsg,
					    duration:2000
					});
					window.localStorage.token = data.retData.token;
                    var passUrl = window.sessionStorage.passUrl;
					window.location.href = passUrl?passUrl:'/page/index/index.html';
			   	}else{
			   		toast.fail({
                	    title:data.retMsg,
                	    duration:2000
                	});
			   	}
			}
		});
	}

	// 获取上传图片的七牛token
	$.get('http://api.tiaozaoj.com/user/avatar_up_token',(data)=>{
		var data = JSON.parse(data);
		if(data.errNum==0){
			qn_token = data.retData.qiNiuToken;
			upload();
		}
	});

	//上传图片的预览
	$('#heading-file').change(function(e){

	let file = e.target.files[0];
	really_heading_img = file;
	 let reader = new FileReader();

       	reader.onload = function(e) {
       	     $('#user_heading').attr('src',e.target.result).css('object-fit','cover');
       	};
       	reader.readAsDataURL(file);
    })

	// 上传头像

function upload(){
	uploader = Qiniu.uploader({
                        runtimes: 'html5,flash,html4',    //上传模式,依次退化
                        browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
                        uptoken : qn_token, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成          
                        domain: 'http://user.tiaozaoj.com/',   //bucket 
                        get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                        container: 'qiniu_container',           //上传区域DOM ID，默认是browser_button的父元素，
                        max_file_size: '100mb',           //最大文件体积限制
                        flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
                        max_retries: 3,                   //上传失败最大重试次数
                        dragdrop: false,                   //开启可拖曳上传
                        unique_names: true,
                        chunk_size: '4mb',                //分块上传时，每片的体积
                        auto_start: false,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                        init: {
                            'FilesAdded': function(up, files) {
                                plupload.each(files, function(file) {
                                    console.log(file)
                                });
                            },
                            'BeforeUpload': function(up, file) {
                                   // 每个文件上传前,处理相关的事情
                            },
                            'UploadProgress': function(up, file) {
                                   // 每个文件上传时,处理相关的事情
                            },
                            'FileUploaded': function(up, file, info) {
                                   var res = JSON.parse(info);
                                   heading_key = res.key;
                                   sendRegisterInfo();
                            },
                            'Error': function(up, err, errTip) {
                                   alert('头像上传失败')
                            },
                            'Key': function(up, file) {  
                                var file_name = uuid.v1();
                                var file_subfix = file.name.replace(/[\s\S]*\./gi,'.');
                                var key = file_uuid+file_subfix;
                                return key;
                            }
                        }
                    });
}

})