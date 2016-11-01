<!-- 我的商品承载页 -->
<template>
	<div id="my_goods">
		<div v-if='my_goods[0]' class="aui-card-list aui-margin-t-15" v-for='good in my_goods'>
            <div class="aui-card-list-header flea-non-divide aui-card-list-user aui-border-b">
                
                <div class=" aui-card-list-user-name">
                    <div>{{good.name}}</div>
                    <small class='flea-state' @click='delete_goods(good.commodityId,$index)'><i class="aui-iconfont aui-icon-trash"></i></small>
                </div>

                <p class='aui-font-size-12'>{{good.description}}</p>
            </div>
			
			<section class="aui-grid aui-margin-b-15">
			    <div class="aui-row">
			       <div class="aui-col-xs-4 flea-good-pic" v-for='img in good.imageList'>
			       	<img :src="img" alt="">
			       </div>
			        
			    </div>
			</section>
           
            <div class="aui-card-list-footer aui-border-t flea-money aui-padded-t-0 aui-padded-b-0">
                <div><small>共{{good.leftCount}}件商品  单价￥{{good.price}}</small></div>
            </div>
        </div>

		<div v-if='!my_goods[0]' class="no_goods">
			 <img src="/assets/imgs/ic-no-fans-copy.svg" alt="">
                <p>你还没有发布商品哦</p>
		</div>
	</div>
</template>

<style lang='sass'>
$base-color:#fc4766;
$white:#fff;
	#my_goods{
		margin-bottom:3rem;

		.flea-non-divide{
			&:after{
				content:none;
			}
		}
		.flea-good-pic{
			padding: 0 0.2rem;
			margin-bottom: 10px;
			img{
				width:100%;
			}	
		}

		.flea-money{
            min-height: 1.5rem;
            justify-content: flex-end;
        }

        .no_goods{
            text-align: center;
            padding-top:2rem;

            *{
                font-size: 0.6rem;
            }

            img{
                margin-bottom: 0.6rem;
            }
    }
	}
</style>

<script>

import {flea_get} from '../js/components/get';
import {flea_ajax,toast} from '../js/components/ajax';
	export default{
		data(){
			return {
				my_goods:[]
			}
		},
		methods:{
			delete_goods(id,idx){
				let t = confirm('你确定要删除该商品吗?'),
					_this = this;
				if(t){
					flea_ajax({
					way:'post',
					url:'http://api.tiaozaoj.com/commodity/'+id+'/delete',
					data:{},
					cb(data){
						toast.hide();
					   	if(data.errNum == '0'){
					   		toast.success({
							    title:'删除成功',
							    duration:2000
							});

					   		_this.my_goods.splice(idx,1);

					   	}else{
					   		toast.fail({
        		        	    title:'删除失败,请稍后再试',
        		        	    duration:2000
        		        	});
					   	}
					}
				});	
				}
			}
		},
		ready(){
			let _this = this;
			flea_get({
				url:'http://api.tiaozaoj.com/commodity/my',
				cb(data){
					if(data.retMsg=='ok'){
						_this.my_goods = data.retData
					}
				}
			})
		}
	}
</script>