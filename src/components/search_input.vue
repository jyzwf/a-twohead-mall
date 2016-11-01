<!-- 搜索栏 -->
<template>
	<div class="aui-searchbar" id="search">
	    <div class="aui-searchbar-input flea-search-input aui-border-radius aui-margin-r-0">
	        <img src="/assets/imgs/search.svg" class="aui-iconfont search-icon">
	        <form >
	            <input type="search" @keyup='get_related | debounce 800' @focus='to_saerch' v-model='ser_word' placeholder="请输入你想淘的宝贝" id="search-input">
	        </form>
	        <i class="aui-iconfont aui-icon-close" v-show='ser_word' v-remove_ctx = 'ser_word'></i>
	    </div>

	    <div class="aui-searchbar-cancel aui-margin-r-0" v-show='ser_word' @click='get_search'>搜索</div>
	    <div v-show='tigger_cancel' class="aui-searchbar-cancel aui-margin-r-0" @click='get_result'>取消</div>
	</div>
</template>
<style lang='sass'>
$base-color:#fc4766;
$white:#fff;
	#search{
		position:fixed;
		top: 2.2rem;
		background:$base-color;
		padding-right:0.5rem;

		.aui-searchbar-cancel{
			color:$white;
		}
        input::-webkit-input-placeholder{
            color:#aaa;
        }   
        .search-icon{
            width: 1rem;
            height:1rem;
            margin-bottom: 0.1rem;
        }

        .flea-search-input {
        	padding-right:1rem;
        }
	}
</style>

<script>
import remove_dire from '../js/directives/remove_content';
import $ from 'webpack-zepto';
	export default{
		props:['ser_word','searched','related_lists','cut_related','tigger_cancel'],
		data(){
			return {
				// tigger_cancel:true
			}
		},

		methods:{
			get_result(){
				if(this.searched){
					this.cut_related = false;
					this.tigger_cancel = false;
				}else{
					window.location.href = '../index/index.html';
				}
			},
			get_related(){
				if(this.ser_word.trim()==''){
					this.related_lists = [];
					return ;
				}
				$.get('http://api.tiaozaoj.com/search/related/'+this.ser_word,(data)=>{

					let format_data = JSON.parse(data);

					if(format_data.retMsg=='ok'){
						this.related_lists = format_data.retData;
					}else{
						return false;
					}
				})
			},
			to_saerch(){
				this.tigger_cancel = true;
				this.cut_related = true;
			},
			get_search(){
				this.$dispatch('show_result',this.ser_word);
			}
		}
	}
</script>