<template>
	<div id="my_msg">
        <header-nav :title="title"></header-nav>
        <div class="aui-content">
            <ul class="aui-list aui-media-list flea-heading aui-form-list">
                <li class="aui-list-item aui-padded-t-15 aui-padded-b-15">
                    <div class="aui-list-item-inner aui-padded-b-0 aui-padded-t-0 aui-list-item-center aui-list-item-btn">
                        <div  id='qiniu_container'>
                            <span id="pickfiles"></span>
                            <img id='user_heading' class="aui-img-round" :src="user_info.avatar">
                        </div>
                    </div>
                </li>
            </ul>
        </div>


		<ul class="aui-list aui-form-list">
            <li class="aui-list-header flea-notice">基本信息</li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">
                        姓名
                    </div>
                    <div class="aui-list-item-input">
                        <input type="text" v-model='user_info.realName' placeholder="请输入姓名">
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">
                        昵称
                    </div>
                    <div class="aui-list-item-input">
                        <input type="text" v-model='user_info.nickName' placeholder="请输入昵称">
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">
                        性别
                    </div>
                    <div class="aui-list-item-input">
                        <select v-model='user_info.gender'>
                            <option value='' disabled selected>请选择性别</option>
                            <option value='男'>男</option>
                            <option value='女'>女</option>
                        </select>
                    </div>
                </div>
            </li>
            <li class="aui-list-header flea-notice">收货地址</li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">
                        学校
                    </div>
                    <div class="aui-list-item-input">
                        <select v-model='user_info.campus'>
                            <option value='' disabled selected>请选择你所在的学校</option>
                            <option >杭州电子科技大学</option>
                            <option >浙江传媒学院</option>
                            <option >浙江理工大学</option>
                        </select>
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">
                       楼号
                    </div>
                    <div class="aui-list-item-input">
                        <input type="text" v-model='user_info.dormitory' placeholder="请输入楼号">
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">
                        寝室号
                    </div>
                    <div class="aui-list-item-input">
                        <input type="number" v-model='user_info.dormitoryNo' placeholder="请输入寝室号">
                    </div>
                </div>
            </li>
        </ul>

        <div @click='save_msg' class="aui-btn flea-save aui-btn-info aui-btn-block aui-btn-sm">保存并返回</div>
	</div>
</template>


<style lang='sass'>
$bg_color:#fafafa;
$border:#dddddd;
$main-color:#fc4766;

    #my_msg{
        .flea-heading{
            &:after,&:before{
                content:none;
            }
        }
        .flea-notice{
            background:$bg_color;
            border-bottom:1px solid $border
        }

        .flea-save{
                width: calc(100% - 1.5rem);
                margin: 0.5rem auto;
                background:$main-color !important;
        }

        #qiniu_container{
            width:4.5rem;
            height:4.5rem;

            img{
                width:100%;
                height:100%;
            }
        }

        #pickfiles{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }

        .flea-color{
            background:$main-color !important;
        }
    }
</style>

<script>
import {flea_get} from '../js/components/get';
import {validate} from '../js/components/form_valid';
import {flea_ajax,toast} from '../js/components/ajax';
import headerNav from './header_nav.vue';
    export default{
        data(){
            return {
                user_info:{},
                qn_token:'',
                heading_key:'',
                title: '个人信息'
            }
        },
        components:{
            headerNav
        },
        methods:{
            validate(){
                let err_msg = validate.init([
                {
                    val:this.user_info.realName,
                    task:{
                        require:{
                            err_msg:'用户名不能为空'
                        }
                    }
                },

                {
                    val:this.user_info.nickName,
                    task:{
                        require:{
                            err_msg:'昵称不能为空'
                        }
                    }
                },

                {
                    val:this.user_info.gender,
                    task:{
                        require:{
                            err_msg:'请选择性别'
                        }
                    }
                },

                {
                    val:this.user_info.campus,
                    task:{
                        require:{
                            err_msg:'请选择学校'
                        }
                    }
                },

                {
                    val:this.user_info.dormitory,
                    task:{
                        require:{
                            err_msg:'楼号不能为空'
                        }
                    }
                },

                {
                    val:this.user_info.dormitoryNo,
                    task:{
                        require:{
                            err_msg:'寝室号不能为空'
                        },
                        iscount:{
                            err_msg:'寝室号为数字'
                        }
                    }
                },
            ]);

                return err_msg;
            },

            save_msg(){
                let err_msg = this.validate();
                if( err_msg ){
                    alert(err_msg);
                    return false;
                }

                let send_data = {
                    nickname:this.user_info.nickName,
                    realname:this.user_info.realName,
                    gender:this.user_info.gender,
                    campus:this.user_info.campus,
                    dormitory:this.user_info.dormitory,
                    dormitory_no:this.user_info.dormitoryNo,
                }


                flea_ajax({
                    way:'POST',
                    url:'http://api.tiaozaoj.com/user/profiles/modify',
                    data:send_data,
                    cb(data){
                        if(data.errNum==0){
                            toast.success({
                                title:'保存成功',
                                duration:2000
                            });
                            window.history.back(-1);
                        }else{
                            toast.fail({
                                title:'保存失败',
                                duration:2000
                            });
                        }
                    }
                })


            }
        },
        ready(){
            let _this = this;
            flea_get({
                url:'http://api.tiaozaoj.com/user/profiles',
                cb(data){
                    if(data.errNum == 0){
                        _this.user_info = data.retData;
                    }
                }
            });

        }
    }
</script>