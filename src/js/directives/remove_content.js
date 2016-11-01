//vue清除输入框内容的指令
import Vue from 'vue';

Vue.directive('remove_ctx',{
	twoWay : true,
	update (val) {
		let _this = this;
		this.el.onclick = ()=>{
			_this.set('');
		}
	}
})