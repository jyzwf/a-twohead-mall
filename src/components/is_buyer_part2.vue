<template>
	<div class="is_buyer_part2">
		<div class="aui-content">
    	    <ul class="aui-list aui-list-in">
<!--                 <li class="aui-list-item aui-list-item-middle">
                <img class="list-icon" height="18" src="/assets/imgs/bind.svg">
                <a href='../bind_account/bind_account.html' class="aui-list-item-inner aui-list-item-arrow">
                账号绑定
                  </a>
                </li> -->

    	        <li class="aui-list-item aui-list-item-middle">
                <img src="/assets/imgs/bag.svg" class="list-icon" > 
    	          <a href='../shop_car/shopcar.html' class="aui-list-item-inner aui-list-item-arrow">     购物袋
    	          </a>
    	    	</li>

                <li class="aui-list-item aui-list-item-middle">
                <img src="/assets/imgs/follow.svg" class="list-icon"  ><a href='../my_focus/my_focus.html?isMy=2' class="aui-list-item-inner aui-list-item-arrow">
                        我关注的
                  </a>
                </li>
    	</div>
        <div class="aui-content">
            <ul class="aui-list aui-list-in">
                 <li class="aui-list-item aui-list-item-middle aui-margin-t-15"> 
                 <img src="/assets/imgs/help.svg" class="list-icon">
                  <a class="aui-list-item-inner" href="http://form.mikecrm.com/HPiTHH"> 
                  问题反馈
                 </a>
                </li>
                
                <li class="aui-list-item aui-list-item-middle">
                <img src="/assets/imgs/question.svg" class="list-icon" > 
                <a class="aui-list-item-inner" href="http://mp.weixin.qq.com/s?__biz=MzIwOTM4NDI3MQ==&mid=100000034&idx=1&sn=67a23528d63c0ca50063bb6dd56755e6&scene=18#wechat_redirect"> 
                    关于我们
                    </a>
                </li>

                <li @click='logout' class="aui-list-item aui-list-item-middle  aui-margin-t-15">
                <div class="aui-list-item-inner aui-list-item-arrow">
                退出登录
                 </div>
                 </li>
            </ul>
        </div>
	</div>
</template>

<style>
.list-icon{
    width: 1rem;
    height: 1rem;
    margin-top: 0.6rem;
    margin-right: 0.5rem;
}
</style>


<script>
import {flea_ajax,toast} from '../js/components/ajax';
    export default{
        methods:{
            logout(){
                flea_ajax({
                    way:'POST',
                    url:'http://api.tiaozaoj.com/logout',
                    data:{},
                    cb(data){
                        if(data.errNum==0){
                            toast.success({
                                title:'退出成功',
                                duration:2000
                            });
                            window.location.href = '../login/login.html';
                            window.localStorage.clear();
                        }else{
                            toast.fail({
                                title:'退出失败',
                                duration:2000
                            });
                        }
                    }
                })
            }
        }
    }
</script>