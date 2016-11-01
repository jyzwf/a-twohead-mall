<!-- 我的订单承载页 -->
<template>
	<div id="my_orders">
        <header-nav :title="title"></header-nav>
		<orders-nav seller='false'></orders-nav>
		<goods-msg seller='false'></goods-msg>
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
    import headerNav from './header_nav';
	export default{
        data(){
            return{
                title: '我的订单'
            }
        },     
		components:{
            headerNav,
			goodsMsg,
			ordersNav,
		},
	}
</script>