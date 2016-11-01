<template>
    <header-nav :title='title'></header-nav>
	<div v-if='show_flag' class="aui-card-list flea-focus">
            <div v-if='followees[0]' class="aui-card-list-content">
                <ul class="aui-list aui-media-list">
                    <li class="aui-list-item aui-list-item-middle" v-for='focus in followees'>
                        <a href="../seller_page/sell_page.html?sellId={{focus.followeeUid}}">
                        <div class="aui-media-list-item-inner">
                            <div class="aui-list-item-media" style="width: 3rem;">
                                <img :src="focus.avatar" class="aui-img-round">
                            
                            </div>
                            <div class="aui-list-item-inner">
                               {{focus.nickName}}
                                <i @click='cancel_focus($index,focus.followeeUid)' class="flea-trash aui-iconfont aui-icon-trash"></i>
                            </div>
                        </div>
                        </a>
                    </li>
                </ul>
            </div>

            <div v-if='!followees[0]'  class="no_focus">
                <img src="/assets/imgs/ic-no-fans-copy.svg" alt="">
                <p>还没有人关注哦</p>
            </div>
        </div>
</template>

<script>
import {flea_get} from '../js/components/get';
import {flea_ajax,toast} from '../js/components/ajax';
import headerNav from '../../components/header_nav';

    export default{
        data(){
            return{
                followees:[],
                show_flag:false,
                'title':''
            }
        },
        components:{
            headerNav
        },
        methods:{
            cancel_focus(idx,fid){
                let t = confirm('你确定要取消关注吗?');
                if(t){
                    let _this = this;
                    flea_ajax({
                        way:'POST',
                        url:'http://api.tiaozaoj.com/follow/cancel',
                        data:{
                            cFolloweeUid:fid
                        },
                        cb(data){
                            toast.hide();
                            if(data.errNum == '0'){
                                // _this.focus_msg.isFollowed = false;
                                toast.success({
                                    title:'已取消关注',
                                    duration:2000
                                });

                                _this.followees.splice(idx,1);
                            }else{
                                toast.fail({
                                    title:data.retMsg,
                                    duration:2000
                                });
                            }
                        }
                    });
                }
            },
            format_query(str){
              let str_arr = str.slice(1).split('&'),
                json = {};
                if(!str_arr[0]){
                  return false;
                }
                str_arr.map((k)=>{
                  k = k.split('=');
                  json[k[0]] = k[1];
                })
                return json.isMy;
            },
        },
        ready(){
            let _this = this;
            var url_flag = this.format_query(location.search),url;
            console.log(url_flag)
            if(url_flag == 2){
                url = 'http://api.tiaozaoj.com/followees';
            }else if(url_flag == 1){
                url = 'http://api.tiaozaoj.com/followers';
            }

            flea_get({
                url:url,
                cb(data){
                    if(data.retMsg=='ok'){
                        _this.followees = data.retData;
                    }
                    console.log(data,_this.show_flag)
                    _this.show_flag = true;
                },
                errcb(){
                    _this.show_flag = true;
                }
            })
        }
    }
</script>


<style lang='sass'>
$bg-color:#fafafa;

.flea-focus{
    background:$bg-color;
    .flea-trash{
        float:right;
        cursor:pointer;
    }

    .no_focus{
            text-align: center;
            padding-top:5rem;

            *{
                font-size: 0.6rem;
            }

            img{
                margin-bottom: 0.6rem;
            }
    }
}
    
</style>