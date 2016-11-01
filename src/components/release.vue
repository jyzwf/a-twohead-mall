<!-- 商品发布承载页 -->
<template>
	<div id="release">
		<rel-header :step.sync='sel_step'></rel-header>
		
		<component :is='now_step' :good_msg.sync='rel_msg' keep-alive></component>	
		<div id="qiniu_container">
			<span id="pickfiles"></span>
		</div>


		<footer class="aui-bar aui-bar-tab" id="footer">
		    <div class="aui-bar-tab-item">
		        <div class="aui-bar-tab-label aui-font-size-20" @click='release_msg'>{{next_step}}</div>
		    </div>
		</footer>
	</div>
</template>

<style lang='sass'>
	$base-color:#fc4766;
	$white:#fff;

	#release{
		#qiniu_container{
			display:none;
			z-index:-9
		}
		#footer{
			color:$white;
			background:$base-color;
		}
	}
</style>

<script>
	import fleaHeader from './release_nav';
	import stepFirst from './release_step1';
	import secondFirst from './release_step2';
	import uuid from 'node-uuid';
	// import $ from 'webpack-zepto';
	import {validate} from '../js/components/form_valid';
	import {flea_ajax,toast} from '../js/components/ajax';
	import {flea_get} from '../js/components/get';
	// import {auth} from '../js/components/auth';
	export default{
		data(){
			return{
				sel_step:true,
				uptoken:'',
				rel_msg:{
					type:'',
					description:'',
					name:'',
					number:'',
					sellPrice:'',
					originalPrice:'',
					imgs_collect:[],
                	files_collect:[],
                	img_final:[]
				},
				uploader:null,
				uuid : null,
				is_release:false
			}
		},
		computed:{
			next_step(){
				return this.sel_step ? '下一步' : '发布';
			},
			now_step(){
				return this.sel_step ? 'first' : 'second';
			}
		},
		components: {
 		   relHeader:fleaHeader,

 		   first:stepFirst,

 		   second:secondFirst
 		},

 		methods:{
 			release_msg(){
 					if(this.sel_step){ //如果在选择分类页面，点击跳转到填写信息
 						this.sel_step = false;
 						return ;
 					}

 					if(this.is_release){
 						return false;
 					}

 					this.is_release = true;

 					if(!this.make_valid()){
 						return false;
 					}

 					this.uuid = uuid.v1();

 					let _this = this;
					this.uploader.addFile(this.rel_msg.files_collect);


 			},

 			
 			uploader_img(){
                let _this = this,
                	num = 1;
                            this.uploader = Qiniu.uploader({
                            runtimes: 'html5,flash,html4',    //上传模式,依次退化
                            browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
                            // uptoken_url: 'http://api.tiaozaoj.com/commodity/qiniu_token',  
                            uptoken : _this.uptoken, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成          
                            domain: 'http://image.tiaozaoj.com/',   //bucket 域名，下载资源时用到，**必需**

                            get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                            container: 'qiniu_container',           //上传区域DOM ID，默认是browser_button的父元素，
                            max_file_size: '100mb',           //最大文件体积限制
                            flash_swf_url: 'http://cdn.staticfile.org/Plupload/2.1.1/Moxie.swf',  //引入flash,相对路径
                            max_retries: 3,                   //上传失败最大重试次数
                            dragdrop: false,                   //开启可拖曳上传
                            //drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                            chunk_size: '4mb',                //分块上传时，每片的体积
                            auto_start: false,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                            unique_names:false,
                            save_key: false,
                            init: {
                                'FilesAdded': function(up, files) {
                                	console.log(up)
                                    plupload.each(files, function(file) {
                                        console.log('正在上传');
                                    });

                                    _this.uploader.start();

                                    
                                },
                                'FileUploaded': function(up, file, info) {
                                       var domain = up.getOption('domain');
                                       var res = JSON.parse(info);
                                       console.log(res);
                                       _this.rel_msg.img_final.push(res.key);
                                },
                                'UploadComplete': function() {
                                	
                                       _this.release_commodity();
                                },
                                'Error': function(up, err, errTip) {
                                	_this.uploader.stop();
                                	_this.uploader.splice(0,up.files.length);
                                      alert('图片上传失败');
                                      
                                },
                                'Key': function(up, file) {
                                	
                                	var file_name = file.name.replace(/[\s\S]*\./gi,num+'.');
                                    var key = 'commodity/'+_this.uuid+'-'+file_name;
                                    num++;
                                    return key
                                }
                            }
                        });
						
                },

                make_valid(){		//验证函数
                	let err_msg = validate.init([
						{
							val:this.rel_msg.type,
							task:{
								require:{
									err_msg:'请选择类型'
								}
							}
						},
		
						{
							val:this.rel_msg.name,
							task:{
								require:{
									err_msg:'请输入商品名'
								}
							}
						},

						{
							val:this.rel_msg.description,
							task:{
								require:{
									err_msg:'请输入商品描述'
								}
							}
						},

						{
							val:this.rel_msg.number,
							task:{
								require:{
									err_msg:'请输入商品数量'
								},
								iscount:{
									err_msg:'请输入正确的商品数量'
								}
							}
						},

						{
							val:this.rel_msg.sellPrice,
							task:{
								require:{
									err_msg:'请输入商品售价'
								},
								iscorrect_money:{
									err_msg:'请输入正确的商品价格'
								}
							}
						},

						{
							val:this.rel_msg.originalPrice,
							task:{
								iscorrect_money:{
									err_msg:'请输入正确的商品原价'
								}
							}
						},

						{
							val:this.rel_msg.files_collect,
							task:{
								isempty:{
									err_msg:'请至少选择一张图片'
								}
							}
						}

					]);

					if(err_msg){
						alert( err_msg );
						return false;
					}

					return true;
                },

                release_commodity(){
                	let _this = this;
                	flea_ajax({
						way:'POST',
						url:'http://api.tiaozaoj.com/commodity/release',
						data:{
							category:this.rel_msg.type,
							name:this.rel_msg.name,
							description:this.rel_msg.description,
							number:this.rel_msg.number,
							sellPrice:(+this.rel_msg.sellPrice).toFixed(2),
							originalPrice:(+this.rel_msg.originalPrice).toFixed(2),
							imagesList:this.rel_msg.img_final.join(','),
						},
						cb(data){
							toast.hide();
							// auth.check_ajax_state(data)
						   	if(data.errNum == '0'){
						   		_this.is_release = false;
						   		setTimeout(()=>{
						   			window.location.href = '/page/index/index.html';
						   		},2000);
						   		
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
                }

 		},
 		ready(){
 			let _this = this;
	           	

			flea_get({
				url:'http://api.tiaozaoj.com/commodity/qiniu_token',
				cb(data){
					_this.uptoken = data.retData.qiNiuToken;
	           	     _this.uploader_img();
				},
				errcb(data){
					let format_data = JSON.parse(data.response);
					console.log(format_data)
					if(format_data.errNum == '422'){
						window.sessionStorage.confirmPassUrl = location.href;
						window.location.href='../confirm_stu/confirm_stu.html';
					}
				}
			})           	

 		}

	}
</script>

