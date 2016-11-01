<!-- 商品信息显示 -->
<template>
	<div class="good_msg_show ">
        <div class="aui-mask flea-mask" :class='{"active":mask}'></div>
		<div class="aui-card-list aui-margin-t-15" v-if='orders[0]' v-for='item in orders'>
            <div class="aui-card-list-header flea-title aui-card-list-user aui-border-b">
                <div class="aui-card-list-user-avatar">
                    <img :src="item.avatar" class="aui-img-round">
                </div>
                <div class=" aui-card-list-user-name">
                    <div>{{item.sellerName}}</div>
                    <small v-if="seller=='false'" class='flea-state' @click.stop='operate(item,$index)'>{{item.state+' '}}<i class="aui-iconfont aui-icon-down"></i></small>
                    
                    <small v-if="seller=='true'" class='flea-state' @click.stop='operate(item,$index)'>{{item.state+' '}}<i class="aui-iconfont aui-icon-down" v-show='item.status == 2'></i></small>

                    <div class="flea-tips aui-popup aui-popup-top-right" :class='{"active":item.m}'>
                        <div class="aui-popup-arrow"></div>
                        <div class="aui-popup-content flea-auto-height">
                            <ul  v-if="seller=='false'" class="aui-list aui-list-noborder">
                                <li class="aui-list-item" @click.stop='ensure(item)' v-if='item.status==3'>
                                    <div class="aui-list-item-label-icon">
                                        <i class="aui-iconfont aui-icon-correct aui-text-success"></i>
                                    </div>
                                    <div class="aui-list-item-inner aui-list-item-middle">
                                        确认收货
                                    </div>
                                </li>
                                <li class="aui-list-item" @click.stop='cancel_order(item,$index)' v-if='item.status==1 || item.status==2'>
                                    <div class="aui-list-item-label-icon">
                                        <i class="aui-iconfont aui-icon-close aui-text-warning"></i>
                                    </div>
                                    <div class="aui-list-item-inner">
                                        取消订单
                                    </div>
                                </li>
                                <li class="aui-list-item" @click.stop='remove(item,$index)' v-if='item.status==0 || item.status==4'>
                                    <div class="aui-list-item-label-icon">
                                        <i class="aui-iconfont aui-icon-minus aui-text-danger"></i>
                                    </div>
                                    <div class="aui-list-item-inner">
                                        删除订单
                                    </div>
                                </li>
                            </ul>


                            <ul  v-if="seller=='true'" class="aui-list aui-list-noborder">
                                <li class="aui-list-item" @click.stop='delivery(item)' v-if='item.status==2'>
                                    <div class="aui-list-item-label-icon">
                                        <i class="aui-iconfont aui-icon-phone aui-text-warning"></i>
                                    </div>
                                    <div class="aui-list-item-inner aui-list-item-middle">
                                        开始配送
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="aui-card-list-user-info">{{item.createTime}}</div>
            </div>

            <div class="aui-card-list-content">
                <ul class="aui-list aui-media-list">
                    <li class="aui-list-item aui-list-item-middle">
                        <a class='flea-to-detail' href='../order_detail/order_detail.html?orderId={{ item.orderNo }}'>
                            <div class="aui-media-list-item-inner" style="padding-left:2.5rem">
                                <div class="aui-list-item-media" >
                                    <img :src="item.cover">
                                </div>
                                <div class="aui-list-item-inner">
                                    <div class="aui-list-item-text">
                                        <div class="aui-list-item-title aui-font-size-14">{{item.commodityName}}</div>
                                    </div>
                                    <div class="aui-list-item-text">
                                        {{item.description}}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="aui-card-list-footer aui-border-t flea-money aui-padded-t-0 aui-padded-b-0">
                <div><small>共{{item.buyCount}}件商品  合计￥{{item.totalPrice}}</small></div>
            </div>
        </div>

        <!-- 无订单状态 -->
        <no-order v-if='has_order'></no-order>

	</div>
</template>

<style lang="sass">
$white:#fff;
$base-color:#fc4766;
	.good_msg_show{
        ul{
            &:before{
                content:none;
            }
        }

        .flea-mask{
            z-index:999;
            &.active{
                 visibility: visible;
                 opacity: 1;
            }
        }
        .flea-auto-height{
            min-height: auto;
        }
		.flea-title{
			.flea-state{
                i{
                    font-weight:bold;
                    font-size:0.5rem;
                }
			}
			&:after{
				content:none;
			}
		}

        .flea-money{
            min-height: 1.5rem;
            justify-content: flex-end;
        }

        .flea-tips{
            position: absolute;
            top:1.2rem;
            transform: scale(0);
            transform-origin: calc(100% - 0.25rem) 0;
            transition-duration: 300ms;
            display: block;
            &.active{
                    opacity: 1;
                    transform: scale(1);
            }
        }

        .flea-to-detail{
            display:block;
        }
	}
</style>

