export function toast(title){
	uni.showToast({
		icon:'none',
		title:title
	})
}
/**
 * 手机号验证
 */
export function checkPhone(value){
	let reg =/^1\d{10}$/
	if(reg.test(value)){
		return true;
	}
	toast('手机号格式错误');
	return false
}
/**
 * 密码验证
 */
export function checkPwd(value){
	if(value.length>=6){
		return true;
	}
	toast('密码必须大于6位');
	return false
}
/**
 * 验证码验证
 */
export function checkCode(value){
	if(value.length==6){
		return true;
	}
	toast('验证码必须是6位数字');
	return false
}
/**
 * 退出登录
 */
export function logout(){
	try {
	    uni.removeStorageSync('isLogin');
		uni.redirectTo({
			url:'/pages/login/login'
		})
	} catch (e) {
	    // error
		toast('清除缓存失败!');
	}
}