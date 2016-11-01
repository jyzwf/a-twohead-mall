<!-- 订单详情承载页 -->
<template>
	<div id="orders_details">
		<header-nav :title='title'></header-nav>
		<div class="status aui-font-size-18">{{status_info}}</div>	
		<receive-add :isdetail = 'true'></receive-add>
		<detail-list :order_goods = 'order_info'></detail-list>
		<div class="flea_order_data aui-padded-b-10 aui-padded-t-10">
			<p class='aui-padded-l-15 aui-font-size-12'>订单编号 ：{{order_info.orderNo}}</p>
			<p class='aui-padded-l-15 aui-font-size-12'>创建时间 ：{{order_info.createTime}}</p>
			<!-- <p class='aui-padded-l-15 aui-font-size-12'>发货时间 ：{{order_info.orderNo}}</p> -->
		</div>
		<footer v-if='order_info == 3 ' class="aui-bar aui-bar-tab aui-padded-l-15 aui-padded-r-15" id="footer">
		    <div @click='sure_receive' class="aui-btn aui-btn-info aui-btn-outlined aui-font-size-12">确认收货</div>
		</footer>
	</div>
</template>

<style lang='sass'>
$base-color:#fc4766;
$white:#fff;
$black:#000;
$data-color:#aaa;
$border-color:#dddddd;
	#orders_details{
		margin-bottom:3rem;
		.flea_bar_nav{
			background:transparent;
			span{
				color:$base-color;
			}
			
			div{
				color:$black;
			}
		}

		.status{
			height:6rem;
			line-height:6rem;
			text-align:center;
			background:$base-color;
            font-size:0.8rem;
			color:$white;
		}

		.flea-for-detail{
			padding-right:0.75rem;
			&:before{
				content:none;
			}
		}

		.flea_order_data{
			color:$data-color;
			border-bottom:1px solid $border-color;
			border-top:1px solid $border-color;
			background:$white;
		}
		
		#footer{
    		display: flex;
    		align-items: center;
    		justify-content: flex-end;

    		&>div{
    			color:$base-color !important;
    			border-color:$base-color !important;
    		}
		}
	}
</style>

<script type="text/javascript">
import receiveAdd from './receive_add';
import headerNav from './header_nav';
import detailList from './order_detail_list';
import {flea_get} from '../js/components/get';
import {flea_ajax,toast} from '../js/components/ajax';
	export default{
		data(){
			return{
				status_info:'',
				orderId:'',
				order_info:{},
				notice_info:{
					'0':'订单已取消',
					'1':'该订单你还没有付款哦',
					'2':'等待卖家发货中',
					'3':'卖家已发货哦',
					'4':'该订单已完成交易'
				},
                'title':'订单详情'
			}
		},
		components:{
			receiveAdd,
			detailList,
            headerNav
		},
		methods:{
			// 格式化search
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
		
      		    return json.orderId;
		
      		},
      		// 获取数据
      		get_data(){
      			let _this = this;

      			_this.orderId = this.format_query(location.search);

      			if(this.orderId){
      				
      				flea_get({
            			  url:'http://api.tiaozaoj.com/order/'+_this.orderId+'/detail',
            			  cb(data){
            			      if(data.errNum=='0'){
            			         _this.order_info = data.retData;
            			         _this.status_info = _this.notice_info[data.retData.status];
            			      }else{
            			        alert('请求失败,请稍后再试')
            			      }
            			  }
            		})
      			}
      		},
      		// 确认收货
      		sure_receive(){
      			flea_ajax({
      				way:'POST',
      				url:'http://api.tiaozaoj.com/order/'+this.order_info.orderNo+'/receive',
      				data:{},
      				cb(data){
      					if(data.errNum == 0){
      						window.location.href='../my_orders/my_orders.html?type=success'
      					}
      				}
      			})
      		}
		},
		ready(){
			this.get_data();
		}
	}
</script>