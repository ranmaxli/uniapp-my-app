<template>
	<view>
		<img :src="imgData" ref="img" class="img-data" />
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				imgData: '',
				pusher: null,
				scanWin: null,
				snapshotTimeoutNumber: 3000,
				faceInitTimeout: null,
				snapshTimeout: null
			};
		},
		onLoad() {
			uni.showToast({
				title: "正在打开摄像头，请稍后",
				icon: "none"
			})
			//#ifdef APP-PLUS
			this.faceInit();
			//#endif
		},
		onHide() {
			this.faceInitTimeout && clearTimeout(this.faceInitTimeout);
			this.snapshTimeout && clearTimeout(this.snapshTimeout);
			this.scanWin.hide();
		},
		methods: {
			// （5）将base64图片【this.imgData】发送给后台
			faceHttp() {
				// 省略后台请求
				uni.navigateTo({
					url: "/pages/code/code"
				})
			},
			// （1）通过plus.video.createLivePusher创建直播推流
			pusherInit() {
				//获取当前窗口对象
				const currentWebview = this.$mp.page.$getAppWebview();
				//创建视频推流对象，url是视频上传到的服务器地址，不填表示不传视频
				this.pusher = plus.video.createLivePusher('livepusher', {
					url: '',
					top: '0px',
					left: '0px',
					width: '100%',
					height: '100%',
					position: 'absolute',
					aspect: '9:16',
					'z-index': 999
				});
				// 将推流对象append到当前页面中
				currentWebview.append(this.pusher);
				this.pusher.preview();
			},
 
			faceInit() {
				this.faceInitTimeout = setTimeout(() => {
					this.pusherInit();
					// //覆盖在视频之上的内容，-比如扫描框 
					// // （2）利用plus.webview.create将扫描框页面及扫描动画（xxx.html）覆盖在视频之上；
					// this.scanWin = plus.webview.create('/scan.html', '', {
					// 	background: 'transparent'
					// });
					// // 显示窗口
					// this.scanWin.show();
					// // this.snapshotPusher();
					// uni.hideToast();
				}, 200);
			},
			// （3）利用liverPusher对象的snapshot方法创建视频快照
			snapshotPusher() {
				this.snapshTimeout = setTimeout(() => {
					this.pusher.snapshot(
						e => {
							this.pusher.close();
							this.scanWin.hide();
							var src = e.tempImagePath;
							// 使用plus.zip.compressImage压缩图片
							this.getMinImage(src);
						},
						function(e) {
							plus.nativeUI.alert('snapshot error: ' + JSON.stringify(e));
						}
					);
				}, this.snapshotTimeoutNumber);
			},
			// （4）使用plus.zip.compressImage压缩图片
			getMinImage(imgPath) {
				plus.zip.compressImage({
						src: imgPath,
						dst: imgPath,
						overwrite: true,
						quality: 40
					},
					zipRes => {
						setTimeout(() => {
							var reader = new plus.io.FileReader();
							reader.onloadend = res => {
								var speech = res.target.result; //base64图片
								console.log(speech.length);
								this.imgData = speech;
								//将图片发送给后台
								this.faceHttp();
							};
							//一定要使用plus.io.convertLocalFileSystemURL将target地址转换为本地文件地址，否则readAsDataURL会找不到文件
							reader.readAsDataURL(plus.io.convertLocalFileSystemURL(zipRes.target));
						}, 1000);
					},
					function(error) {
						console.log('Compress error!', error);
					}
				);
			},
		},
 
	};
</script>
 
<style lang="scss" scoped>
	.img-data {
		width: 100%;
		height: auto;
	}
</style>