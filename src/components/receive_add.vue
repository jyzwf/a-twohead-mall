<!-- 去付款地址 -->

<template>
	<div id="receive_address">
		<div class="aui-content aui-margin-b-15">
    	    <ul class="aui-list aui-media-list">
            <li class="aui-list-item aui-list-item-middle" @click.stop='go_self_msg'>
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 1.5rem;">
                         <i class="aui-iconfont aui-icon-location"></i>
                    </div>
                    <div class="aui-list-item-inner flea-for-detail aui-list-item-arrow">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title aui-font-size-14">收货人：{{receiver_msg.realName}}</div>
                            <div class="aui-list-item-right">{{receiver_msg.phone}}</div>
                        </div>
                        <div class="aui-list-item-text">
                            收货地址：{{receiver_msg.receiveAddress}}
                        </div>
                    </div>
                </div>
            </li>
    	    </ul>
    	</div>
	</div>
</template>


<style lang="sass">
	#receive_address{
		ul:before,li:after{
			content:none;
		}

		.flea_title{
			width:auto;
		}
	}
</style>


<script type="text/javascript">
    import $ from 'webpack-zepto';
    import {flea_get} from '../js/components/get';

    export default{
        props:['ad','isdetail'],
        data(){
            return {
                receiver_msg:{}
            }
        },
        methods:{
            go_self_msg(){
                if(this.isdetail){
                    return false;
                }
                window.location.href='../my_msg/my_msg.html'
            }
        },
        ready(){
            
            let _this = this;
            
            flea_get({
                    url:'http://api.tiaozaoj.com/user/profiles',
                    cb(data){
                        if(data.errNum == 0){
                            _this.receiver_msg = data.retData;
                            _this.ad = {
                                receiveAddress:_this.receiver_msg.receiveAddress,
                                phone:_this.receiver_msg.phone
                            }
                        }
                    }
                })
        }
    }
</script>