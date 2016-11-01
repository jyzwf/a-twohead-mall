import Vue from 'vue';

import orderDetail from '../../components/order_detail';
import reset from '../../sass/reset.scss';
import {auth} from '../../js/components/auth';
import loader from '../../components/loader';

new Vue({
	el:'#flea_order_detail',
	components:{
		orderDetail,
		loader
	},
	ready(){
		// 判断一开始是不是存在登入的token
		if(!auth.check_session()){
			return false;
		}
	}
})