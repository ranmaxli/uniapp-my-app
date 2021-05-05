<template>
    <view>
        <view class="input-box">
            <view class="input-item">
                <view class="input-label">手机号</view>
				<view class="input-body">
					<input 
						v-model="phone" 
						maxlength="11" 
						type="number" 
						placeholder="请输入手机号" 
						class="input"
					/>
				</view>
            </view>
            <view class="input-item">
				<view class="input-label">密码</view>
				<view class="input-body">
					<input 
						v-model="password" 
						type="text" 
						:password="isHidePassword?true:false" 
						style="margin-right: 50rpx;" 
						placeholder="请输入密码" 
						maxlength="11"  
						class="input" 
					/>
					<image 
						@click="isHidePasswordClick" 
						class="eye" 
						:src="isHidePassword?'/static/img/attention.png':'/static/img/attention_forbid.png'"
					></image>
				</view>
            </view>
            <view class="select">
                <navigator url="/pages/register/register" hover-class="none">注册</navigator>
                <navigator url="/pages/forget-pwd/forget-pwd" hover-class="none">忘记密码？</navigator>
            </view>
			
        </view>
        <button class="button" @click="submit">登录</button><br/>
		
		<view class="input-label"
		style="text-align: center;
		left: 0;
		right: 0;
		position: fixed;
		bottom: 15rpx;
		font-weight: 400;"
		>版本号：1.0.10</view>
		
    </view>
</template>
<script>
	import {checkPhone,checkPwd} from "@/common/common.js"
	export default {
		data:function(){
			return {
				isHidePassword:true,
				phone:"",
				password:""
			}
		},
		onLoad() {
			
		},
		methods: {
			isHidePasswordClick(){
				this.isHidePassword=!this.isHidePassword
			},
			submit() {
				if(!checkPhone(this.phone)){
					return;
				};
				if(!checkPwd(this.password)){
					return;
				};
				/*
				* 登录逻辑
				*/
				try {
					uni.setStorageSync('isLogin', true);
				} catch (e) {
					// error
					uni.showToast({
						title:'设置缓存失败!', 
						icon:'none'
					});
				}
				uni.reLaunch({
					url:'/pages/app-index/app-index'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>