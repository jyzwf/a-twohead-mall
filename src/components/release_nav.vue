<!-- 商品发布头 -->
<template>
		<div class="aui-tab" id="tab">
		    <div class="aui-tab-item aui-active flea-num" :class={'flea-active':step} @click='change_state(1)' data-content='1'>选择分类</div>
		    <div class="aui-tab-item aui-active flea-num" :class={'flea-active':!step} @click='change_state(2)' data-content='2'>填写信息</div>
		</div>
</template>

<style lang='sass'>
	$base-color:#fc4766;
	$nav-color:#999;
	$white:#fff;

	@mixin set_color($col:$nav-color){
		color:$col;
		border-bottom:2px solid $col;
	};
	
	#tab{
		.aui-active{
			@include set_color;
		}

		.flea-num{
			height:2.5rem;
			line-height:2.5rem;
			overflow:visible;
			&:before{
				content:attr(data-content);
				position: absolute;
				left:50%;
				bottom:0;
				width:0.8rem;
				height:0.8rem;
				line-height:0.8rem;
				border-radius:50%;
				border:2px solid $nav-color;
				background:$white;
				transform:translate3d(-50%,50%,0);
				z-index: 999
			}
		}

		.flea-active{
			@include set_color($base-color);
			&:before{
				border-color:$base-color;
			}
		}

	}
</style>

<script>
	export default{
		props:['step'],
		methods:{
			change_state(num){
				num == 1 ? this.step = true : this.step = false;
			}
		}
	}
</script>