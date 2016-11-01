<!-- 个人中心承载页 -->
<template>
	<div id="my_center">
        <loader></loader>
		<center-header :is_auth.sync='authed' :change_tab.sync='tab'></center-header>
		<component :sell_auth='authed' :is='tab'></component>
<!--		<footer-nav :isactive='4'></footer-nav> -->
	</div>
</template>

<style lang='sass'>
$border-color:#ddd;
$base-color:#fa4766;
	#my_center{

		margin-bottom:3rem;

		footer{
			border-top:1px solid $border-color;
		}
		
	}
</style>

<script>
    import loader from './loader';
	import centerHeader from './my_center_header';
	import isBuyer from './is_buyer';
	import isSeller from './is_seller';

	export default{
		data(){
			return{
				tab:'isBuyer',
				authed:''
			}
		},
		components:{
             loader,
			'centerHeader':centerHeader,
			'isBuyer':isBuyer,
			'isSeller':isSeller,
		}
	}
</script>