<template>
	<view class="goods_list">
		<view class="goods_item" 
			v-for="item in goods" 
			:key="item.id" 
			@click="navigator(item.id)"
		>
			<image :src="item.img_url"></image>
			<view class="info">
				<view class="name">
					{{item.title}}
				</view>
				<view class="price">
					<text>￥{{item.price}}/{{item.unit}}</text>
					<text>成交量{{item.volume}}</text>
				</view>
				<view class="wholesale">
					<text>{{item.wholesale}}{{item.unit}}起批</text>
					<text>{{item.distance}}公里</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goods'],
		methods: {
			navigator (id) {
				this.$emit('goodsItemClick',id)
			}
		}
	}
</script>

<style lang="scss">
	.goods_list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.goods_item {
			background: #fff;
			width: 355rpx;
			margin: 10rpx 0;
			box-sizing: border-box;
			image{
				width: 100%;
				height: 180px;
				display: block;
				margin: auto;
			}
			.info{
				padding: 15rpx;
				.name {
					font-size: 28rpx;
					line-height: 50rpx;
				}
				.price{
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: red;
					font-size: 30rpx;
					margin: 0 0 5rpx 0;
					border-bottom: 1px solid #C0C4CC;
					text:nth-child(2){
						color: #909399;
						font-size: 28rpx;
					}
				}
				.wholesale{
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #909399;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
