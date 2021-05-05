<template>
	<view>
		<view class="search_item" @click="navigator(item.id)" v-for="item in list" :key="item.id">
			<image :src="item.img_url"></image>
			<view class="right">
				<view class="tit">
					{{item.title}}
				</view>
				<view class="info">
					<view class="price">
						<text>￥{{item.price}}/{{item.unit}}</text>
						<text>成交量{{item.volume}}</text>
					</view>
					<view class="wholesale">
						<text>{{item.wholesale}}{{item.unit}}起批</text>
						<text>{{item.distance}}公里</text>
					</view>
					<view class="addr">
						{{item.address}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['list'],
		methods:{
			navigator (id) {
				this.$emit('itemClick',id)
			}
		}
	}
</script>

<style lang="scss">
	.search_item{
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid #E4E7ED;
		image{
			min-width: 200rpx;
			max-width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}
		.right{
			margin-left: 15rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.tit{
				font-size: 30rpx;
			}
			.info{
				.price{
					color: red;
					font-size: 30rpx;
					text:nth-child(2){
						margin-left: 20rpx;
						color: #909399;
						font-size: 28rpx;
					}
				}
				.wholesale{
					margin: 10rpx 0;
					font-size: 28rpx;
					color: #909399;
					text:nth-child(2){
						margin-left: 20rpx;
					}
				}
				.addr{
					color: #909399;
					font-size: 24rpx;
				}
			}
		}
	}
</style>
