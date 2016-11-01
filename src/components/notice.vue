<!-- 公告 -->
<template>
	<div id="notice" v-if='remove'>
		
		<div class="aui-bar aui-bar-nav">
		    <a class="aui-pull-left aui-btn">
		        <img src='/assets/imgs/ic_volume_up.svg' class="flea-notice-icon aui-iconfont aui-icon-menu" />
		    </a>
		    <div class="aui-title n_msg">{{notice_msg}}</div>
		    <a @click.prevent='close' class="aui-pull-right aui-btn">
		        <span class="flea-notice-icon aui-iconfont aui-icon-close"></span>
		    </a>
		</div>

	</div>
</template>


<style lang='sass'>
$gray : #bdbdbd;
$white:#fff;

	#notice{
			&>div{
				background:$white;
			}
			
			.n_msg{
				font-size:0.8rem;
				color:$gray;
				left:2rem;
				right:2rem;
				text-align:left;
			}


           .flea-notice-icon{
				color:$gray;
				font-weight: bold;
           }

	}
</style>

<script>
	import $ from 'webpack-zepto';

	export default{
		data(){
			return{
				remove:true,
				notice_msg:''
			}
		},

		methods:{
			close(){
				this.remove = false;
			},
			get_data(){
				$.get('http://api.tiaozaoj.com/index/notice',(data)=>{
					let format_data = JSON.parse(data);
					if(format_data.retMsg=='ok'){
						this.notice_msg = format_data.retData.msg;
					}
				})
			}
		},
		ready(){
			this.get_data();
		}
	}
</script>

