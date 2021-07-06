<template>
	<view class="app-health">
		
		<view>
			<scroll-view scroll-x="true" class="myScroll">
				<view 
					v-for="(cate,index) in categories"
					:key="index"
					:class="[cateCurrentIndex == index ? 'cateSelected' : 'cateUnSle']" 
					@tap="tabChange(cate,index)"
					@longpress="longPressTab(cate,index)"
				>
					{{cate}}
					<view :class="[cateCurrentIndex == index ? 'lineSelected' : '']"></view>
				</view>
			</scroll-view>
		</view>

		<view>
			<view class="charts-box">
				<qiun-data-charts 
					type="line"
					:opts="{
						extra:{line:{type:'curve'}},
						enableScroll:true,
						xAxis:{scrollShow:true,itemCount:4,disableGrid:true}
					}" 
					:chartData="chartsDataLine1" 
					:ontouch="true"
					:canvas2d="true"
				/>
			</view>
			
			<!-- <view v-show="currentTab==='weight'">
			  <view class="charts-box">
				<qiun-data-charts 
					type="line"
					:opts="{
						extra:{line:{type:'curve'}},
						enableScroll:true,
						xAxis:{scrollShow:true,itemCount:4,disableGrid:true}
					}" 
					:chartData="chartsDataLine1" 
					:ontouch="true"
					:canvas2d="true"
					:reshow="currentTab==='weight'"
				/>
			  </view>
			</view>
			
			<view v-show="currentTab==='chest'">
			   <view class="charts-box">
				  <qiun-data-charts 
					  type="line"
					  :opts="{
						  extra:{line:{type:'curve'}},
						  enableScroll:true,
						  xAxis:{scrollShow:true,itemCount:4,disableGrid:true}
					  }" 
					  :chartData="chartsDataLine1" 
					  :ontouch="true"
					  :canvas2d="true"
					  :reshow="currentTab==='chest'"
				  />
				</view>
			</view> 
			
			<view v-show="currentTab==='armCircumference'">
			   <view class="charts-box">
				  <qiun-data-charts 
					  type="line"
					  :opts="{
						  extra:{line:{type:'curve'}},
						  enableScroll:true,
						  xAxis:{scrollShow:true,itemCount:4,disableGrid:true}
					  }" 
					  :chartData="chartsDataLine1" 
					  :ontouch="true"
					  :canvas2d="true"
					  :reshow="currentTab==='armCircumference'"
				  />
				</view>
			</view> -->
		</view>
		
		<!-- <view>
			<button type="default" @click="isOpenDatabase">判断数据库是否打开</button>
			<button type="default" @click="closeDatabase">关闭数据库</button>
			<button type="default" @click="openDatabase">打开数据库</button>
			<button type="default" @click="dropTable">删除表</button>
			<button type="default" @click="createChatTable">创建表</button>
			<button type="default" @click="transaction">执行事务</button>
			<button type="default" @click="insertChatRow">新增数据</button>
			<button type="default" @click="insertListChatRow">批量新增数据</button>
			<button type="default" @click="selectSql">查询数据</button>
			<button type="default" @click="deleteChatRow">删除所有数据</button>
		</view> -->
		
		<view class="uni-form-item uni-column">
			<view class="input-box">
				<view class="input-item">
					<view class="input-body">
						<input class="input" maxlength="5" v-model="chatText.value" placeholder="请输入身体数据或者健康指标" />
					</view>
				</view>
			</view>
			<button class="button" @click="insertChatRow">添加一条数据</button>
			<!-- <button type="default" @click="deleteChatRow">清空</button> -->
			<button class="button del-button" @click="deleteLastData">删除最近一次数据</button>
			<button class="button add-button" @click="addTab">添加一条健康指标</button>
		</view>
		
		<!-- <view>
			<text>
				{{allData}}
			</text>
		</view> -->
		
	</view>
</template>

