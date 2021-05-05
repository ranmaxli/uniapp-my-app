<template>
	<view class="settings-detail">
		<!-- <view class="list">
			<view @click="goto('/pages/about-us/about-us')">
				<text>关于我们</text>
				<text>></text>
			</view>
			<view @click="goto('/pages/platform-agreement/platform-agreement')">
				<text>平台协议</text>
				<text>></text>
			</view>
		</view> -->
		<view class="logout">
			<button type="default" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url:url
				})
			},
			logout() {
				try {
				    uni.removeStorageSync('isLogin');
				} catch (e) {
				    // error
				    uni.showToast({
				    	title:'清除缓存失败!', 
				    	icon:'none'
				    });
				}
				uni.reLaunch({
					url:'/pages/login/login'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.settings-detail{
		background: #eee;
		height: 1400rpx;
		.list{
			background-color: #fff;
			padding: 0 20rpx;
			&>view{
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #EBEEF5;
				text:nth-child(2){
					color: #909399;
				}
			}
		}
		.logout{
			padding: 50rpx 20rpx 0;
			button{
				background-color: #fff;
				color: $shop-color;
			}
		}
	}
</style>
