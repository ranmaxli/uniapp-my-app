<template>
	<view class="app-my">
		<div class="mine-bg">
			<!-- <div class="xiaoxit">
				<image src="../../static/member/message_icon.png" class=""></image>
				<span class="weui-badge1" v-if="messageNum>0">{{messageNum}}</span>
			</div> -->
			<div class="userinfo">
				<div class="usertx">
					<image :src="user.headpic" class="usertximg"></image>
				</div>
				<h4 class="username">
					<p class="info_name">
						{{user.nickname}}<span class="sfen">内测用户</span>
					</p>
					<p class="info_phone">
						{{user.username}}
					</p>
				</h4>
			</div>
		</div>
	
		<div class="usercolumn-two gdgn ">
			<div class="conttitle">全部功能</div>
			<ul class="mine-grid-ul">
				<li>
					<image src="../../static/member/wdgn_17.png" class="imgicon"></image>
					<p>体重数据</p>
				</li>
				<li>
					<image src="../../static/member/wdgn_19.png" class="imgicon"></image>
					<p>健身数据</p>
				</li>
				<li @click="toCamera">
					<image src="../../static/icon/camera.png" class="imgicon"></image>
					<p>调用相机</p>
				</li>
				<li @click="scan">
					<image src="../../static/icon/QR-code.png" class="imgicon"></image>
					<p>扫二维码</p>
				</li>
				<li @click="toSettingsDetail">
					<image src="../../static/member/wdgn_11.png" class="imgicon"></image>
					<p>设置</p>
				</li>
			</ul>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pagesURL:"/pages/app-webview/app-webview?QRCode=",
				messageNum:1,
				user:{
					headpic:'/static/member/head-portrait.png',
					nickname:'test',
					username:'欢迎大家一起探讨学习',
					balance:0.17,
				},
				collect:{
					num:2,
				},
				coupon:{
					num:0,
				},
				orderCount:{
					unpaid:1,
					paid:2,
					comment:3,
					afterSale:4,
				}
			}
		},
		methods: {
			toSettingsDetail(){
				uni.navigateTo({
					url: '/pages/settings-detail/settings-detail'
				})
			},
			scan() {
			    var _this = this;
			    uni.scanCode({
			　　　　　onlyFromCamera: true, //为true只允许相机扫码，不加允许相册扫码
			        success: function(res) {
						console.log('扫码成功',res.result);
						uni.navigateTo({
							url: _this.pagesURL + res.result
						})
			        },
			        fail: function(err) {
			            console.log('扫码失败', err)
			        }
			    })
			},
			toCamera(){
				uni.navigateTo({
					url: '/pages/app-camera/app-camera'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

ul {
	list-style: none;
}

.member{
	background: #eee;
	padding-bottom: 10rpx;
}

.mine-bg {
	background-color: #fff;
	background-image: url(../../static/member/mine-bg.png);
	background-size: cover;
	background-repeat: no-repeat;
	background-position: bottom center;
	width: 100%;
	padding: 30rpx 40rpx 50rpx 40rpx;
	position: relative;
}

.xiaoxit {
	position: absolute;
	right: 40rpx;
	top: 30rpx;
}

.xiaoxit image {
	filter: invert(100%);
	width: 60rpx;
	height: 60rpx;
}

.weui-badge1 {
	position: absolute;
	right: -26rpx;
	top: -12rpx;
	padding: 2rpx 10rpx;
	background-color: #f04141;
	color: #fff;
	display: inline-block;
	min-width: 16rpx;
	border-radius: 36rpx;
	line-height: 1.2;
	text-align: center;
	font-size: 24rpx;
	vertical-align: middle;
}

.userinfo {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 80rpx;
}

.userinfo .usertx {
	position: relative;
	margin-right: 16rpx;
	width: 100rpx;
	height: 100rpx;
}

.userinfo .usertx .usertximg {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 50%;
	overflow: hidden;
	border: 1rpx solid #fff;
}

.userinfo .username {
	flex: 1;
	min-width: 0px;
	font-size: 36rpx;
	color: #fff;
}

.userinfo .username .info_name {
	position: relative;
	padding-right: 100rpx;
}

.sfen {
	background: #ffcc00;
	color: #1a1a1a;
	font-size: 20rpx;
	border-radius: 6rpx;
	padding: 4rpx 6rpx;
	font-weight: normal;
	margin-left: 20rpx;
	vertical-align: middle;
}

.userinfo .username .info_phone {
	font-size: 28rpx;
	margin-top: 20rpx;
}

.userinfo .edit_info {
	background: #56c75c;
	border-radius: 40rpx;
	padding: 4rpx 20rpx;
	font-size: 24rpx;
	display: flex;
	align-items: center;
	color: #fff;
}

.userinfo .edit_info .editimg {
	width: 24rpx;
	height: 24rpx;
	margin-right: 8rpx;
}

.usercolumn-one {
	display: flex;
	-webkit-flex-wrap: wrap;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
	padding: 30rpx 0;
	background: #fff;
}

.usercolumn-one li {
	flex: 1;
	min-width: 0rpx;
	font-size: 24rpx;
	color: #4c4c4c;
	text-align: center;
}

.usercolumn-one li h2 {
	font-size: 36rpx;
	margin-bottom: 12rpx;
	font-family: 'din';
	color: #1a1a1a;
}

.usercolumn-two {
	background-color: #fff;
	margin: 20rpx 30rpx;
	border-radius: 16rpx;
}

.usercolumn-two.negative {
	position: relative;
	z-index: 1;
}

.usercolumn-two .conttitle {
	border-bottom: 2rpx solid #f5f5f5;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 30rpx;
}

.usercolumn-two .conttitle .right_arrow {
	font-size: 26rpx;
	color: #999;
}

.grid-flexauto li {
	flex: 1;
	min-width: 0rpx;
}

.grid-flexauto li view {
	position: relative;
	width: 80rpx;
	margin: auto;
}

.weui-badge {
	z-index: 9;
	position: absolute;
	right: 44rpx;
	top: 20rpx;
	padding: 2rpx 10rpx;
	background-color: #f04141;
	color: #fff;
	display: inline-block;
	min-width: 16rpx;
	border-radius: 36rpx;
	line-height: 1.2;
	text-align: center;
	font-size: 24rpx;
	vertical-align: middle;
}
.grid-flexauto li view .weui-badge {
	border: 2rpx solid #2eb243;
	background-color: #fff;
	color: #2eb243;
}

.usercolumn-two .mine-grid-ul {
	display: flex;
	flex-wrap: wrap;
	padding-bottom: 20rpx;
}

.usercolumn-two .mine-grid-ul li {
	text-align: center;
	width: 25%;
	font-size: 24rpx;
	color: #666;
	padding: 28rpx 0 0;
	position: relative;
}

.usercolumn-two .mine-grid-ul li .imgicon {
	width: 60rpx;
	height: 60rpx;
	margin: 0 auto 10rpx;
}

.gdgn .mine-grid-ul li .imgicon {
	width: 35px;
	height: 35px;
	margin-bottom: 10px;
}

.zd_img {
	padding: 0 30rpx;
	margin-top: -10rpx;
	margin-bottom: -10rpx;
	image{
		width: 100%;
		height: 160rpx;
	}
}
</style>
