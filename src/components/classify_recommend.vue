<!-- 分类推荐 -->
<template>
	<div class="recommend" v-for='classify in classify_data'>
		<div class="aui-content flea_no_input flea-recommend">
		    <ul class="aui-list aui-list-in">
		        <li class="aui-list-header aui-padded-t-0 aui-padded-r-0 aui-padded-b-0">
        		    <div class="aui-list-item-inner">
        		        <div class="aui-list-item-title decoration aui-padded-l-5">{{$key}}</div>
        		    </div>
        		</li>
		    </ul>
		</div>
		<commodity-dis :detail_commodity = 'classify'></commodity-dis>
	</div>
</template>

<style lang='sass'>
	.recommend{
		.commodity_dis{
			&>section{
				margin-top:0 !important;
			}
		}
	}
</style>

<script>
	import commodityDis from './commodity_display';
	export default{
		components:{commodityDis},
		data(){
			return {
				classify_data:null
			}
		},
		methods:{
			get_data(){
				$.get('http://api.tiaozaoj.com/commodity/category_suggest',(data)=>{

					let format_data = JSON.parse(data);
					if(format_data.retMsg=='ok'){
						this.classify_data = format_data.retData;
					}
				})
			}
		},
		ready(){
			this.get_data();
		}
	} 
</script>