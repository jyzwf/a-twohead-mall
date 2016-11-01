<template>
	<div id="loader">
		<div class="loader-inner pacman">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</template>

<style lang='sass' scoped>

@import '../assets/libs/css/loaders.css';
@import '../assets/libs/css/loading-demo.css';

#loader {
	position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
	background: #ED5565;
	z-index: 9999;
	.loader-inner {
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);  /* Chrome, Opera 15+, Safari 3.1+ */
        	-ms-transform: translate(-50%, -50%);  /* IE 9 */
        		transform: translate(-50%, -50%);  /* Firefox 16+, IE 10+, Opera */
		width: 100px;
		height: 100px;
	}
}

.loaded #loader {
    visibility: hidden;
    -webkit-transform: translateX(100%);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: translateX(100%);  /* IE 9 */
            transform: translatex(100%);  /* Firefox 16+, IE 10+, Opera */
    -webkit-transition: all 0.3s 1s ease-out;  
            transition: all 0.3s 1s ease-out;
}

</style>


<script>

var $ = require('jquery');
// WAIT FOR EVERYTHING TO LOAD
$(document).ready(function(){
	$('body').addClass('loaded');
});	

</script>