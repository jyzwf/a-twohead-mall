// 在授权后获取 数据的ajax

import $ from 'webpack-zepto';
import {auth} from './auth';
let toast = new auiToast({});
let flea_ajax = (obj)=>{
	auth.check_session();
	toast.loading({
		title:'加载中..',
		duration:2000
	},function(ret){
		$.ajax({
		  type: obj.way,
		  url: obj.url,
		  data: obj.data,
		  dataType: 'json',
		  beforeSend: function(request){
		   	var msg = window.localStorage.getItem('token');
                request.setRequestHeader('authorization', msg);
          },
		  success: function(data){
		  	toast.hide();
		    auth.check_state(data);
		   	obj.cb && obj.cb(data);
		  },
		  error: function(xhr, type){
		  	toast.hide();
			toast.fail({
        	    title:'服务器好像开小差啦',
        	    duration:2000
            });
		    if(obj.errcb){
		    	obj.errcb(xhr);
		    	return false;
		    }
		  }
		})
	})
};

export {flea_ajax,toast}
