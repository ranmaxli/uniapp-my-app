<template>
	<view class="platform-agreement">
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:`<p>
							<br/>
						</p>
						<p>
							<br/>
						</p>`
			};
		}
	}
</script>

<style lang="scss" scoped>
	.platform-agreement{
		padding: 20rpx;
		line-height: 1.8;
	}
</style>
