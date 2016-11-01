import Vue from 'vue';

import classifyType from '../../components/classify_type';
import loader from '../../components/loader';
import reset from '../../sass/reset.scss';

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: '/assets/imgs/lazy.png',
  loading: '/assets/imgs/lazy.png'
});
new Vue({
	el:'#classify_type',
	components:{
		classifyType,
        loader
	}
})