//判断是否是电话或者邮箱

import $ from 'webpack-zepto';
let p_e = (str)=>{
	return str.indexOf('@') == -1 ? {'isphone':'手机号格式不正确'}:{'ismail':'邮箱格式不正确'};
}