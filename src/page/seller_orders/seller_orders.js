import Vue from 'vue';

import sellerOrders from '../../components/seller_orders';
import reset from '../../sass/reset.scss';

new Vue({
	el:'#seller_orders',
	components:{
		sellerOrders,
	}
})