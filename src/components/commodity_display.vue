<!-- 商品展示 -->
<template>
	<div class="commodity_dis">
		<section class="aui-grid flea_show_result aui-margin-t-10 aui-margin-b-15">
    	    <a href='../good_detail/good_detail.html?commodity_id={{commodity.commodityId}}' class="aui-col-xs-6 flea-grid aui-padded-t-0  aui-padded-b-5 aui-margin-b-5" v-for='commodity in detail_commodity'>
    	        <img alt=""  width="180" height="180" v-lazy="commodity.cover">
    	        <div class="aui-grid-label aui-padded-l-5 aui-padded-r-5 aui-ellipsis-1">{{commodity.name}}</div>
    	        <div class="aui-grid-label aui-padded-l-5 aui-padded-r-5 aui-ellipsis-1 flea_sell_info">
    	        	<span class='flea-price aui-font-size-20'>{{'￥' + commodity.price}}
    	        		<del class='aui-font-size-14'>{{'￥' + commodity.originalPrice}}</del></span>
					<span class="aui-img-round flea-show-seller  aui-pull-right" >
						<img class="aui-img-round" :src="commodity.avatar"  alt="">
					</span>
    	        </div>
    	    </a>
		</section>
	</div>
</template>

<style lang='sass'>
$bg-color:#fafafa;
$white:#fff;
$red:red;

	.commodity_dis{
		.flea_show_result{
			padding:4px;
			background:$bg-color;
			img{
				width: 100%;
			}

			.aui-col-xs-6{
				width:calc(50% - 2px);
				&:nth-of-type(odd){
					margin-right:4px;
				}
			}
		}

		.flea-grid{
			font-size:0;
			background:$white;
			display:block;
			.aui-grid-label{
				text-align:left;
			}

			.flea_sell_info{
				margin-top:0 !important;
				span{
					vertical-align:middle;
				}
			}

			.flea-price{
				color:$red;
				del{
					color: #757575;
    				vertical-align: middle;
				}
			}
		}

		.flea-show-seller{
			display: inline-block;
			width:1.5rem;
			height:1.5rem;
			img{
				width:inherit;
				height:inherit;
			}
		}
	}
</style>

<script type="text/javascript">

	export default{
		props:['detail_commodity'],
	
        ready(){
        	// $("img.lazy").lazyload({
         //        effect :"fadeIn"
         //    }); 
        }
	}
    
</script>