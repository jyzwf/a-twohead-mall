//表单验证的一些接口

import $ from 'webpack-zepto';
let validate = {
	v_task:{
		require(val,err_msg){
			if(val.trim() == ''){
				return err_msg;
			}
		},
		min_length(val,err_msg,length){
			if(val.trim().length < length){

				return err_msg;
			}
		},
		isphone(val,err_msg){
			if( !(/^1[3|4|5|7|8]\d{9}$/).test(val)){
                return err_msg;
            }
		},
		ismail(val,err_msg){
			if( !(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/).test(val)){
                return err_msg;
            }
		},
		isNum(val,err_msg){
			if( !(/^\d{6}$/).test(val)){
                return err_msg;
            }
		},

		same_password(val,err_msg){
			let password_arr = val.split('&');
			if(password_arr[0]!==password_arr[1]){
				return err_msg;
			}
		},

		iscount(val,err_msg){		//检测是否为整数
			console.log(val)
			if(!(/^\d+$/).test(val)){
				return err_msg;
			}
		},

		iscorrect_money(val,err_msg){		//检测是否符合货币写法

			if(val && !(/^(([1-9]\d*)|0)(\.(\d){1,2})?$/).test(val)){
				return err_msg;
			}
		},

		isempty(val,err_msg){		//检测是否选择了图片
			if(!val.length){
				return err_msg;
			}
		}


	},
	init(obj){
		for(let i=0;i<obj.length;i++){

			for(let k in obj[i].task){
				if( this.v_task[k]( obj[i].val , obj[i].task[k].err_msg , obj[i].task[k].length) ){
					return obj[i].task[k].err_msg;
				}
			}
		}
	}
}


export {validate};