<!-- 发布第一步 -->
<template>
	<div id="rel_step1" class="aui-margin-t-15" >
		<ul class="aui-list aui-list-in  flea-clear">
		    <li class="aui-list-item aui-padded-t-15">
		        <div class="aui-list-item-inner flea-select-type">
		             <span class="aui-btn aui-btn-info aui-margin-l-10 aui-margin-b-5 aui-btn-outlined" v-for='type in rel_type' @click='my_select($index,type)' :class="{'selected':select_type==type}">{{type}}</span>
		        </div>
		    </li>

		    <li class="aui-list-item">
		        <div class="aui-list-item-inner flea-right">
		             <h6 @click='remove_select'> <i class="aui-iconfont aui-icon-back aui-margin-r-5"></i>撤销</h6>
		        </div>
		    </li>
		</ul>
	</div>
</template>


<style lang='sass'>
	$black:#000;
	$base-color:#fc4766;

	#rel_step1{

		.flea-clear{
			&:after{
				content:none !important;
			}
		}

		.flea-select-type{
			flex-wrap:wrap;
			justify-content:flex-start;	
			
			&:after{
				content:none;
			}
			span{
				padding:3px 6px;
				color:$black !important;
				border-color:$base-color !important;

			}
			.selected{
				background:$base-color !important;
				color:#fff !important;
			}

		}

		.flea-right{
			justify-content:flex-end;
			h6{
				cursor: pointer;
			}
		}
	}
</style>

<script>
	export default{
		props:['good_msg'],
		data(){
			return {
				rel_type:['书籍教材','电脑数码','衣物鞋子','其他分类'],
				select_type:''
			}
		},
		methods:{
			my_select(idx,type){
				this.select_type = type;
				this.good_msg.type = ''+(++idx);
			},

			remove_select(){
				this.select_type = "请选择类型";
				this.good_msg.type = '';
			}
		}
	}
</script>