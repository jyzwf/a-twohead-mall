<!-- 购物车条目 -->
<template>
	<div class="shop_list">
		
		<div v-if='shop_item[0]' class="aui-content aui-margin-b-15">

        	<ul class="aui-list aui-media-list">
            	<li v-for='commodity in shop_item' class="aui-list-item aui-list-item-middle aui-padded-l-10 aui-padded-r-10">
	
            	    <div class="aui-media-list-item-inner">
            	    	<div class="aui-list-item-label flea-checkbox">
        		            <input class="aui-radio flea-radio" v-model='commodity.is_select'  type="checkbox" name="" >
        		         </div>

            	        <div class="aui-list-item-media aui-padded-r-10 aui-padded-l-5" style="width: 3rem;height:3rem">
            	            <img :src="commodity.cover" class="flea-preview aui-list-img-sm">
            	        </div>

            	        <div class="aui-list-item-inner aui-padded-r-10  aui-ellipsis-1">

            	            <div class="aui-list-item-text">
            	                <div class="aui-list-item-title aui-font-size-12 aui-ellipsis-1">{{commodity.name}}</div>
            	            </div>
            	            <div class="aui-list-item-text aui-padded-t-5">
            	                <div class="aui-list-item-title flea-sell-price aui-font-size-16">{{'￥'+commodity.price}}</div>
            	                <div class="aui-list-item-right">

            	                	<img class='flea-operate-good' @click='sub_amount(commodity,$index)' src="/assets/imgs/sub.svg" alt="">
            	                	<span class='aui-margin-l-5 aui-margin-r-5 aui-font-size-16'>{{commodity.buyCount}}</span>
            	                	<img class='flea-operate-good aui-margin-r-5' @click='add_amount(commodity)' src="/assets/imgs/add.svg" alt="">
            	                	<img class='flea-operate-good aui-margin-l-15 ' @click='delete_commodity(commodity,$index)' src="/assets/imgs/delete.svg" alt="">
            	                
            	                </div>
            	            </div>
            	        </div>

            	       
            	    </div>
            	</li>

    	    </ul>
    	</div>

		<div v-if='!shop_item[0]'  class="no_shopping">
			<img src="/assets/imgs/empty-cart.svg" alt="">
			<p>你的购物车空空如也</p>
			<a href='../index/index.html' class="go_shopping">去逛逛</a>
		</div>

	</div>
</template>


<style lang="sass">
$base-color:#fc4766;
	.shop_list{
		.flea-checkbox{
			width:auto;
		}

		.flea-count,.flea-num,.aui-bar-btn-item{
			line-height: 1rem;
			min-height:1rem;
		}

		.flea-preview{
			height:100%;
		}

		.flea-sell-price{
			color:$base-color;
		}

		.flea-count{
			&>div{
				border-color:$base-color;
			}
		}

		.aui-radio:checked{
			background:$base-color;
			border-color:$base-color;
		}

		.flea-operate-good{
			width:0.8rem;
			height:0.8rem;
			cursor: pointer;
		}

		.no_shopping{
			text-align: center;
			padding-top:5rem;

			*{
				font-size: 0.6rem;
			}

			img{
				margin-bottom: 0.6rem;
			}
			a.go_shopping{
				display: inline-block;
				padding:0.2rem 0.8rem;
				border:1px solid $base-color;
				border-radius: 4px;
				margin-top: 0.5rem;
			}
		}

	
	}
</style>

<script>
import {flea_ajax,toast} from '../js/components/ajax';
// import {auth} from '../js/components/auth';
	export default{
		props:['shop_item'],

		methods:{
			add_amount(item){
				if (item.buyCount==item.leftCount) {
					return false;
				};
				flea_ajax({
					way:'POST',
					url:'http://api.tiaozaoj.com/shopping_bag/modify',
					data:{
						commodityId:item.commodityId,
						buyCount:+item.buyCount+1
					},
					cb(data){
						toast.hide();
						// auth.check_ajax_state(data);
					   	if(data.errNum == '0'){
					   		item.buyCount+=1;
					   		
					   		toast.success({
							    title:'增加成功',
							    duration:2000
							});
					   	}else{
					   		toast.fail({
        		        	    title:'增加失败',
        		        	    duration:2000
        		        	});
					   	}
					}
				});	
			},
			sub_amount(item,idx){
				if(item.buyCount==1){
					this.delete_commodity(idx);
					return ;
				}
				// item.buyCount-=1;
				flea_ajax({
					way:'POST',
					url:'http://api.tiaozaoj.com/shopping_bag/modify',
					data:{
						commodityId:item.commodityId,
						buyCount:item.buyCount-1
					},
					cb(data){
						toast.hide();

					   	if(data.errNum == '0'){
					   		item.buyCount-=1;
					   		
					   		toast.success({
							    title:'减少成功',
							    duration:2000
							});
					   	}else{
					   		toast.fail({
        		        	    title:'减少失败',
        		        	    duration:2000
        		        	});
					   	}
					}
				});
			},

			delete_commodity(item,idx){
				let c = confirm('确定要把它从购物袋取出?');
				let _this = this;
				if(c){
					
					flea_ajax({
					way:'POST',
					url:'http://api.tiaozaoj.com/shopping_bag/remove',
					data:{
						commodityId:item.commodityId
					},
					cb(data){
						toast.hide();
					   	if(data.errNum == '0'){
					   		_this.shop_item.splice(idx,1);
					   		toast.success({
							    title:'取出成功',
							    duration:2000
							});
					   	}else{
					   		toast.fail({
        		        	    title:'取出失败',
        		        	    duration:2000
        		        	});
					   	}
					}
				});
				}
			}
		}
	}
</script>