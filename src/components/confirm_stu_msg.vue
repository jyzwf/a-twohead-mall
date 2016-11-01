<!-- 学生认证信息填写 -->
<template>
	<div id="confirm_stu_msg">
		<section class="aui-list aui-form-list aui-margin-t-15">
            <div class="aui-list-item aui-list-item-center">
                        <div class="aui-list-item-inner">
                            
                            <div class="aui-list-item-label">
                                学校
                            </div>
                            <div class="aui-list-item-input">
                                <select v-model='confirm_msg.schoolId'>
                                	<option value="1356" selected>杭州电子科技大学</option>
                                </select>
                            </div>
                        </div>
                    </div>
        
        
                    <div class="aui-list-item aui-list-item-center">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">
                                学号
                            </div>
                            <div class="aui-list-item-input aui-padded-r-5">

                                <input v-model='confirm_msg.stuNo'  id='register_methods'  placeholder="请输入学号">
                            </div>
                            <div class="aui-list-item-label-icon close_account" v-show='confirm_msg.stu_num' v-remove_ctx = 'confirm_msg.stu_num'>
                                <i class="aui-iconfont aui-icon-close"></i>
                            </div>
                        </div>
                    </div>
                    <div class="aui-list-item aui-list-item-center">
                        <div class="aui-list-item-inner">
                             <div class="aui-list-item-label">
                                密码
                            </div>
                            <div class="aui-list-item-input aui-padded-r-5">
                                <input v-model='confirm_msg.stuPwd' type="password" id='register_code' placeholder="请输入教务系统密码">
                            </div>
                            <div class="aui-list-item-label-icon close_account" v-show='confirm_msg.stu_password' v-remove_ctx = 'confirm_msg.stu_password'>
                                <i class="aui-iconfont aui-icon-close"></i>
                            </div>
                        </div>
                    </div>
        </section>
	</div>
</template>


<script>
	// import {schools as school_data} from '../js/data/school';
	import remove_dire from '../js/directives/remove_content';
	export default{
		props:['confirm_msg'],
	}
</script>