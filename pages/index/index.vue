<template>
	<view class="goods_list">
		<goods-list @goodsItemClick="goGoodsDetail" :goods="goods"></goods-list>
		<view class="isOver" v-if="flag">-----到底了-----</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		data() {
			return {
				pageindex: 1,
				goods: [],
				flag: false
			}
		},
		components: {"goods-list":goodsList},
		methods: {
			// 获取商品列表数据
			async getGoodsList(callBack) {
				const res = await this.$myRuquest({
					url: '/api/product/list?pageindex='+this.pageindex
				})
				this.goods = [...this.goods,...res]
				callBack && callBack()
			},
			// 导航到商品详情页
			goGoodsDetail (id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id='+id
				})
			}
		},
		async onLoad () {
			this.getGoodsList()
		},
		onReachBottom() {
			if(this.goods.length<this.pageindex*10) return this.flag = true
			this.pageindex++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.pageindex = 1
			this.goods = []
			this.flag = false
			this.getGoodsList(()=>uni.stopPullDownRefresh())	
		}
	}
</script>

<style lang="scss">
	.goods_list {
		background: #eee;
	}
	.isOver {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 28rpx;
	}
</style>
