import Vue from 'vue';

import headerNav from '../../components/header_nav.vue';
import shopCar from '../../components/shop_car';
import reset from '../../sass/reset.scss';
import {auth} from '../../js/components/auth';

new Vue({
	el:'#flea_shopcar',
	data:{
		title: '购物袋'
	},
	components:{
		headerNav,
		shopCar,
	}
})