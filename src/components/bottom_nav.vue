<!-- 导航 -->
<template>
	<footer class="aui-bar aui-bar-tab">
	    <a href='../index/index.html' class="aui-bar-tab-item" :class="{'flea-active':isactive==1}">
	        <img src="/assets/imgs/home.svg" class="aui-iconfont" width="40" height="40">
	        <div class="aui-bar-tab-label">首页</div>
	    </a>

	    <a href="../shop_car/shopcar.html" class="aui-bar-tab-item " :class="{'flea-active':isactive==2}">
	        <img src="/assets/imgs/bag.svg" class="aui-iconfont" width="40" height="40">
	        <div class="aui-bar-tab-label">购物袋</div>
	    </a>
		<a href='../release/release.html' class="aui-bar-tab-item flea-add">
	         <img src="/assets/imgs/add.svg" class="aui-iconfont" style="    margin-bottom: 0.5rem;">
	    </a>

	    <a href='../my_orders/my_orders.html?type=all' class="aui-bar-tab-item" :class="{'flea-active':isactive==3}">
	         <img src="/assets/imgs/order.svg" class="aui-iconfont" width="40" height="40">
	        <div class="aui-bar-tab-label">订单</div>
	    </a>
	    
	    <a href='../my_center/my_center.html' class="aui-bar-tab-item" :class="{'flea-active':isactive==4}">
	        <img src="/assets/imgs/person.svg" class="aui-iconfont" width="40" height="40">
	        <div class="aui-bar-tab-label">我的</div>
	    </a>
	</footer>
</template>


<style lang="sass">
$border-color:#ddd;
$main-color:#fc4766;
	footer{
		border-top: 1px solid $border-color;
		padding: 0.2rem 0;
		
		.flea-add{
			border: 1px solid $border-color;
			border-width:0 1px;
		}

		.flea-active{
			color:$main-color;
		}

		.flea-active .aui-iconfont {
			fill:$main-color;
		}

		.transform-group{
			fill:#fc4766;
		}
	}
</style>

<script>

	export default{
		props:['isactive']
	}
</script>