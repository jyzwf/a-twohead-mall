<!-- 个人中心承载页 -->
<template>
	<div id="sell_page">
		<div class="aui-content">
        	<ul class="aui-list aui-media-list aui-form-list">
    	        <li class="aui-list-item">
    	            <div class="aui-list-item-inner aui-padded-b-0 aui-list-item-center aui-list-item-btn">
    	                <div class="aui-col-xs-3">
                            <img class="aui-img-round" :src="sell_info.avatar+'?imageView2/1/w/120/h/120/format/webp/interlace/1/q/100'">
                        </div>
    	            </div>
    	        </li>

    	        <li class="aui-list-item flea-nickname">
            	    <div class="aui-list-item-inner  aui-padded-t-0 aui-padded-b-0 aui-list-item-center aui-list-item-btn">
            	        <div class="aui-margin-r-5">{{sell_info.nickName}}</div>
            	    </div>
            	</li>
    	    </ul>
    	</div>

		<!-- <commodity-dis :detail_commodity = 'classify'></commodity-dis> -->
		<commodity-dis :detail_commodity='my_goods'></commodity-dis>
		
	</div>
</template>

<style lang='sass'>
$border-color:#ddd;
$base-color:#fa4766;
	#sell_page{

		margin-bottom:3rem;
			
		li{
			&:after{
				content:none;
			}
		}

		
	}
</style>

<script>
	import commodityDis from './commodity_display';
	import {flea_get} from '../js/components/get';
    import $ from 'webpack-zepto';
	export default{
		data(){
			return{
				my_goods:[],
				sell_info:{}
			}
		},
		components:{
			commodityDis
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
		
      		    return json.sellId;
		
      		},
		},
		ready(){
			let _this = this;
			var sellId = this.format_query(location.search);
			if(sellId){
				flea_get({
					url:'http://api.tiaozaoj.com/seller/commodity/'+sellId,
					cb(data){
						if(data.retMsg=='ok'){
							_this.my_goods = data.retData
						}
					}
				})
			}

			flea_get({
				url:'http://api.tiaozaoj.com/seller/profiles/'+sellId,
				cb(data){
					if(data.retMsg=='ok'){
						_this.sell_info = data.retData
					}
				}
			})
			
		}
	}
</script>
