<template>
	<div class="is_buyer_part1">
    <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-list-in">
		<section class="aui-grid">
		    <div class="aui-row">
                <a href='../my_orders/my_orders.html?type=to_pay' class="aui-col-xs-3 aui-padded-t-10  aui-padded-b-10">
                    <img src="/assets/imgs/forPay.svg" class="aui-iconfont">
                    <div class="aui-grid-label">待付款</div>
                </a> 
        		<a href='../my_orders/my_orders.html?type=to_shipped' class="aui-col-xs-3 aui-padded-t-10  aui-padded-b-10">
        		    <img src="/assets/imgs/order.svg" class="aui-iconfont">
        		    <div class="aui-grid-label">待配送</div>
        		</a>
        		<a href='../my_orders/my_orders.html?type=accept' class="aui-col-xs-3 aui-padded-t-10  aui-padded-b-10">
        		    <img src="/assets/imgs/forReceive.svg" class="aui-iconfont">
        		    <div class="aui-grid-label">待收货</div>
        		</a>

                <a href='../my_orders/my_orders.html?type=success' class="aui-col-xs-3 aui-padded-t-10  aui-padded-b-10">
                    <img src="/assets/imgs/success.svg" class="aui-iconfont">
                    <div class="aui-grid-label">已完成</div>
                </a>
		    </div>
		</section>
        <a class='bind_a' href="../my_orders/my_orders.html?type=all" title="">
                <li class="aui-list-item aui-list-item-middle">    
                    <div class="aui-list-item-inner aui-list-item-arrow">
                            全部订单
                    </div>
                </li>
        </a>
    	</ul>
    	</div>
	</div>
</template>

<style lang='sass'>
    .is_buyer_part1{
        .bind_a{
            display: block
        }
    }
</style>