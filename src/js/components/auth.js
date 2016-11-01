// 判断是否授权，
var auth = {
	check_session(){
		return true;
	}, 
	check_state(msg){		//判断是否授权
		if(msg.errNum === 401 && msg.retMsg=='请先登录'){
			this.go_login();
			return;
		}
	},
	go_login(){		
		window.sessionStorage.passUrl = location.href;		//先记录下当前的url,以便登入授权好后回到原页面
		window.location.href='../login/login.html';
	}
}
export {auth};