// const BASE_URL = 'http://192.168.100.3:3000'
const BASE_URL = 'http://1.116.91.83:3000'
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res)=>{
				if(res.data.code !== 20200) {
					return uni.showToast({
						icon:'none',
						title: '获取数据失败'
					})
				}
				resolve(res.data.data)
			},
			fail: (err)=>{
				uni.showToast({
					icon:'none',
					title: '请求接口失败'
				})
				reject(err)
			}
		})
	})
}