<!-- 商品详情承载页 -->
<template>
	<div id="good_detail">
        <loader></loader>
		<!-- 轮播 -->
    <carousel :commodity_cover = 'commodity_msg.imagesList'></carousel>
		<!-- <carousel :commodity_cover = 'index_pics'></carousel> -->
<!-- 介绍1 -->
		<div class="aui-content aui-margin-b-15">
   		    <ul class="aui-list aui-media-list">
   		        <li class="aui-list-item ">
   		            <div class="aui-media-list-item-inner">
   		                <div class="aui-list-item-inner">

   		                	<div class="aui-list-item-text flea-good-intr aui-ellipsis-2">{{commodity_msg.name}}</div>
   		                    <div class="aui-list-item-text aui-margin-t-5">
   		                        <div class="aui-list-item-title flea-sell_price"><span class='aui-margin-r-5 aui-font-size-20'>{{'￥'+commodity_msg.price}} </span><sub><del>{{'￥'+commodity_msg.originalPrice}}</del></sub></div>
   		                        <div class="aui-list-item-right" @click='get_data'>{{'浏览量 '+commodity_msg.browsingTimes}}</div>
   		                    </div>
   		                </div>
   		            </div>
   		        </li>
   		    </ul>
   		</div>

<!-- 介绍2 -->
   		<div class="aui-content aui-margin-b-15">
    	    <ul class="aui-list aui-media-list">
    	        <li class="aui-list-item aui-list-item-middle">
    	            <div class="aui-media-list-item-inner aui-font-size-14">
    	                <div class="aui-list-item-media aui-padded-r-0 flea_title">余量  </div>{{commodity_msg.leftCount+' 件'}}
    	            </div>
    	        </li>
    	        <li class="aui-list-item aui-list-item-middle">
    	            <div class="aui-media-list-item-inner flea-align-start">
    	                <div class="aui-list-item-media aui-padded-r-0 flea_title aui-font-size-14">描述  </div>
    	                <div class="aui-list-item-inner aui-font-size-14">{{commodity_msg.description}}</div>
    	            </div>
    	        </li>
    	    </ul>
    	</div>
    	<!-- 关注 -->
		<focus-shop :focus_msg.sync= 'commodity_msg' :is_seller = 'commodity_msg.isSeller'></focus-shop>

		<!-- 底部购买action -->
		<buy-action :commodity_act.sync = 'settle_msg' :is_seller = 'commodity_msg.isSeller'></buy-action>
	</div>
</template>

<style lang="sass">
$base-color:#fc4766;
$notice-color:#757575;
$black:#000;
	#good_detail{
		margin-bottom:3rem;
		.flea_title{
			width:2.5rem;
		}

        .swiper-wrapper{
            background-color: rgba(215, 215, 215,0.1);
        }

        .swiper-slide{
            text-align:center;
        }

		.flea-align-start{
			align-items:flex-start;
		}

    .flea-good-intr{
      color:$black;
    }

    .flea-sell_price{
      color:$base-color;
      del{
        color:$notice-color;
        vertical-align: middle
      }
    }
	}
</style>

<script>
    import loader from './loader';
	import carousel from './carousel';
	import focusShop from './shop_focus';
	import buyAction from './buy_action';
    import {flea_get} from '../js/components/get';
    // var $ = require('jquery');

	export default{
    data(){
      return{
            commodity_msg:{},
            commodity_id:'',
            settle_msg:{},
            // index_pics : ['/assets/imgs/index.jpg','/assets/imgs/index2.jpg']
      }
    },
	components:{
		carousel,
		focusShop,
		buyAction,
        loader
	},
    methods:{
      format_query(str){
        let str_arr = str.slice(1).split('&'),
          json = {};
          if(!str_arr[0]){
            return false;
          }
          str_arr.map((k)=>{
            k = k.split('=');
            json[k[0]] = k[1];
          })

          return json.commodity_id;

      },
      get_data(){
        this.commodity_id = this.format_query(location.search);
        if(this.commodity_id){
            let _this = this;
            flea_get({
              url:'http://api.tiaozaoj.com/commodity/'+_this.commodity_id+'/detail',
              cb(data){
                  if(data.retMsg=='ok'){
                     _this.commodity_msg =  data.retData;
                     let settle_data = {
                          'avatar':_this.commodity_msg.avatar,
                          'cover':_this.commodity_msg.imagesList[0],
                          'price':_this.commodity_msg.price,
                          'buyCount':1,
                          'leftCount':_this.commodity_msg.leftCount,
                          'commodityId':_this.commodity_id,
                          'nickName':_this.commodity_msg.sellerName,
                          'name':_this.commodity_msg.name
                        };

                        console.log(_this.commodity_msg.imagesList)

                        _this.$broadcast('beginSwiper');

                    // if(_this.commodity_msg.isFollowed){
                    //     $('.flea-label-info').addClass('active');
                    // }
                    // if(_this.commodity_msg.isSeller || _this.commodity_msg.leftCount<=0){
                    //     $('.flea-add-shopcar').css({'background':'#e5e5e5','color':'#aaa','border-color':'#e5e5e5'});
                    //     $('.flea-add-shopcar').css({'background':'#e5e5e5'}).attr({"disabled":"disabled"});
                    //     $('.flea-buy-now').css({'opacity':0.7}).attr({"disabled":"disabled"});   
                    // }
                        _this.settle_msg = settle_data;
                  }
              }
            })
      }
    }
  },
    ready(){
      this.get_data();
    }

	}
</script>