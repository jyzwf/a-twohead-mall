<!-- 我是卖家主体 -->
<template>
	<div id="is_seller" v-show='is_auth'>
		<section class="aui-grid">
		    <div class="aui-row">

        		<div class="aui-col-xs-6 aui-padded-t-10  aui-padded-b-10">
        			<a href="../seller_orders/seller_orders.html?type=all" class='flea_seller_orders'>
        		    	<div class="aui-grid-label">订单交易</div>
        		    	<div class="aui-grid-label number">{{seller_data.order}}</div>
        		    </a>
        		</div>

        		<div class="aui-col-xs-6 aui-padded-t-10  aui-padded-b-10">
        			<a class='flea-a' href="../my_focus/my_focus.html?isMy=1">
        		    	<div class="aui-grid-label">粉丝</div>
        		    	<div class="aui-grid-label" number>{{seller_data.follow}}</div>
        		    </a>
        		</div>
		</section>

		<my-goods></my-goods>

	</div>
</template>


<style lang='sass' scoped>
	#is_seller{	
		.flea-a{
			display:block;
		}

		.flea_seller_orders{
			display: block;
		}
	}
</style>

<script>
	import myGoods from './my_goods';
	import {flea_get} from '../js/components/get';

	export default{
		props:['sell_auth'],
		data(){
			return{
				seller_data:{}
			}
		},
		components:{
			myGoods
		},
		computed:{
			is_auth(){
				return this.sell_auth === '2';
			}
		},
		methods:{
			get_data(){
				let _this = this;

				flea_get({
					url:'http://api.tiaozaoj.com/seller/amounts',
					cb(data){
						if(data.retMsg=='ok'){
							_this.seller_data = data.retData
						}
					}
				})
			}
		},
		ready(){
			if(this.sell_auth=='1'){
                var dialog = new auiDialog({});
                dialog.alert({
                        title:"温馨提示",
                        msg:"通过学生认证是否立即认证？",
                        buttons:['否','是']
                    },function(ret){
                    	console.log(ret);
                        if(ret.buttonIndex==2){
                           window.sessionStorage.confirmPassUrl = location.href;
                           window.location.href='../confirm_stu/confirm_stu.html';
                           return false;
                        }
                    })

			}
			this.get_data();
		}
	}
</script>