<!-- 立即购买承载页 -->
<template>
	<div id="buy_now">
		<receive-add :ad.sync='address' :isdetail = 'false'></receive-add>
		<buy-msg :all_money.sync='all_sum'></buy-msg>
		<buy-bar :all_money='all_sum'></buy-bar>
	</div>
</template>

<style lang='sass'>
	#buy_now{
		margin-bottom:3rem;
	}
</style>

<script>
	import receiveAdd from './receive_add';
	import buyMsg from './buy_item';
	import buyBar from './buy_now_bar';

	export default{
		components:{
			receiveAdd,
			buyMsg,
			buyBar
		},
		data(){
			return{
				all_sum:0,
				address:{}
			}
		},

        events:{
            send_order(){
            	this.$broadcast('settle_account',this.address);
            }
        }

		
	}
</script>