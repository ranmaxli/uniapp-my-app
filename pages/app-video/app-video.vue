<template>
	<view class="app-video">
		<div class="usercolumn-two gdgn ">
			<div class="conttitle">免费视频</div>
			<ul class="mine-grid-ul">
				<li @click="toFreeVideo1">
					<image src="../../static/member/wdgn_4.png" class="imgicon"></image>
					<p>动漫花园</p>
				</li>
				<li @click="toFreeVideo2">
					<image src="../../static/member/wdgn_4.png" class="imgicon"></image>
					<p>无极电影</p>
				</li>
				<li @click="toFreeVideo3">
					<image src="../../static/member/wdgn_4.png" class="imgicon"></image>
					<p>大师影视</p>
				</li>
				<!-- <li @click="toFreeVideo4">
					<image src="../../static/member/wdgn_4.png" class="imgicon"></image>
					<p>解析</p>
				</li> -->
			</ul>
			
			<div class="conttitle">优质视频</div>
			<ul class="mine-grid-ul">
				<li @click="toWebView1">
					<image src="../../static/member/wdgn_7.png" class="imgicon"></image>
					<p>腾讯</p>
				</li>
				<li @click="toWebView2">
					<image src="../../static/member/wdgn_7.png" class="imgicon"></image>
					<p>爱奇艺</p>
				</li>
				<li @click="toWebView3">
					<image src="../../static/member/wdgn_7.png" class="imgicon"></image>
					<p>优酷</p>
				</li>
				<li @click="toWebView4">
					<image src="../../static/member/wdgn_7.png" class="imgicon"></image>
					<p>bilibili</p>
				</li>
			</ul>
			
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pagesURL:"/pages/app-webview/app-webview?url=",
			}
		},
		methods: {
			toFreeVideo1(){
				uni.navigateTo({
					url: this.pagesURL + 'http://www.yhdm.so/'
				})
			},
			toFreeVideo2(){
				uni.navigateTo({
					url: this.pagesURL + 'https://5ji.tv/'
				})
			},
			toFreeVideo3(){
				uni.navigateTo({
					url: this.pagesURL + 'https://dsys.cc/'
				})
			},
			toFreeVideo4(){
				uni.navigateTo({
					url: this.pagesURL + 'https://vip.parwix.com:4433/player/?url='
				})
			},
			toWebView1(){
				uni.navigateTo({
					url: this.pagesURL + 'https://v.qq.com/'
				})
			},
			toWebView2(){
				uni.navigateTo({
					url: this.pagesURL + 'https://www.iqiyi.com/'
				})
			},
			toWebView3(){
				uni.navigateTo({
					url: this.pagesURL + 'https://www.youku.com/'
				})
			},
			toWebView4(){
				uni.navigateTo({
					url: this.pagesURL + 'https://www.bilibili.com/'
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
