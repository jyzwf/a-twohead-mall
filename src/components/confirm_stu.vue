<!-- 学生认证承载页 -->
<template>
	<div id="confirm_stu">
		<confirm-msg :confirm_msg.sync = 'about_confirm'></confirm-msg>
		<section class="aui-list aui-media-list flea-confirm-action">
             <div class="aui-list-item flea-margin-t-10 aui-list-item-center">
                 <div class="aui-list-item-inner">
                    <button class="aui-btn flea-confirm-btn aui-btn-block aui-btn-sm" :disabled='!about_confirm.schoolId || !about_confirm.stuNo || !about_confirm.stuPwd' @click='begin_confirm'>立即认证</button>
                 </div>
             </div>
        </section>
        
        <div class="aui-content-padded aui-margin-r-15 flea-warning aui-list-item-center">
            <p class='aui-col-xs-12'><small>本认证步骤仅为验证你是否为学生
                  <br>不保存你的账号信息</small></p>
        </div>
	</div>
</template>

<style lang="sass">
	$base-color:#fc4766;
	$white:#fff;
	$bg-color:#fafafa;
	#confirm_stu{
		background:$bg-color;
		.flea-confirm-action{
			&>div{
				background:transparent;
			}
			margin-top:0.5rem;
			&:before,&:after{
				content:none;
			}
		}
		button{
			border:none;
		}

		.flea-confirm-btn{
			background:$base-color;
			color:$white;
		}

		.flea-warning{
			margin-top:0;
			overflow: hidden;
			text-align: center;
			p{
				padding:0 1rem;
			}
		}
	}

</style>

<script>
	import confirmMsg from './confirm_stu_msg';
	import {flea_ajax,toast} from '../js/components/ajax';

	export default{
		components:{
			confirmMsg,
		},
		data(){
			return{
				about_confirm:{
					schoolId:'',
					stuNo:'',
					stuPwd:''
				},
			}
		},
		methods:{
			begin_confirm(){
				// 开始认证
				if(!(/\d+/).test(+this.about_confirm.stuNo)){
					alert('请输入正确的学号');
					return false;
				}
				let _this = this;

				flea_ajax({
                    way:'POST',
                    url:'http://api.tiaozaoj.com/authenticate/roles/student',
                    data:this.about_confirm,
                    cb(data){
                        if(data.errNum===0){
                            toast.success({
                                title:'认证成功',
                                duration:2000
                            });
                            
			  				window.location.href = window.sessionStorage.getItem('confirmPassUrl');
			  				
                        }else{
                            toast.fail({
                                title:'认证失败',
                                duration:2000
                            });
                        }
                    },
                    errcb(data){
                    	let format_data = JSON.parse(data.response);
						console.log(format_data)
						if(format_data.errNum == '403'){
							toast.fail({
            					title:format_data.retMsg,
            					duration:2000
            				});
						}
                    }
                })

			}
		}
	}
</script>