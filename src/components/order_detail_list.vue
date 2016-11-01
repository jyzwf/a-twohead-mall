<template>
	<div id="orders_detail_lists">
			<div class="buy_msg aui-margin-b-15">
		<div class="aui-content">
    	    <ul class="aui-list aui-media-list">
            <li class="aui-list-item aui-list-item-middle">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img :src="order_goods.cover+'?imageView2/1/w/64/h/64/format/webp/interlace/1/q/100
                        '" class=" aui-list-img-sm">
                    </div>
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title aui-font-size-14">{{order_goods.commodityName}}</div>
                            <div class="aui-list-item-right flea-num-price">￥{{order_goods.totalPrice}}</br>x{{order_goods.buyCount}}</div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

        <ul class="aui-list aui-list-in">
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-title aui-font-size-14">货到付款</div>
                    <div class="aui-list-item-right aui-font-size-16">实付款 : ￥{{order_goods.totalPrice}}</div>
                </div>
            </li>

            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-title aui-font-size-14">联系卖家</div>
                    <div class="aui-list-item-right aui-font-size-14"><a href="tel:{{order_goods.contact}}"></a>{{order_goods.contact}}</div>
                </div>
            </li>
        </ul>
    	</div>
	</div>
</template>

<style lang='sass'>
	#orders_detail_lists{
		ul{
			&:after{
				content:none;
			}

            .flea-num-price{
                text-align:right;
            }

            .flea-avator{
                width:1rem;
                height:1rem;
            }

            .flea-cover{
                width:auto;
                img{
                    width:2.5rem;
                    height:2.5rem;
                }
            }
		}
	}
</style>

<script>
    export default{
        props:['order_goods']
    }
</script>