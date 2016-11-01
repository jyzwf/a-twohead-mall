import Vue from 'vue';

import myFocus from '../../components/my_focus';
import reset from '../../sass/reset.scss';
import {auth} from '../../js/components/auth';
import loader from '../../components/loader';

new Vue({
	el:'#flea_my_focus',
    data:{
    },
	components:{
		myFocus,
        loader
	},
	ready(){

	}
})