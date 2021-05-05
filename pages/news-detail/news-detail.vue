<template>
	<view class="news_detail">
		消息ID：{{id}}
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
		onLoad(options){
			this.id = options.id
		}
	}
</script>

<style lang="scss">
	
</style>
