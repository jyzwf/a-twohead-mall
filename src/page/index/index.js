import Vue from 'vue';
import index from '../../components/index_page';
import reset from '../../sass/reset.scss';

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: '/assets/imgs/lazy.png',
  loading: '/assets/imgs/lazy.png'
});
new Vue({
	el:'#flea_index',
	components:{
		index
	},
})