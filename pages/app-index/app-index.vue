<template>
	<view>
		</br></br></br></br></br></br>
		<text class="content">
			该软件所发布的一切功能服务、破解补丁、注册机和注册信息及软件的解密分析文章仅限用于学习和研究目的；不得将上述内容用于商业或者非法用途，否则，一切后果请用户自负。本站信息来自网络，版权争议与本站无关。您必须在下载后的24个小时之内，从您的电脑中彻底删除上述内容。如果您喜欢该程序，请支持正版软件，购买注册，得到更好的正版服务。如有侵权请邮件与我们联系处理。
		</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
			const isLogin = uni.getStorageSync('isLogin');
			console.log(isLogin);
			if(!isLogin){
				console.log('未登录');
				uni.redirectTo({
					url: "/pages/login/login",
				});
			}
		}
	}
</script>

<style>
.content{
	text-align: center;
	display: block;
	justify-content: center;
	align-items: center;
}
</style>
