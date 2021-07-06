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
							电子商务平台。
						</p>
						<p style="white-space: normal;">
							客服热线：0552--111111111
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
