<!-- 我的订单导航 -->

<template>
	<div id="orders_nav">
		<div class="aui-tab aui-margin-b-15" id="tab">
            <a href='{{baseurl}}?type=to_pay' class="aui-tab-item" :class='{ "aui-active":nav_bar=="to_pay"}'>待付款</a>
    	    <a href='{{baseurl}}?type=to_shipped' class="aui-tab-item" :class='{ "aui-active":nav_bar=="to_shipped"}'>待发货</a>
    	    <a href='{{baseurl}}?type=to_accept' class="aui-tab-item" :class='{ "aui-active":nav_bar=="to_accept"}'>待收货</a>
    	    <a href='{{baseurl}}?type=success' class="aui-tab-item" :class='{ "aui-active":nav_bar=="success"}'>交易成功</a>
            <a href='{{baseurl}}?type=all' class="aui-tab-item" :class='{ "aui-active":nav_bar=="all"}'>全部</a>
    	</div>
	</div>
</template>

<style lang='sass'>
$base-color:#fc4766;
	
	#orders_nav{
		.aui-active{
			color:$base-color;
			border-bottom-color:$base-color;
		}
	}
</style>

<script>
	export default{
		props:['seller'],
		data(){
			return{
				nav_bar:'all'
			}
		},
		computed:{
			baseurl(){
				return this.seller == 'true'?'../seller_orders/seller_orders.html':'../my_orders/my_orders.html'
			}
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

                return json.type;
		
      		}
		},
		ready(){
			this.nav_bar = this.format_query(location.search);
			console.log(this.nav_bar);
		}
	}
</script>