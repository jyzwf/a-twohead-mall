<!-- 商品详情底部条 -->
<template>
	<div id="buy_action" >
		<footer class="aui-bar aui-bar-tab" id="footer">
		    <section class="aui-grid">
			    <div class="aui-row">
    				<a href='../index/index.html' class="aui-col-xs-2 aui-padded-t-10 aui-padded-b-5">
    				<img src="/assets/imgs/home.svg" class="aui-iconfont" width="40" height="40">
    				</a>
    				<a href='../shop_car/shopcar.html' class="aui-col-xs-2 aui-padded-t-10 aui-padded-b-5">
    				<div :class='{"aui-badge":islogin}'>{{buy_count}}</div>
    				    <embed src="/assets/imgs/bag.svg" class="aui-iconfont" width="40" height="40">
    				</a>
    				<button :disabled='is_seller' @click='add_shop_car' class="aui-col-xs-4 aui-padded-t-10 flea-border-left flea-add-shopcar aui-padded-b-10">
    				    <div class="aui-grid-label">放入购物袋</div>
    				</button>
    				<button  @click='go_settlement'  class="aui-col-xs-4 aui-padded-t-10 flea-border-left flea-buy-now aui-padded-b-10">
    				    <div class="aui-grid-label">立即购买</div>
    				</button>
			</section>
		</footer>
		
	</div>
</template>

<style lang='sass'>
$border-color:#ddd;
$base-color:#fc4766;
$add-car:#f23030;
$white:#fff;

	#buy_action{
		footer{
			button{
				outline:none;
				border-radius:0;
			}
			border-top: 1px solid $border-color;
			
			a{
				display:block;
			}
			.flea-badge{
				background:$base-color;
			}
			.flea-border-left{
				color:$white;

				&.flea-add-shopcar{
					background:$base-color;
                    border: solid #fc4766;
				}

				&.flea-buy-now{
					background:$add-car;
					display:block;
                    border: solid #f23030;
				}
			}
		}
	}
</style>


<script type="text/javascript">
import {flea_get} from '../js/components/get';
import {flea_ajax,toast} from '../js/components/ajax';

	export default{
		props:['commodity_act','is_seller'],
		data(){
			return{
				buy_count:'',
				islogin:false
			}
		},
		methods:{
			add_shop_car(){
				let _this = this;
				if(this.is_seller){
                    alert('无法添加自己的宝贝到购物袋哦');
					return;
				}

				flea_ajax({
					way:'POST',
					url:'http://api.tiaozaoj.com/shopping_bag/add',
					data:{
						commodityId:_this.commodity_act.commodityId
					},
					cb(data){
						toast.hide();
					   	if(data.errNum == '0'){
					   		toast.success({
							    title:'添加成功',
							    duration:2000
							});
							_this.buy_count = +_this.buy_count+1;
					   	}else{
					   		toast.fail({
        		        	    title:'添加失败',
        		        	    duration:2000
        		        	});
					   	}
					}
				});	
			},
			go_settlement(){
				if(this.is_seller){
                    alert('无法购买自己的宝贝哦');
					return;
				}
				window.sessionStorage.billing_items = JSON.stringify(this.commodity_act);
				window.sessionStorage.is_car = false;
				window.location.href = '../buy_now/buy_now.html';
			}
		},
		ready(){
			let _this = this;
            flea_get({
              url:'http://api.tiaozaoj.com/shopping_bag/count',
              unAuth:1,
              cb(data){
               	if(data.retMsg=='ok'){
               		_this.buy_count = data.retData.count;
               		_this.islogin = true;
				}
              },
              errcb(data){
              	_this.islogin = false;
              }
            })
		}
	}
</script>