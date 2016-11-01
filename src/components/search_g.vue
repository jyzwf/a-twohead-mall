<!-- 商品发布承载页 -->
<template>
	<div id="release">
		<div class="aui-tips" id="tips" :class='{"active":is_find}'>
		    <i class="aui-iconfont aui-icon-info"></i>
		    <div class="aui-tips-title">未找到该商品</div>
		</div>
		<ser-header :ser_word.sync='search_w' :tigger_cancel.sync= 't_cancel' :cut_related.sync='now_sol' :searched = 'has_search' :related_lists.sync='related_item'></ser-header>
		<search-item v-show='now_sol' :show_related.sync='related_item'></search-item>
		<search-result v-show='!now_sol' :result_lists='result_lists_copy'></search-result>
	</div>
</template>

<style lang='sass'>
	$base-color:#fc4766;
	$white:#fff;

	#release{
		#tips{
			position:fixed;
			justify-content:flex-start;
			transition:all .3s linear;
			top:-1.9rem;
			&.active{
				top:0;
			}
		}
	}
</style>

<script>
	import search_i from './search_input';
	import searchItem from './search_item';
	import searchResult from './search_result';
	import $ from 'webpack-zepto';

	export default{
		data(){
			return{
				now_sol:true,
				search_w:'',
				related_item:[],
				result_lists:[],
				result_lists_copy:[],
				is_find:false,
				t_cancel:true,
				has_search:false
			}
		},
		components: {
 		   serHeader:search_i,
 		   searchItem:searchItem,
 		   searchResult:searchResult
 		},

 		events:{
 			show_result(word){
 				if(word){
 					this.search_w = word;
 				}
				
				let toast = new auiToast({}),
					_this = this;
					
					toast.loading({
						title:'搜索中',
						duration:3000
					},function(ret){
						$.ajax({
						  type: 'get',
						  url: 'http://api.tiaozaoj.com/search/key/'+_this.search_w,
						  dataType: 'json',
						  success: function(data){
						  	toast.hide();
						  	if(data.errNum === 0){
									_this.result_lists = data.retData.resDetail;
									_this.result_lists_copy = data.retData.resDetail.slice();
									_this.now_sol = false;
									_this.t_cancel = false;
									_this.has_search = true;
								}else if(data.errNum == 404) {
									_this.is_find = true;
									setTimeout(()=>{
										_this.is_find = false;
									},1500)
								}
						  },
						  error: function(xhr, type){
						    toast.hide();
                            toast.error({
                                'title':'未找到该商品',
                                duration:3000
                            })
						  }
						})
					})
 			},
 			sort_price(bool){
 				let price_arr = this.result_lists.slice();

				if(bool){	//价格排序
					price_arr.sort((g1,g2)=>{
						return g2.price - g1.price
					})
				}else{		
					price_arr.sort((g1,g2)=>{
						return g1.price - g2.price
					})
				}

				this.result_lists_copy = price_arr;

 			},
 			sort_hot(bool){
 				let price_arr = this.result_lists.slice();

				if(bool){	//热度排序
					price_arr.sort((g1,g2)=>{
						return g2.browsingTimes - g1.browsingTimes
					})
				}else{		
					price_arr.sort((g1,g2)=>{
						return g1.browsingTimes - g2.browsingTimes
					})
				}

				this.result_lists_copy = price_arr;

 			},
 			sort_comprehensive(){	//综合排序
 				let price_arr = this.result_lists.slice();
 				this.result_lists_copy = price_arr;
 			}
 		},

 		methods:{

 		}

	}
</script>

