<template>
	<div id="no_order">
		<div class="aui-content">
        	<ul class="aui-list aui-media-list flea-no-order aui-form-list">
    	        <li class="aui-list-item">
    	            <div class="aui-list-item-inner aui-padded-b-0 aui-padded-t-0 aui-list-item-center aui-list-item-btn">
    	                <div class="aui-col-xs-3">
                            <img class="aui-img-round" src="/assets/imgs/no-order.svg">
                        </div>
    	            </div>
    	        </li>

    	        <li class="aui-list-item flea-nickname">
            	    <div class="aui-list-item-inner  aui-padded-t-0 aui-padded-b-0 aui-list-item-center aui-list-item-btn">
            	        <div class="aui-margin-r-5 aui-font-size-14">暂无相关订单</div>
            	    </div>
            	</li>
    	    </ul>
    	</div>
	</div>
</template>

<style lang='sass'>
	#no_order{
		margin-top:5rem;
		.flea-no-order{
			&:after{
				content:none;
			}

			li{
				background:transparent;
				&:after{
					content:none;
				}
			}
		}


	}
</style>