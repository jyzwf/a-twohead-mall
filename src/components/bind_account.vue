<template>
	<div id="bind_account_type">
		<div class="register_account">
			<ul class="aui-list aui-media-list">
            <li class="aui-list-header">
                注册账号
            </li>
            <li class="aui-list-item aui-list-item-middle">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media login_ways_icon" style="width: 3rem;">
                        <i class="aui-iconfont aui-icon-mobile"></i>
                    </div>
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title aui-font-size-14">手机号</div>
                            <div class="aui-list-item-right">已登录</div>
                        </div>
                        <div class="aui-list-item-text">
                            15958034445
                        </div>
                    </div>
                </div>
            </li>
        </ul>
		</div>

		<!-- 其他登录方式 -->
		<ul class="aui-list aui-media-list aui-margin-t-15">
            <li class="aui-list-header">
                其他登录方式
            </li>
            <li class="aui-list-item aui-list-item-middle">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media login_ways_icon" style="width: 3rem;">
                        <i class="aui-iconfont aui-icon-wechat"></i>
                    </div>
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title aui-font-size-14">微信</div>
                            <a href="" title="">
                            <div class="aui-label aui-label-outlined"><i class="aui-iconfont aui-icon-plus"></i> 绑定</div>
                            </a>
                        </div>
                    </div>
                </div>
            </li>
            <li class="aui-list-item aui-list-item-middle">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media login_ways_icon" style="width: 3rem;">
                        <i class="aui-iconfont aui-icon-qq"></i>
                    </div>
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title aui-font-size-14">QQ</div>
                            <a href="" title="">
                            <div class="aui-label aui-label-outlined"><i class="aui-iconfont aui-icon-plus"></i> 绑定</div>
                            </a>
                        </div>
                    </div>
                </div>
            </li>
            <li class="aui-list-item aui-list-item-middle">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media login_ways_icon" style="width: 3rem;">
                        <i class="aui-iconfont aui-icon-weibo "></i>
                    </div>
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-text">
                            <div class="aui-list-item-title aui-font-size-14">新浪微博</div>
                            <a href="" title="">
                            <div class="aui-label aui-label-outlined"><i class="aui-iconfont aui-icon-plus"></i> 绑定</div>
                            </a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
	</div>
</template>

<style lang="sass">
$icon_color:#fc4766;

	#bind_account_type{
		.login_ways_icon{
			justify-content:center;
			i{
				font-size: 1.4rem;
				color:$icon_color;
			}
		}

		.aui-icon-plus{
			font-size: 0.6rem;
		}
	}
</style>