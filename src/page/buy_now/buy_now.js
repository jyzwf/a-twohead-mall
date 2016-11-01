import Vue from 'vue';

import buyNow from '../../components/buy_now';
import reset from '../../sass/reset.scss';
import {auth} from '../../js/components/auth';

new Vue({
	el:'#flea_buy_now',
	components:{
		buyNow,
	},
	ready(){
	}
})