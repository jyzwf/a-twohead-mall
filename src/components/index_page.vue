<!-- 首页的承载页 -->
<template>
	<div id="index_page">
		<loader></loader>
		<header-bar></header-bar>
		<!-- <notice></notice>	-->
		<carousel :commodity_cover = 'index_pics'></carousel>
		<classification></classification>	
<!-- 		<new-release></new-release> -->
		<recommend></recommend>
		<footer-nav :isactive='1'></footer-nav>
	</div>
</template>

<style lang='sass'>

$base-color:#fc4766;
$white:#fff;

	#index_page{

		margin-bottom:3rem;

		.flea_no_input{
			*{
				background: $white;
				&:after,&:before{
					content:none;
				}
			}
		}		
		.decoration{
			border-left:3px solid $base-color;
		}
	}
</style>

<script>
	import loader from './loader';
	import headerBar from './index_headerbar';
	import carousel from './carousel';
	import classification from './classification';
	import newRelease from './new_release';
	import recommend from './classify_recommend';
	import footerNav from './bottom_nav';


	export default{
		components:{
			loader,
			headerBar,
			carousel,
			classification,
			// newRelease,
			recommend,
			footerNav
		},

		data(){
			return{
				index_pics : ['/assets/imgs/index.jpg','/assets/imgs/index2.jpg']
			}
		},
		ready(){
			 this.$broadcast('beginSwiper');
		}
	}

</script>