<!-- 搜索结果条目以及历史热门搜索 -->
<template>
	<div id="search_item">
		<div class="aui-content aui-margin-b-15" v-show='show_related[0]'>
		    <ul class="aui-list aui-list-in">
		        <li class="aui-list-item" @click='display_item(item)' v-for='item in show_related'>
		            <div class="aui-list-item-inner">
		                {{item}}
		            </div>
		        </li>
		    </ul>
		</div>
		
		<div class="aui-content flea_no_input flea-recommend" v-show='!show_related[0]'>
		    <ul class="aui-list aui-list-in" v-show='ser_his[0]'>
		        <li class="aui-list-header aui-padded-t-0 aui-padded-r-0 aui-padded-b-0">
        		    <div class="aui-list-item-inner">
        		        <div class="aui-list-item-title decoration aui-padded-l-5">历史搜索</div>
        		        <div class="aui-list-item-right" v-if="ser_his[0]" @click='remove_his'>清除记录</div>
        		    </div>
        		</li>

        		<li class="aui-list-item" >
        		    <div class="aui-list-item-inner flea-select-type" >
        		        <span class="aui-btn aui-btn-info aui-margin-l-10 aui-margin-b-10  aui-btn-outlined" @click='display_item(item)' v-for='item in ser_his' >{{item}}</span>
        		    </div>
        		</li>

		    </ul>

		    <ul class="aui-list aui-list-in" >
		        <li class="aui-list-header aui-padded-t-0 aui-padded-r-0 aui-padded-b-0">
        		    <div class="aui-list-item-inner">
        		        <div class="aui-list-item-title decoration aui-padded-l-5">热门搜索</div>
        		    </div>
        		</li>

        		<li class="aui-list-item" >
        		    <div class="aui-list-item-inner flea-select-type" >
        		        <span class="aui-btn aui-margin-l-10 aui-margin-b-10  aui-btn-outlined" @click='display_item(item)' v-for='item in ser_hot' >{{item}}</span>
        		    </div>
        		</li>

		    </ul>
		</div>


	</div>
</template>

<style lang="sass">
$base-color:#fc4766;
$white:#fff;
$black:#000;
	#search_item{
		position:fixed;
		left:0;
		right:0;
		bottom:0;
		top: 4.5rem;
		.flea_no_input{
			*{
				background: $white;
				&:after,&:before{
					content:none;
				}
			}
		}
		
		.decoration{
			border-left:3px solid $base-color;
		}

		.flea-select-type{
			flex-wrap:wrap;
			justify-content:flex-start;	
			align-items:flex-start;

			span{
				padding:2px 13px;
				color:#666666 !important;
				// border-color:$base-color !important;
                font-size: 0.6rem;
			}
		}

	}
</style>

<script>
import $ from 'webpack-zepto';

	export default{
		props:['show_related'],
		data(){
			return {
					'ser_his':[],
					'ser_hot':[]
			}
		},
		methods:{
			remove_his(){
				this.ser_type.ser_his=[];
			},

			display_item(item){
				this.$dispatch('show_result',item);
			}
		},
		ready(){
			$.get('http://api.tiaozaoj.com/search/hot',(data)=>{

					let format_data = JSON.parse(data);

					if(format_data.retMsg=='ok'){
						this.ser_hot = format_data.retData;
					}
				})
		}
	}
</script>	