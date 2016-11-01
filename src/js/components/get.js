//请求时get方法的接口
import $ from 'webpack-zepto';
import {auth} from './auth';
let toast = new auiToast({});
let flea_get = (obj)=>{
    console.log(obj.unAuth);
	$.ajax({
		  type: 'GET',
		  url: obj.url,
		  dataType: 'json',
		  beforeSend: function(request){
                request.setRequestHeader('authorization', window.localStorage.getItem('token'));
          },
		  success: function(data){
		  	toast.hide();
		  	if(!obj.unAuth){
				auth.check_state(data); 
		  	}
		   	obj.cb && obj.cb(data);
		  },
		  error: function(xhr, type){
		  	toast.hide();
			toast.fail({
        	    title:'网络错误',
        	    duration:2000
            });
		    if(obj.errcb){
		    	obj.errcb(xhr);
		    	return false;
		    }
		  }
	})
};

export {flea_get}