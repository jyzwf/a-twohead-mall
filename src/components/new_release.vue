<!-- 最新发布 -->
<template>
	<div id="new_release">

		<div class="aui-content flea_no_input flea-recommend">
		    <ul class="aui-list aui-list-in">
		        <li class="aui-list-header aui-padded-t-0 aui-padded-r-0 aui-padded-b-0">
        		    <div class="aui-list-item-inner">
        		        <div class="aui-list-item-title decoration aui-padded-l-5">最近发布</div>
        		    </div>
        		</li>
		    </ul>
		</div>

		<section class="aui-grid aui-margin-b-15 aui-padded-b-15 new_release">
		    <div class="aui-row">
		            <a href='../good_detail/good_detail.html?commodity_id={{img.commodityId}}' class="aui-col-xs-3" v-for='img in now_group' href=''><img class='half_hight lazy' src='/assets/imgs/lazy.png' :data-original='img.cover' width="100" height="100" /></a>
		    </div>
		</section>
	</div>
</template>

<style lang='sass'>
$white:white;

	#new_release{
		section{
			&>div{
				font-size:0;
			}
			
			a{
				display:inline-block;
				padding:0;

				&:nth-of-type(n-1){
					border-right:2px solid $white;
				}
			}
			img{
				width:100%;
			}
		}
		
	}
</style>

<script>
	import zepto from 'webpack-zepto';
	import lazyload from '../assets/libs/js/lazyload/lazyload.js';
	var $ = require('jquery');
	$(function(){
	    $("img.lazy").lazyload({
	        placeholder:"/assets/imgs/lazy.png",
	        effect :"fadeIn",
	    }); 
	});

	export default{
		data(){
			return {
				now_group:[],
				part_hot:[],
				page:0
			}
		},

		methods:{
			get_data(){
				$.get('http://api.tiaozaoj.com/commodity/latest',(data)=>{

					let format_data = JSON.parse(data);
	
					if(format_data.retMsg=='ok'){
						this.part_hot = format_data.retData;
						this.loop_hots();
					}
				})
			},
			paging(){

				this.now_group = this.part_hot.slice(this.page*4,(this.page+1)*4);
				
				this.page++;
			},

			loop_hots(){
				if(this.page == 5){
					this.page = 0;
					this.get_data();
					return;
				}
				this.paging();
				setTimeout(()=>{
					this.loop_hots()
				},10000)
			}

		},

		ready(){
			this.get_data();
		}
	}
</script>