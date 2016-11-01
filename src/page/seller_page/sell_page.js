import Vue from 'vue';

import sellPage from '../../components/sell_page';
import reset from '../../sass/reset.scss';
import {auth} from '../../js/components/auth';
new Vue({
	el:'#flea_sell_page',
	components:{
		sellPage,
	},
	ready(){
		// 判断一开始是不是存在登入的token
		if(!auth.check_session()){
			return false;
		}
	}
})