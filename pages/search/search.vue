<template>
	<view>
		<view class="search-area">
			<input
				v-model="searchWord"
				placeholder="请输入产品名称" 
				class="search-input"
			/>
			<text class="search-click" @click="getGoodsList">搜索</text>
		</view>
		<search-item @itemClick="goDetail" :list="goodsList"></search-item>
	</view>
</template>

<script>
	import searchItem from '../../components/search-item/search-item.vue'
	export default {
		data() {
			return {
				searchWord:'',
				goodsList: []
			}
		},
		methods: {
			async getGoodsList () {
				const res = await this.$myRuquest({
					url: '/api/product/searchList?searchWord='+this.searchWord
				})
				this.goodsList = res
			},
			goDetail (id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id='+id
				})
			}
		},
		components: {"search-item":searchItem},
	}
</script>

<style lang="scss" scoped>
	.search-area{
		width: 500rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 20rpx auto;
		.search-input{
			width: 80%;
			line-height: 60rpx;
			height: 60rpx;
			border-radius: 50rpx;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			background-color: #BBBBBB;
		}
		.search-click{
			font-size: 36rpx;
		}
	}
</style>
