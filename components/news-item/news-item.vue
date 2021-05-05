<template>
	<view class="news_item_wrapper">
		<view class="news_item" @click="navigator(item.id)" v-for="item in list" :key="item.id">
			<view class="time">
				{{item.time}}
			</view>
			<view class="card">
				<view class="top">
					<view class="title">
						<text v-if="!item.isRead" class="point"></text>
						<text>{{item.title}}</text>
					</view>
					<image src="../../static/img/iconn.png" mode=""></image>
				</view>
				<view class="content">
					{{item.content}}
				</view>
				<view class="detail">
					<text>查看详情</text>
					<text>></text>
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

<style lang="scss" scoped>
	.news_item_wrapper{
		background-color: #eee;
		padding: 0 20rpx 20rpx;
		.news_item{
			.time{
				text-align: center;
				padding: 20rpx 0;
				font-size: 24rpx;
			}
			.card{
				background-color: #fff;
				padding: 20rpx;
				border-radius: 10rpx;
				.top{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.title{
						display: flex;
						align-items: center;
						.point{
							width: 10rpx;
							height: 10rpx;
							margin-right: 10rpx;
							border-radius: 50%;
							background-color: #ff0000;
						}
					}
					image{
						width: 40rpx;
						height: 40rpx;
					}
				}
				.content{
					color: #909399;
					font-size: 28rpx;
					padding: 20rpx 0;
					border-bottom: 1rpx solid #E4E7ED;
				}
				.detail{
					padding-top: 16rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #909399;
					text:nth-child(1){
						color: $shop-color;
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
