<!-- 我是卖家的订单承载页 -->
<template>
	<div id="my_orders">
		<!-- <div id="my_goods"> -->
		<header class="aui-bar aui-bar-nav flea_bar_nav">
		    <a href='../my_center/my_center.html' class="aui-pull-left aui-btn">
		        <span class="aui-iconfont aui-icon-left"></span>
		    </a>
		    <div class="aui-title">订单交易</div>
		</header>
		
		<orders-nav seller='true'></orders-nav>

		<goods-msg seller='true'></goods-msg>
	</div>
</template>



<style lang='sass'>
$base-color:#fc4766;
$white:#fff;
	#my_orders{
		margin-bottom:3rem;
		.flea_bar_nav{
			background:$base-color;
		}
		
	}
</style>

<script>
	import goodsMsg from './goods_msg';
	import ordersNav from './orders_nav';
	import footerNav from './bottom_nav';
	export default{
		components:{
			goodsMsg,
			ordersNav,
			footerNav
		},
		ready(){
			console.log(location.search);
		}
	}
</script>