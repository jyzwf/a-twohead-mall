<!-- 购物车承载页 -->
<template>
	<div id="shopping">
		
		<shop-item v-if='show_flag' :shop_item.sync='shop'></shop-item>

		<footer v-if='shop[0]' class="aui-bar flea-settlement aui-bar-tab aui-grid">
		    <ul class="aui-list">
            
            <li class="aui-list-item">
                <div class="aui-list-item-inner flea-left">
                    	<div class="aui-list-item-title">
                    		<label>
                    			<input class="aui-radio flea-radio aui-margin-r-5" :disabled='!shop.length' v-model='select_all' type="checkbox" name="radio2" >全选
                    		</label>
                    	</div>
						
						<div class="aui-list-item-right">
                    	    <div class="aui-list-item-text">{{'合计：'+sum_money}}</div>
                		</div>
                </div>

                <button @click='to_settle' :disabled="amount==0" class="aui-list-item-inner flea-right  aui-padded-l-15 aui-padded-r-15">
						<div class="aui-list-item-text" >
                    	    结算( {{amount}} )
                		</div>
                </button>
            </li>
            
        </ul>
		</footer>
	</div>
</template>

<style lang='sass'>
$base-color:#fc4766;
$white:#fff;
	#shopping{
		margin-bottom:6rem;
		.flea-radio{
			width:1rem;
			height:1rem;
		}

		.flea_bar_nav{
			background:$base-color;
		}
		.flea-settlement{

			text-align:inherit;
			ul:after,li:after{
				content:none;
			}
		}

		.flea-left,.flea-right{
			width:auto;
		}

		.flea-left{
			flex:auto;
		}

		.flea-right{
			background:$base-color;
			border:0.5rem solid $base-color;
			outline:none;
			border-radius:0;
			div{
				color:$white;
			}
		}

		.aui-radio:checked{
			background:$base-color;
			border-color:$base-color;
		}
	}
</style>

<script>
	import shopItem from './shop_item';
	import {flea_get} from '../js/components/get';
	
	export default{
		components:{
			shopItem,
		},
		data(){
			return{
				shop:[],
				show_flag:false,
			}
		},
		computed:{
			select_all:{
				get(){
					if(!this.shop.length){
						return false;
					}

					for(let val in this.shop){
						if(!this.shop[val].is_select){
							return false;
						}
					}

					return true;
				},
				set(val){
					this.shop.map((x)=>{
						x.is_select = val;
					})
				}
			},
			sum_money(){
				let count=0;
				for(let val in this.shop){
						if(this.shop[val].is_select){
							count+=this.shop[val].buyCount*this.shop[val].price;
						}
					}
				return (+count).toFixed(2);
			},
			amount(){
				let num=0;
				// console.log(this.shop.values());
				for(let val in this.shop){
						if(this.shop[val].is_select){
							num+=this.shop[val].buyCount;
						}
					}
				return num;
			}
		},
		methods:{
			get_commodities(){
				let _this = this;

				flea_get({
					url:'http://api.tiaozaoj.com/shopping_bag/all',
					cb(data){
						if(data.retMsg=='ok'){
							data.retData.map((x)=>{
								x.is_select = false;
							});
							_this.show_flag = true;
							_this.shop = data.retData;

						}
					},
					errcb(data){
						var data = JSON.parse(data.response);
						
					}
				})
			},
			to_settle(){
				if(this.amount==0){
					return ;
				}
				let settle_items = [];

				for(let val in this.shop){
					if(this.shop[val].is_select){
						settle_items.push(JSON.stringify(this.shop[val]));
					}
				};

				window.sessionStorage.billing_items = settle_items.join('&');
				window.sessionStorage.is_car = true;
				window.location.href = '../buy_now/buy_now.html';
			}
		},
		ready(){
			this.get_commodities();
		}
	}
</script>
