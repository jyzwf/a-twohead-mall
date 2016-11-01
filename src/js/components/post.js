//请求是post的一个ajax接口

import $ from 'webpack-zepto';
let toast = new auiToast({});
let flea_post = (obj)=>{
	
	toast.loading({
		title:'加载中..',
		duration:3000
	},function(ret){
		$.ajax({
		  type: 'POST',
		  url: obj.url,
		  data: obj.data,
		  dataType: 'json',
		  crossDomain: true,
		  beforeSend: function(request){
		   	var msg = window.sessionStorage.getItem('register_token');
                request.setRequestHeader('temp-token', msg);
          },
		  success: function(data,status,xhr){
		  	console.log(xhr)
		   	obj.cb && obj.cb(data);
		  },
		  error: function(xhr, type){
		    toast.hide();
			toast.fail({
            	title:'加载失败',
            	duration:2000
            });
		  }
		})
	})
	
};

export {flea_post,toast}