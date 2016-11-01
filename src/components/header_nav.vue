<!-- 顶部导航栏组件 -->
<template>
    <header class="aui-bar aui-bar-nav aui-bar-light" >
        <a class="aui-pull-left aui-btn" @click="goBack">
            <span class="aui-iconfont aui-icon-left"  style="color:#000"></span>
        </a>
        <div class="aui-title" style="color:#000">{{title}}</div>
    </header>
</template>

<script>
    export default{
        props: {
            title: ''
        },
        methods:{
            goBack(){
                 window.history.back(-1);
            }
        }
    }
</script>