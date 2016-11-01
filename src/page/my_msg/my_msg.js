import Vue from 'vue';

import myMsg from '../../components/my_msg';
import reset from '../../sass/reset.scss';
import {auth} from '../../js/components/auth';
new Vue({
	el:'#flea_my_msg',
	components:{
		myMsg,
	},
	ready(){
		// 判断一开始是不是存在登入的token
		if(!auth.check_session()){
			return false;
		}
	}
})