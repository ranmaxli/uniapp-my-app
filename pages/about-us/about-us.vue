<template>
	<view class="about-us">
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:`<p>
							三农宝目前是先进的农产品移动电子商务平台。我们将在互联网中开创一片属于我们的天地，一个没有人做到的天地。
						</p>
						<p style="white-space: normal;">
							客服热线：0552--8586002
						</p>
						<p style="white-space: normal;">
							工作时间：上午9:00-下午18:00
						</p>
						<p>
							<br/>
						</p>`
			};
		}
	}
</script>

<style lang="scss" scoped>
	.about-us{
		padding: 20rpx;
		line-height: 1.8;
	}
</style>