<script>	
	export default {
		data() {
			return {
				dbName: 'person_data',
				dbPath: '_doc/person_data.db',
				dbTable: 'person_data',
				currentTab: '',
				allData:'',
				maxId:0,
				chartsDataLine1: {},
				chatText: {
					value: '',
				},
				cateCurrentIndex:0,
				cateId:'1',
				categories:[
					// {
					// 	id:1,
					// 	name:'体重',
					// 	value:"weight"
					// },
					// {
					// 	id:2,
					// 	name:'胸围',
					// 	value:"chest"
					// },
					// {
					// 	id:3,
					// 	name:'臂围',
					// 	value:"armCircumference"
					// }
				],
				// dbIsOpen: false,
				// chatText1: [
				// 	{
				// 		weight: 1,
				// 	},
				// 	{
				// 		weight: 2,
				// 	}
				// ],
			}
		},
		onReady() {
			this.openDatabase();
		},
		onBackPress() {
			this.closeDatabase();
		},
		methods: {
			closeDatabase() {
				plus.sqlite.closeDatabase({
					name: this.dbName,
					success: function(e) {
						console.log(JSON.stringify(e),'closeDatabase '+ this.dbName +' success!');
					},
					fail: function(e) {
						console.log('closeDatabase failed: ' + JSON.stringify(e));
					}
				});
			},
			openDatabase() {
				plus.sqlite.openDatabase({
					name: this.dbName,
					path: this.dbPath,
					success: (e)=> {
						console.log('打开数据库成功')
						this.createChatTable();
					},
					fail: function(e) {
						// console.log(e,'打开数据库失败')
					}
				});
			},
			createChatTable() {
				let sql = 'CREATE TABLE if not exists ' + this.dbTable +
					' ( id int(32) PRIMARY KEY,classify varchar(32),value float(32),createTime varchar(32));'
				
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: (data)=> {
						let sql = "SELECT DISTINCT classify FROM " + this.dbTable
						
						plus.sqlite.selectSql({
							name: this.dbName,
							sql: sql,
							success: (data)=> {
								if(data.length>0){
									this.currentTab=data[0].classify
								}else{
									this.currentTab=''
								}
								this.initCharts();
							},
							fail: (e)=> {
								console.log(e);
							}
						});
					},
					fail: (e)=> {
						console.log(e);
					}
				});
			},
			initCharts(){
				this.selectSql();
			},
			selectSql() {
				let sql = "select * from " + this.dbTable + " where classify = '" + this.currentTab + "' and value IS NOT NULL";
				
				let _this = this;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: function(data) {
						_this.allData = data;
						console.log("查询数据成功！");
						_this.getServerData();
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
				
				let sql1 = "SELECT DISTINCT classify FROM " + this.dbTable
				
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql1,
					success: (data)=> {
						this.categories=data.map(item=>item.classify)
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
				
				let sql2 = "select max(id) from " + this.dbTable;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql2,
					success: function(data) {
						_this.maxId = data[0]["max(id)"];
						console.log("获取最大id为： " + data[0]["max(id)"]);
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
			},
			getServerData() {
				let _this = this;

				if(_this.allData.length != 0){
					var seriesJsonArray = [];
					var seriesJsonObject = {};
					var params1 = [];
					for(var i = 0; i < _this.allData.length; i++){
						params1.push(_this.allData[i].value);
					}
					seriesJsonObject['name'] = _this.currentTab;
					seriesJsonObject['data'] = params1;
					seriesJsonArray.push(seriesJsonObject);
			
					var resultJsonObject = {};
					var params2 = [];
					for(var i = 0; i < _this.allData.length; i++){
						params2.push(_this.allData[i].createTime);
					}
					resultJsonObject['categories'] = params2;
					resultJsonObject['series'] = seriesJsonArray;

					this.chartsDataLine1 = resultJsonObject;
					console.log(JSON.stringify(this.chartsDataLine1))
				}else{
					this.chartsDataLine1= {
						categories:["0"],
						series:[{
							name:this.currentTab,
							data:[0]
						}]
					};
				}
			},
			insertChatRow() {
				if(!this.maxId){
					uni.showToast({
						icon:'none',
					    title: '请先添加健康指标'
					});
					return
				}
				let newId =  this.maxId + 1;
				console.log("当前最大ID为： " + this.maxId);
				console.log("即将插入的ID为： " + newId);
				
				// let num = Math.floor(Math.random()*(1 - 100) + 100);
				let num = this.chatText.value;
				if(num&&Number.isFinite(+num)){
					let sql = "insert into " + this.dbTable +  "(id, classify, value, createTime) values(" + newId + ",'" + this.currentTab + "'," + num + ",'" + (new Date().getYear() + 1900) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "')";
					
					plus.sqlite.selectSql({
						name: this.dbName,
						sql: sql,
						success: (data) =>{
							console.log("插入数据成功！");
							this.initCharts();
							this.chatText.value=''
						},
						fail: function(e) {
							console.log('selectSql failed: ' + JSON.stringify(e));
						}
					});
				}else{
					uni.showToast({
						icon:'none',
					    title: '请输入数字'
					});
				}
			},
			deleteLastData(){
				if(this.allData.length>=1){
					let sql = "delete from " + this.dbTable +" where id = " + this.allData[this.allData.length - 1].id;
					
					let _this = this;
					plus.sqlite.selectSql({
						name: this.dbName,
						sql: sql,
						success: function(data) {
							console.log("成功删除当前分类下的最新数据！");
						},
						fail: function(e) {
							console.log('selectSql failed: ' + JSON.stringify(e));
						}
					});
					
					this.initCharts();
				}else{
					uni.showToast({
						icon:'none',
					    title: '已经没有数据了'
					});
				}
			},
			addTab(){
				const newId =  this.maxId + 1;
				
				let text = this.chatText.value;
				if(!text){
					uni.showToast({
						icon:'none',
					    title: '请输入指标'
					});
					return
				}
				if(!/^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/.test(text)){
					uni.showToast({
						icon:'none',
					    title: '请输入中文'
					});
					return
				}
				if(this.categories.find(item=>item===text)){
					uni.showToast({
						icon:'none',
					    title: '该指标已存在'
					});
					return
				}
				let insertSql = "insert into " + this.dbTable +  "(id,classify) values("+newId+",'"+text+"')";
				
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: insertSql,
					success: (data)=> {
						this.tabChange(text,this.categories.length)
					}
				});
			},
			tabChange(cate,index){
				this.chatText.value = ''
				this.currentTab=cate
				this.cateCurrentIndex = index
				this.initCharts();
			},
			longPressTab(cate){
				uni.showModal({
				    title: '确定删除【'+cate+'】健康指标?',
				    success:  (res)=> {
				        if (res.confirm) {
							this.deleteTab(cate)
				        }
				    }
				});
			},
			deleteTab(cate){
				let sql = "delete from " + this.dbTable +" where classify = '" + cate+"'";
				console.log(cate)
				
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: (data)=> {
						this.chatText.value = ''
						this.cateCurrentIndex = 0
						this.createChatTable()
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
			},
			// isOpenDatabase() {
			// 	let res = plus.sqlite.isOpenDatabase({
			// 		name: this.dbName,
			// 		path: this.dbPath
			// 	});
			// 	if (res) {
			// 		console.log(res,'数据库已打开')
			// 	} else {
			// 		console.log(res,'数据库未打开')
			// 	}
			// },
			// insertListChatRow() {
			// 	// 老方法尚未用到,尚未修改
			// 	let data = this.chatText1
			// 	let sql = '';
			// 	for(let i = 0; i < data.length; i++) {
			// 		sql = "insert into " + this.dbTable +  "(id, weight, createTime) values(" + this.maxId + "," + data[i].weight + ",'" + (new Date().getYear() + 1900) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "')";
			// 		this.executeSql(sql)
			// 	}
			// },
			// deleteChatRow() {
			// 	let sql = "delete from " + this.dbTable + " where classify = '" + this.currentTab + "'";;
				
			// 	let _this = this;
			// 	plus.sqlite.selectSql({
			// 		name: this.dbName,
			// 		sql: sql,
			// 		success: function(data) {
			// 			console.log("成功清空当前分类下的数据！");
			// 		},
			// 		fail: function(e) {
			// 			console.log('selectSql failed: ' + JSON.stringify(e));
			// 		}
			// 	});
				
			// 	this.initCharts();
			// },
			// dropTable() {
			// 	let sql = 'DROP TABLE ' + this.dbTable + ';'
			// 	plus.sqlite.executeSql({
			// 		name: this.dbName,
			// 		sql: sql,
			// 		success: function(e) {
			// 			console.log("删除数据表成功");
			// 		},
			// 		fail: function(e) {
			// 			console.log('executeSql failed: ' + JSON.stringify(e));
			// 		}
			// 	})
			// },
			// transaction(){
			// 	plus.sqlite.transaction({
			// 		name: this.dbName,
			// 		operation: 'begin',
			// 		success: function(e){
			// 			console.log('transaction success!');
			// 		},
			// 		fail: function(e){
			// 			console.log('transaction failed: '+JSON.stringify(e));
			// 		}
			// 	});
			// },
		},
	}
</script>



<style>
	.uni-input{
		border:1px solid #ffffff;
		background-color:transparent;
	}

	.del-button{
		background: #F56C6C;
		margin-top: 50rpx;
		margin-bottom: 50rpx;
	}

	.add-button{
		background: #67C23A;
	}

	.charts-box{
	  width: 100%;
	  height:550rpx;
	}

	.myScroll{
		height: 80upx;
		background-color: #f9f9f9;
		white-space: nowrap;
	}

	.cateSelected{
		color: rgb(51,51,51);
		display: inline-block;
		margin: 18upx 8upx 0 8upx;
		min-width: 100upx;
		text-align: center;
		font-size: 30upx;
		font-weight: bold;
	}

	.cateUnSle{
		color: rgb(51,51,51);
		display: inline-block;
		margin: 18upx 8upx 0 8upx;
		min-width: 100upx;
		text-align: center;
		font-size: 30upx;
		font-weight: 550upx;
	}

	.lineSelected{
		width: 60upx;
		height: 6upx;
		background-color: #FFD944;
		border-radius: 3upx;
		margin: 10upx auto;
	}

	.tabCon{
		position: absolute;
		top: 115upx;
		background-color: white;
		width: 750upx;
		height: 100%;
	}
</style>