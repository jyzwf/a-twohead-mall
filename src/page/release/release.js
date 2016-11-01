import Vue from 'vue';

import release from '../../components/release';
import reset from '../../sass/reset.scss';
import {auth} from '../../js/components/auth';

new Vue({
	el:'#flea_release',
	components:{
		release,
	},
})