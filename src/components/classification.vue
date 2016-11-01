<!-- 分类 -->
<template>
	<div id="classification">
		<section class="aui-grid  aui-margin-b-15">
		    <div class="aui-row">
			<a href="../classify_type/classify_type.html?type=1" title="">
		        <div class="aui-col-xs-3 aui-padded-t-10  aui-padded-b-10">
		            	<embed src="/assets/imgs/shop_bag.svg" alt="">
		            	<div class="aui-grid-label">书籍教材</div>
		           
		        </div>
		     </a>
		    <a href="../classify_type/classify_type.html?type=2" title="">
		        <div class="aui-col-xs-3 aui-padded-t-10 aui-padded-b-10">

		        	    <embed src="/assets/imgs/computer.svg" alt="">
		        	    <div class="aui-grid-label">电脑数码</div>
		        	
		        </div>
		    </a>

		   	<a href="../classify_type/classify_type.html?type=3" title="">
		        <div class="aui-col-xs-3 aui-padded-t-10 aui-padded-b-10">

		            	<embed src="/assets/imgs/clothes.svg" alt="">
		            	<div class="aui-grid-label">衣服鞋饰</div>
		            
		        </div>
		    </a>
		    <a href="../classify_type/classify_type.html?type=4" title="">
		        <div class="aui-col-xs-3 aui-padded-t-10 aui-padded-b-10">

		        	    <embed src="/assets/imgs/else.svg" alt="">
		        	    <div class="aui-grid-label">其他分类</div>
		        	
		        </div>
		    </a>
		    </div>
		</section>
	</div>
</template>

<style lang='sass'>
$border-color:#ddd;
	#classification{
		section>div{
			border-bottom: 1px solid $border-color;
			embed{
				width:2.5rem;
			}
			
			.aui-grid-label{
			    font-size: 0.8rem;
			}

			a{
				display: block
			}
		}
	}
</style>