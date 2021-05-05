<template>
	<view class="goods_detail">
		商品id:{{id}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0
			}
		},
		methods: {
		},
		onLoad (options) {
			this.id = options.id
		},
		components: {}
	}
</script>

<style lang="scss">

</style>
