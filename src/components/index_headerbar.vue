<!-- 首页顶部栏 -->
<template>
	<div id="idx_header_bar">
		<div class="aui-info aui-padded-l-10 aui-padded-r-10">
		    <div class="aui-info-item ">
		        <!-- <img src="/assets/imgs/logo.svg" style="width:1.5rem;height:1.5rem" class="aui-img-round" /> -->
		        <a href='../search/search.html'>
					<div class="aui-searchbar-input aui-margin-r-0 aui-border-radius">
					<img src="/assets/imgs/search.svg" class="aui-iconfont search-icon" class="aui-margin-r-5">
		    		    <input type="search" placeholder="搜索你想淘的宝贝" readonly id="search-input" >
		    		</div>
		        </a>
		    </div>
		</div>
	</div>	
</template>


<style lang='sass'>
	#idx_header_bar{
		overflow:hidden;
		a,.aui-info-item{
			flex:auto;
		}

		.aui-info{
			background-color: #fc4766;
		} 

		.search-icon{
			width: 1rem;
			height:1rem;
			margin-bottom: 0.1rem;
		}

		.aui-searchbar-input{
			background-color: #da4159;
		    border-radius: 0.4rem;
		    height: 1.8rem;
		    line-height: 1.8rem;
		}

		.aui-searchbar-input input {
			padding: 0.1rem 0 0 0.4rem;
			height: auto;
			font-size: 0.8rem;
		}

		input::-webkit-input-placeholder{
			color:#75212e;
		}
	}
</style>