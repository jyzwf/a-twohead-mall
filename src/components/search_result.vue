<!-- 搜索结果 -->
<template>
	<div id="search_result">
		<div class="aui-bar aui-bar-btn aui-bar-btn-full">
		    <div @click='sort_comprehensive' class="aui-bar-btn-item flea-nav">综合排序</div>

		    <div @click='sort_price' class="aui-bar-btn-item flea-nav"><i class="aui-iconfont aui-margin-r-5" :class='{"aui-icon-down":price_sort,"aui-icon-top":!price_sort}'></i>价格排序</div>

		    <div @click='sort_hot' class="aui-bar-btn-item flea-nav"><i class="aui-iconfont aui-margin-r-5" :class='{"aui-icon-down":hot_sort,"aui-icon-top":!hot_sort}'></i>热度排序</div>

		</div>
		
		<commodity-dis :detail_commodity='resolut_list_copy'></commodity-dis>
	</div>
</template>

<style lang='sass'>
$white:#fff;
$bg-color:#fafafa;

	#search_result{
		padding-top:2.2rem;
		background:$bg-color;
		*{
			background:$white;
		}

		.flea-nav{
			border-color:#999;
			color:#fc4766;
		}
	}
</style>

<script>
	import commodityDis from './commodity_display';

	export default{
		props:['result_lists'],
		data(){
			return{
				price_sort:true,
				hot_sort:true,
				resolut_list_copy:[],
				page:1
			}
		},
		computed:{
			resolut_list_copy(){
				return this.result_lists.slice(0,this.page*6);
			}
		},
		components:{commodityDis},
		methods:{
			sort_price(){
				this.price_sort = !this.price_sort;
				this.$dispatch('sort_price',this.price_sort);
			},
			sort_hot(){
				this.hot_sort = !this.hot_sort;
				this.$dispatch('sort_hot',this.hot_sort);
			},
			sort_comprehensive(){
				this.$dispatch('sort_comprehensive');
			}
		},
		ready(){
			let container_h ,
				window_h = window.innerHeight,
				diff_h,
				len = Math.ceil(this.result_lists.length/6);
				let old_scroll = 0,
				flag = false;

			let scrollFn = ()=>{
				if(!flag){
					container_h = document.querySelector('#search_result').offsetHeight;
					diff_h = container_h - window_h;
					flag = true;
				}
				let scroll_h = window.scrollY;
				if(old_scroll > scroll_h ){
					return false;
				}	
				
				if(scroll_h >= diff_h){
					window.removeEventListener('scroll', scrollFn);
					this.page += 1 ;
					flag = false;
					window.addEventListener('scroll',scrollFn,false);
				}

				if(this.page>=len){
					  window.removeEventListener('scroll', scrollFn);
				}

				old_scroll = scroll_h;
			};
		},
		destory(){
			window.removeEventListener('scroll', scrollFn);
		}
	}
</script>