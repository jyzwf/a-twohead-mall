<!-- 立即购买底部条 -->
<template>
	<div id="buy_now_bar">
		<footer class="aui-bar aui-bar-tab" id="footer">
		    <section class="aui-grid">
			    <div class="aui-row">
    				<div class="aui-col-xs-9 aui-padded-t-10 aui-padded-b-10 aui-padded-r-10">
    				    <div class="aui-grid-label aui-pull-right">合计： ￥{{all_money}}</div>
    				</div>
    				<button class="aui-col-xs-3 aui-padded-t-10 flea-border-left aui-padded-b-10" @click='place_order'>
    				    <div class="aui-grid-label">提交订单</div>
    				</button>
			</section>
		</footer>
	</div>
</template>

<style lang='sass'>
$border-color:#ddd;
$white:#fff;
$base-color:#fc4766;
	#buy_now_bar{
		footer{
			border-top: 1px solid $border-color;

			.flea-border-left{
				border: 0.2rem solid $base-color;
				outline:none;
				border-radius:0;
				background:$base-color;
				div{
					color:$white;
				}
			}
		}
	}
</style>


<script type="text/javascript">
	export default{
		props:['all_money'],
		methods:{
			place_order(){
				this.$dispatch('send_order');
			}
		}
	}
</script>