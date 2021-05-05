<script>
	export default {
		data: function() {
			return {
				version:10,
			}
		},
		methods:{
			// var _this = this;  
			/**
			 * 安卓应用的检测更新实现
			 */
			async AndroidCheckUpdate(){  
				const res = await this.$myRuquest({
					url: '/api/checkAndroidVersion'
				})
				
				var _this = this;  
				var server_version = res.version;
				var currTimeStamp = res.timestamp;
				// 判断缓存时间
				uni.getStorage({
					key: 'tip_version_update_time',
					success: function (res) {
						var lastTimeStamp = res.data;
						//定义提醒的时间间隔，避免烦人的一直提示，一个小时：3600；一天：86400
						var tipTimeLength = 3600;
						if((lastTimeStamp+tipTimeLength) > currTimeStamp){
							//避免多次提醒，不要更新
							console.log("避免多次提醒，不要更新");
						}else{
							//重新设置时间戳
							_this.setStorageForAppVersion(currTimeStamp);
							//进行版本型号的比对 以及下载更新请求
							_this.checkVersionToLoadUpdate(server_version, _this.version);
						}
					},
					fail:function(res){
						_this.setStorageForAppVersion(currTimeStamp);
					}
				}); 
			},
			/**
			 * //设置应用版本号对应的缓存信息
			 * @param {Object} currTimeStamp 当前获取的时间戳
			 */
			setStorageForAppVersion:function(currTimeStamp){
				uni.setStorage({
					key: 'tip_version_update_time',
					data: currTimeStamp,
					success: function () {
						console.log('setStorage-success');
					}
				});
			},
			/**
			 * 进行版本型号的比对 以及下载更新请求
			 * @param {Object} server_version 服务器最新 应用版本号
			 * @param {Object} curr_version 当前应用版本号
			 */
			checkVersionToLoadUpdate:function(server_version,curr_version){
				console.log(server_version)
				console.log(curr_version)
				if(server_version > curr_version){
					//TODO 此处判断是否为 WIFI连接状态
					if(plus.networkinfo.getCurrentType()!=3){
						uni.showToast({  
							title: '有新的版本发布，检测到您目前非Wifi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI之后重新检测更新',  
							mask: true,  
							duration: 5000,
							icon:"none"
						});  
						return;  
					}else{
						uni.showModal({
							title: "版本更新",
							content: '有新的版本发布，检测到您当前为Wifi连接，是否立即进行新版本下载？',
							confirmText:'立即更新',
							cancelText:'稍后进行',
							success: function (res) {
								if (res.confirm) {
									uni.showToast({
										icon:"none",
										mask: true,
										title: '有新的版本发布，检测到您目前为Wifi连接，程序已启动自动更新。新版本下载完成后将自动弹出安装程序',  
										duration: 5000,  
									}); 
									//设置 最新版本apk的下载链接
									var downloadApkUrl = "http://1.116.91.83:9001/upload/app.apk";
									var dtask = plus.downloader.createDownload( downloadApkUrl, {}, function ( d, status ) {  
											// 下载完成  
											if ( status == 200 ) {   
												plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename),{},{},function(error){  
													uni.showToast({  
														title: '安装失败', 
														duration: 1500  
													});  
												})
											} else {  
												 uni.showToast({  
													title: '更新失败',
													duration: 1500  
												 });  
											}    
										});  
									dtask.start();
								} else if (res.cancel) {
									console.log('稍后更新');
								}
							}
						});
					}
				}
			}
		},
		async onLaunch() {
			var _this = this; 
			// #ifdef APP-PLUS
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					_this.AndroidCheckUpdate(); 
					console.log('运行Android上') 
					plus.navigator.closeSplashscreen();
					// plus.screen.lockOrientation('landscape-primary'); //锁定
					break;
				case 'ios':
					//console.log('运行iOS上') 
					plus.navigator.closeSplashscreen();
					break;
				default:
					//console.log('运行在开发者工具上') 
					break;
			}
			// #endif
		},
		onShow: function() {},
		onHide: function() {},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.input-box {
		padding: 50rpx;
		font-size: 30rpx;
		.input-item {
			display: flex;
			background: white;
			border-bottom: 1rpx solid #eeeeee;
			line-height: 100rpx;
			height: 100rpx;
			.input-label {
				width: 150rpx;
			}
			.input-body{
				position: relative;
				height: 100rpx;
				width: calc(100% - 150rpx);
				.input {
					line-height: 100rpx;
					height: 100rpx;
					position: relative;
					font-size: 28rpx;
				}
				.eye{
					position: absolute;
					height: 50rpx;
					width: 50rpx;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				.btn-code{
				    position: absolute;
				    right: 0rpx;
				    top:50%;
				    transform: translateY(-50%);
					background: none;
					color: #205592;
					width: 160rpx;
					font-size: 24rpx;
					box-sizing: border-box;
					text-align: right;
					padding: 0;
					height: 100rpx;
					line-height: 100rpx;
				}
			}
			
		}
		.select {
			padding-top: 40rpx;
			display: flex;
			justify-content: space-between;
			color: #003B67;
		}
	}
	.button{
		margin:0 30rpx;
		background: #08B6F2;
		border-radius:50rpx;
		line-height: 80rpx;
		height: 80rpx;
		color: white;
		font-size: 32rpx;
	}
	button::after{
		border: none;
	}
</style>
