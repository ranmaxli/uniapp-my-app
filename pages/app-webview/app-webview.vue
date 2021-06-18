<template>
    <view class="app-webview">
		<div>
			<p>{{QRContent}}</p>
		</div>
		<div v-if="webContent">
			<web-view :src="webContent"></web-view>
		</div>
	</view>
</template>

<script>
    export default {
		data() {
				return {
					QRContent: '',
					webContent: '',
					currentWebview:'',
				}
			},
			methods: {
			},
			onLoad (options) {
				if(options.url != null){
					//普通webview页面跳转
					this.webContent = options.url;
				}else if(options.QRCode.indexOf('http') == -1){
					//二维码纯文本
					this.QRContent = options.QRCode;
				}else{
					//二维码网页
					this.webContent = options.QRCode;
				}
				
				// #ifdef APP-PLUS
				this.currentWebview = this.$mp.page.$getAppWebview()
				// #endif
			},
			onReady(){
				this.currentWebview.children()[0].onloaded=function() {
					setTimeout(()=>{
						const videoURL=this.getURL()
						const canClipboard = uni.getStorageSync('canClipboard');
						const matchedUrl=videoURL.startsWith('https://dsys2021.com/vodplay/')||videoURL.startsWith('https://dsys.tv/vodplay/')
						if(matchedUrl&&canClipboard){
							uni.setClipboardData({
								data: videoURL,
								success: () => {
									uni.showToast({
										title: '复制成功'
									})
								},
							})
						}
						uni.setStorageSync('canClipboard', false);
					},1000)
				}
			},
			onShow(){
				// #ifdef APP-PLUS
				plus.screen.lockOrientation('default'); 
				// #endif
			},
			onUnload(){
				// #ifdef APP-PLUS
				plus.screen.lockOrientation('portrait-primary'); 
				// #endif
			},
			onNavigationBarButtonTap(e){
				let videoURL = '';
				if(this.webContent.indexOf('qq') != -1 || this.webContent.indexOf('iqiyi') != -1 || this.webContent.indexOf('youku') != -1 ){
					videoURL = "https://vip.parwix.com:4433/player/?url=" + this.currentWebview.children()[0].getURL();
				}else{
					videoURL = this.currentWebview.children()[0].getURL();
					if(videoURL.startsWith('https://dsys2021.com')||videoURL.startsWith('https://dsys.tv')){
						uni.setStorageSync('canClipboard', true);
						this.currentWebview.children()[0].reload()
						return
					}
				}
				
				// #ifndef H5
				uni.setClipboardData({
					data: videoURL,
					success: () => {
						uni.showToast({
							title: '复制成功'
						})
					},
				})
				// #endif
			},
			components: {}
		}
</script>