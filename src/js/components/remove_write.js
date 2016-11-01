//填写表单的时候点击x清除表单内容
import $ from 'webpack-zepto';

let operate_close = {
	remove_all(){
		$(this).parent().find('input').val('');
		$(this).css('visibility','hidden');
	},

	display_close(){
		let obj = $(this).parent().siblings('.close_account');
		$(this).val().trim() == ''?obj.css('visibility','hidden'):obj.css('visibility','visible')
	}
}

export {operate_close};