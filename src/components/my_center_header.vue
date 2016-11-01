<!-- 个人中心头 -->
<template>
	<div class="my_center_header">
		<header class="aui-bar aui-bar-nav">
            <a href='../index/index.html' class="aui-pull-left aui-btn">
                <img src="/assets/imgs/home.svg" class="aui-iconfont" width="20" height="20">
            </a>
		    <a href='../my_msg/my_msg.html' class="aui-pull-right aui-btn">
		        <img src="/assets/imgs/setting.svg" class="aui-iconfont" width="20" height="20">
		    </a>
		</header>

		<div class="aui-content">
        	<ul class="aui-list aui-media-list aui-form-list">
    	        <li class="aui-list-item">
    	            <div class="aui-list-item-inner aui-padded-b-0 aui-padded-t-0 aui-list-item-center aui-list-item-btn">
    	                <div class="aui-col-xs-3">
                            <img class="aui-img-round" :src="user_info.avatar+'?imageView2/1/w/120/h/120/format/webp/interlace/1/q/100'" >
                        </div>
    	            </div>
    	        </li>

    	        <li class="aui-list-item flea-nickname">
            	    <div class="aui-list-item-inner  aui-padded-t-0 aui-padded-b-0 aui-list-item-center aui-list-item-btn">
            	        <div class="aui-margin-r-5 aui-margin-b-10" >{{user_info.nickName}}</div>
            	    </div>
            	</li>
    	    </ul>
    	</div>

		<div class="aui-tab flea-tab" id="tab">
		    <div @click='change(1)' class="aui-tab-item" :class='{ "aui-active":change_tab=="isBuyer"}'>我是买家</div>
		    <div @click='change(2)' class="aui-tab-item" :class='{ "aui-active":change_tab=="isSeller"}'><div></div>我是卖家</div>
		</div>
	</div>	
</template>

<style lang='sass'>
$white:#fff;
$black:#000;
$base-color:#fc4766;
	.my_center_header{
        background-color:$base-color;
		header{
            background: rgba(55,146,179,.0);
			span{
				color:$black !important;
			}
		}
        .aui-list-item {
            background: rgba(55,146,179,.0);
        }
		ul{
			*:after,&:after,&:before{
				content:none !important;
			}

			.flea-nickname{
				min-height:auto;
                color:#fff;
				&>div{
					min-height:auto;
				}
			}
		}

		.aui-active{
			border-bottom-color:$base-color;
			color:$base-color;
		}

		.flea-tab{
			z-index:7;
		}
	}
</style>


<script type="text/javascript">

import {flea_get} from '../js/components/get';

	export default{
		props:['change_tab','is_auth'],
		data(){
			return{
				user_info:{}
			}
		},
		methods:{
			change(num){
				num == 1 ? this.change_tab = 'isBuyer' : this.change_tab = 'isSeller';
			}
		},
		ready(){
			let _this = this;
			flea_get({
                url:'http://api.tiaozaoj.com/user/profiles',
                cb(data){
                    if(data.errNum == 0){
                        _this.user_info = data.retData;
                        _this.is_auth = data.retData.property;
                    }else{
                    }
                }
            });
		}
	}
</script>