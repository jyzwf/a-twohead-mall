<!-- 轮播 
1.请在调用该组件的文件中，自定义img的高度。

-->
<template>
    <div class="carousel">
    <div class="swiper-container">
            <div class="swiper-wrapper" >
                <div class="swiper-slide" v-for="cover in commodity_cover">
                    <img class="carousel-img" :src='cover' />
                </div>
            </div> 
            <div class="swiper-pagination"></div>
    </div>
    </div> 
</template>

<style lang='sass'>
    $white:#fff;
    @import "../assets/libs/css/swiper.min.css";
    .swiper-pagination-fraction{
            color: $white;
            text-align: right;
            padding-right: 0.1rem;
            bottom:0;
            font-size: 0.12rem;
    }
    .swiper-pagination-bullet-active{
        background-color:#fc4766;
    }
    .swiper-wrapper{
        transition-timing-function:ease-in;
    }
</style>

<script>
    import Swiper from 'swiper';
   
    export default{
        props:['commodity_cover'],
        events:{
            beginSwiper(){
                
                this.$nextTick(()=>{
                    new Swiper('.swiper-container',{
                        autoplay: 1500,
                        effect : 'fade',
                        fade: {
                          crossFade: true,
                        },
                        lazyLoading: true,
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        autoplayDisableOnInteraction:false,
                        loop:true
                    })
                })
            }
        }
    }
</script>