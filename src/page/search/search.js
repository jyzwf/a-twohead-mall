import Vue from 'vue';

import search from '../../components/search_g';
import loader from '../../components/loader';
import headerNav from '../../components/header_nav';
import reset from '../../sass/reset.scss';
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: '/assets/imgs/lazy.png',
  loading: '/assets/imgs/lazy.png'
});
new Vue({
	el:'#flea_search',
    data:{
        'title':'搜索'
    },
	components:{
		search,
        headerNav,
        loader
	}
})