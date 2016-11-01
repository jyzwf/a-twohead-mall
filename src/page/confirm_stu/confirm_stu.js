import Vue from 'vue';

import confirmStu from '../../components/confirm_stu';
import headerNav from '../../components/header_nav.vue';
new Vue({
	el:'#flea_confirm_stu',
    data:{
        'title':'学生认证'
    },
	components:{
		confirmStu,
        headerNav,
	}
})