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
					this.webContent = options.url;
				}else if(options.QRCode.indexOf('http') == -1){
					this.QRContent = options.QRCode;
				}else{
					this.webContent = options.QRCode;
				}
				
				// #ifdef APP-PLUS
				this.currentWebview = this.$mp.page.$getAppWebview()
				// #endif
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
				// console.log(JSON.stringify(e))
				console.log(this.currentWebview.children()[0].getURL())
				// #ifndef H5
				uni.setClipboardData({
					data: this.currentWebview.children()[0].getURL(),
					success: () => {
						uni.showToast({
							title: '复制成功'
						})
					}
				})
				// #endif
			},
			components: {}
		}
</script>