<script type="text/javascript">
import $ from 'webpack-zepto';
import noOrder from './no_orders';
import {flea_ajax,toast} from '../js/components/ajax';
    export default{
        props:['seller'],
        data(){
            return{
                mask:false,
                orders:[],
                index:0,
                format_status:{
                    '0':'取消订单',
                    '1':'待付款',
                    '2':'待发货',
                    '3':'待收货',
                    '4':'交易成功'
                },
                has_order:false,
                get_order:{     //不同订单的数据请求
                    _this:this,
                    all(){
                        let data = {
                            isSeller:this._this.seller=='true'?1:0
                        };
                        this._this.order_ajax(data)
                    },
                    to_pay(){
                        let data = {
                            isSeller:this._this.seller=='true'?1:0,
                            status:0
                        };
                        this._this.order_ajax(data)
                    },
                    to_shipped(){
                        let data = {
                            isSeller:this._this.seller=='true'?1:0,
                            status:2
                        };
                        this._this.order_ajax(data)
                    },
                    to_accept(){
                        let data = {
                            isSeller:this._this.seller=='true'?1:0,
                            status:3
                        };
                        console.log(this._this);
                        this._this.order_ajax(data)
                    },
                    success(){
                        let data = {
                            isSeller:this._this.seller=='true'?1:0,
                            status:4
                        };
                        this._this.order_ajax(data)
                    }   
                }
            }
        },
        components:{
            noOrder:noOrder,
        },
        methods:{
            operate(item,idx){
                if(this.seller=='true'&&item.status!=2){
                    return false;
                }
                item.m = true;
                this.mask = true;
                this.index = idx;
            },
            cancel_order(item,idx){
                let c = confirm('你确定取消此订单吗?'),
                    _this = this;
                if(c){
                    flea_ajax({
                        way:'POST',
                        url:'http://api.tiaozaoj.com/order/'+item.orderNo+'/cancel',
                        data:{},
                        cb(data){
                            toast.hide();
                            if(data.errNum == '0'){

                                toast.success({
                                    title:data.retMsg,
                                    duration:2000
                                });

                                item.status = 0;
                                item.state = _this.format_status[item.status];
                                item.m = false;
                                _this.mask = false;

                            }else{
                                toast.fail({
                                    title:data.retMsg,
                                    duration:2000
                                });
                            }
                        }
                    });
                }
            },
            remove(item,idx){
                let c = confirm('你确定删除此订单吗?'),
                    _this = this;
                if(c){
                    flea_ajax({
                        way:'POST',
                        url:'http://api.tiaozaoj.com/order/'+item.orderNo+'/delete',
                        data:{},
                        cb(data){
                            toast.hide();
                            if(data.errNum == '0'){
                                
                                toast.success({
                                    title:data.retMsg,
                                    duration:2000
                                });

                                _this.orders.splice(idx,1);
                                 _this.mask = false;
                            }else{
                                toast.fail({
                                    title:data.retMsg,
                                    duration:2000
                                });
                            }
                        }
                    });
                }
            },
            ensure(item){
                flea_ajax({
                    way:'POST',
                    url:'http://api.tiaozaoj.com/order/'+item.orderNo+'/receive',
                    data:{},
                    cb(data){
                        if(data.errNum == 0){
                            toast.success({
                                title:data.retMsg,
                                duration:2000
                            });
                            item.status = 4;
                            item.state = _this.format_status[item.status];
                            item.m = false;
                            _this.mask = false;
                        }else{
                            toast.fail({
                                title:data.retMsg,
                                duration:2000
                            });
                        }
                    }
                })
            },
            delivery(item){
                flea_ajax({
                    way:'POST',
                    url:'http://api.tiaozaoj.com/order/'+item.orderNo+'/delivery',
                    data:{},
                    cb(data){
                        if(data.errNum == 0){
                            toast.success({
                                title:data.retMsg,
                                duration:2000
                            });
                            item.status = 3;
                            item.state = _this.format_status[item.status];
                            item.m = false;
                            _this.mask = false;
                        }else{
                            toast.fail({
                                title:data.retMsg,
                                duration:2000
                            });
                        }
                    }
                })
            },
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

                return json.type;
        
            },
            order_ajax(data){
                let _this = this;
                flea_ajax({
                        way:'GET',
                        url:'http://api.tiaozaoj.com/order/lists',
                        data:data,
                        cb(data){
                            toast.hide();
                            if(data.errNum == '0'){
                                
                                if(data.retMsg=='ok'){
                                    data.retData.resDetail = data.retData.resDetail.map((x)=>{
                                        x.m = false;
                                        x.state = _this.format_status[x.status];
                                        return x;
                                    })

                                    data.retData.resDetail[0]?_this.has_order = false:_this.has_order=true;

                                    _this.orders = data.retData.resDetail;

                                }

                            }else{
                                toast.fail({
                                    title:data.retMsg,
                                    duration:2000
                                });
                            }
                        }
                    });

            }
            
        },
        ready(){
            document.onclick=()=>{
                this.mask = false;
                if(this.orders[0]){
                    this.orders[this.index].m =false;
                }
                
            }

            

            let type = this.format_query(location.search);
            this.get_order[type]();
            

        }
    }
</script>