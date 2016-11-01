import Vue from 'vue';

import myCenter from '../../components/my_center';
import reset from '../../sass/reset.scss';
import {auth} from '../../js/components/auth';
new Vue({
	el:'#flea_my_center',
	components:{
		myCenter
	},
})