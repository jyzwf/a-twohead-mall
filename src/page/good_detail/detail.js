import Vue from 'vue';

import goodDetail from '../../components/good_detail';
import loader from '../../components/loader';
import reset from '../../sass/reset.scss';
new Vue({
	el:'#flea_detail',
	components:{
		goodDetail,
        loader
	}
})