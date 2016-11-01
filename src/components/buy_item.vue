<!-- 所购商品简介 -->
<template>
	<div class="buy_msg aui-margin-b-15" v-for='commodity_msg in commodities_msg'>
		<div class="aui-content">
    	    <ul class="aui-list aui-media-list">
            
            <li class="aui-list-item aui-padded-r-15">

            	<div class="aui-info aui-padded-b-0" >
                    <div class="aui-info-item">
                        <img :src="commodity_msg.avatar"  class="flea-avator aui-img-round"><span class="aui-margin-l-5">{{commodity_msg.nickName}}</span>
                        </div>
                </div>

                <div class="aui-media-list-item-inner  flea-align-center">
                    <div class="aui-list-item-media flea-cover" >
                        <img :src="commodity_msg.cover" class="aui-list-img-sm ">
                    </div>
                    <div class="aui-list-item-inner aui-padded-r-5 aui-font-size-14">
                        {{commodity_msg.name}}
                    </div>

                    <div class="aui-list-item-right flea-num-price aui-padded-l-5 aui-margin-l-0">
                        ￥{{commodity_msg.price}} <br>
                        <span v-if='is_car == "true"'>{{'x' + commodity_msg.buyCount}}</span>
                    </div>
                </div>
                
            </li>
    	        
    	    </ul>
    	</div>

        <div class="buy_config">
        <ul class="aui-list aui-form-list aui-font-size-14">
        <li v-if='is_car == "false"' class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
                    购买数量
                </div>
                <div class="aui-list-item-input flea-write-num">
                    <img @click='sub_amount(commodity_msg)' class='flea-operate-good' src="/assets/imgs/sub.svg" alt="">
                    <span class='aui-margin-l-5 aui-margin-r-5 aui-font-size-16'>{{commodity_msg.buyCount}}</span>
                    <img @click='add_amount(commodity_msg)' class='flea-operate-good' src="/assets/imgs/add.svg" alt="">

                    <div class="aui-list-item-right aui-pull-right">
                        余量 {{commodity_msg.leftCount}}
                    </div>
                </div>
            </div>
        </li>

        <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
                    配送方式
                </div>
                <div class="aui-list-item-input">
                    <select class="aui-font-size-14">
                        <option>货到付款</option>
                    </select>
                </div>
            </div>
        </li>

        <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">
                    留言(选填)
                    <br>
                </div>
                <div class="aui-list-item-input">
                    <textarea v-model='commodity_msg.leaveMsg' type="text"  class="aui-font-size-14" placeholder="在这里可以填写一些额外的交易细节"></textarea>
                </div>
            </div>
        </li>
    </ul>
    </div>
	</div>
</template>

<style lang='sass'>
	.buy_msg{
		.flea-align-center{
			align-items:center;
		}

        textarea{
            margin-bottom:0;
        }

		ul{
			&:after{
				content:none;
			}

            .flea-num-price{
                text-align:center;
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

    .buy_config{
        .flea-write-num{
            &>div{
                width:auto;
                margin-top:0.25rem;
            }

            img{
                width:0.8rem;
                height:0.8rem;
                cursor: pointer;
            }
        }
    }
	}
</style>

<script type="text/javascript">
import {flea_ajax,toast} from '../js/components/ajax';

    export default{
        props:['all_money','commodities'],
        data(){
            return {
                commodities_msg:[],
                is_car : window.sessionStorage.is_car
            }
        },
        computed:{
            money:{
                get(){
                    
                },
                set(val){
                    console.log(this.all_money);
                    this.all_money = val;
                }
            }
        },
        methods:{
            to_json(arr){
              return  arr.map((x)=>{
                        console.log(x);
                        return x = JSON.parse(x);
                    });
            },
            add_amount(item){
                item.buyCount+=1;
                this.all_money = (+this.all_money + (+item.price)).toFixed(2);
            },

            sub_amount(item){
                if(item.buyCount>1){
                 item.buyCount-=1
                  this.all_money = (+this.all_money - (+item.price)).toFixed(2);  
                }
                
            },
            get_all_money(){
                let num=0;
                for(let val in this.commodities_msg){

                    num += this.commodities_msg[val].price * this.commodities_msg[val].buyCount
                }
                
                this.all_money = (+num).toFixed(2);

            },
            send_data(data){
                flea_ajax({
                    way:'POST',
                    url:'http://api.tiaozaoj.com/order/generate',
                    data:data,
                    cb(data){
                        if(data.errNum == 0){
                            toast.success({
                                title:'下单成功',
                                duration:2000
                            });
                            window.location.href='../order_detail/order_detail.html?orderId='+data.retData.orderNo;
                        }else{
                            toast.fail({
                                title:'下单失败',
                                duration:2000
                            });
                        }
                    }
                })
            }
        },
        events:{
            settle_account(data){
                let commodities_arr = [],send_data = {};
                for(var i=0,len=this.commodities_msg.length;i<len;i++){
                    commodities_arr.push({
                        commodityId:this.commodities_msg[i].commodityId,
                        buyCount:this.commodities_msg[i].buyCount,
                        buyPrice:+this.commodities_msg[i].buyCount * (+this.commodities_msg[i].price),
                        leaveMsg:this.commodities_msg[i].leaveMsg ? this.commodities_msg[i].leaveMsg : ""
                    })
                }

                send_data = {
                    isBag:window.sessionStorage.is_car,
                    receiveAddress:data.receiveAddress,
                    phone:data.phone,
                    commodities:JSON.stringify(commodities_arr)
                };
                if(send_data.receiveAddress=='未填写完整'){
                    alert("请填写完整收货信息");
                    return;
                }
                this.send_data(send_data);
            }
        },
        ready(){
            let format = window.sessionStorage.billing_items.split('&{');
            if(format.length>1){
                for(let i=1,l=format.length;i<l;i++){
                    format[i] = '{'+format[i];
                }
            }
            console.log(format);
            this.commodities_msg = this.to_json(format);
            this.get_all_money();
        }
    }
</script>