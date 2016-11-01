<!-- 关注 -->
<template>
	<div id="focus_seller">
		<div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">
            <li class="aui-list-item aui-list-item-middle">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img :src="focus_msg.avatar" class="aui-img-round aui-list-img-sm">
                    </div>
                    <div class="aui-list-item-inner">
                        <div class="info">
                            <div class="aui-list-item-text">
                            <div class="aui-list-item-title aui-font-size-14">  {{focus_msg.sellerName}}</div>
                             </div>
                            <div class="aui-list-item-text">{{focus_msg.campus}}</div>
                        </div>
                        <div class="focus">
                            <button :disabled='focus_msg.isSeller' class="aui-label flea-label-info" :class='{"active":focus_msg.isFollowed}' @click='is_focus'>{{focus_msg.isFollowed ? '已关注' : '关注Ta'}}
                        </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
	</div>
</template>

<style lang='sass'>
    $base-color:#fc4766;
    $white:#fff;
    #focus_seller{
        .info{
            width:75%;
            float:left;
        }
        .focus{
            float:left;
        }
        
        button{
            border:none;
            outline:none;
            background:transparent;
        }
        .flea-label-info{
            border:1px solid $base-color;
            color:$base-color;
            border-radius:4px;
            padding: 0.4rem;
            margin-top: 0.2rem;
            &.active{
                background:$base-color;
                color:$white;
            }
        }
    }
</style>


<script type="text/javascript">
import {flea_ajax,toast} from '../js/components/ajax';
// import {auth} from '../js/components/auth';

    export default{
        props:['focus_msg','is_seller'],
        
        methods:{

            is_focus(){
                if(this.is_seller){
                    return false;
                }
                
                let _this = this;
                
                if(this.focus_msg.isFollowed){
                    flea_ajax({
                        way:'POST',
                        url:'http://api.tiaozaoj.com/follow/cancel',
                        data:{
                            cFolloweeUid:_this.focus_msg.sellerUid
                        },
                        cb(data){
                            toast.hide();
                            console.log(data);
                            if(data.errNum == '0'){
                                _this.focus_msg.isFollowed = false;
                                toast.success({
                                    title:'已取消关注',
                                    duration:2000
                                });
                            }else{
                                toast.fail({
                                    title:data.retMsg,
                                    duration:2000
                                });
                            }
                        }
                    });
                }else{
                    flea_ajax({
                        way:'POST',
                        url:'http://api.tiaozaoj.com/follow/do',
                        data:{
                            followeeUid:_this.focus_msg.sellerUid
                        },
                        cb(data){
                            toast.hide();
                            console.log(data);
                            if(data.errNum == '0'){
                                _this.focus_msg.isFollowed = true;
                                toast.success({
                                    title:'关注成功',
                                    duration:2000
                                });
                            }else{
                                toast.fail({
                                    title:data.retMsg,
                                    duration:2000
                                });
                            }
                        }
                    });
                }
            }
        }
    }
</script>