//验证码倒计时
let time_down = (ms,ele,flag)=>{
	
	flag.judge = true;
	let t = null;
	let inner_t = ()=>{
		ele.text(ms+' s');
		
		if(ms < 0 ){
			ele.text('获取');
			clearTimeout(t);
			flag.judge = false;
			return false;
		}
		ms-=1;
	
		t = setTimeout(inner_t,1000);
	}

	inner_t();

};

export {time_down}
