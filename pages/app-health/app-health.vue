<template>
	<view class="app-health">
		
		<view>
			<scroll-view scroll-x="true" class="myScroll">
				<view v-for="(cate,index) in categories" :key="index" :data-cateId="cate.id" :data-index="index"
					:class="[cateCurrentIndex == index ? 'cateSelected' : 'cateUnSle']" @tap="tabChange">
					{{cate.name}}
					<view :class="[cateCurrentIndex == index ? 'lineSelected' : '']"></view>
				</view>
			</scroll-view>
		</view>

		<view>
						 
			<view v-show="currentTab==='weight'">
			  <view class="charts-box">
				<qiun-data-charts type="line"
				:opts="{extra:{line:{type:'curve'}},
					enableScroll:true,
					xAxis:{scrollShow:true,itemCount:4,disableGrid:true}}" 
				:chartData="chartsDataLine1" 
				:ontouch="true"
				:canvas2d="true"
				:reshow="currentTab==='weight'"/>
			  </view>
			</view>
			
			<view v-show="currentTab==='chest'">
			   <view class="charts-box">
				  <qiun-data-charts type="line"
				  :opts="{extra:{line:{type:'curve'}},
						enableScroll:true,
						xAxis:{scrollShow:true,itemCount:4,disableGrid:true}}" 
				  :chartData="chartsDataLine1" 
				  :ontouch="true"
				  :canvas2d="true"
				  :reshow="currentTab==='chest'"/>
				</view>
			</view> 
			
			<view v-show="currentTab==='armCircumference'">
			   <view class="charts-box">
				  <qiun-data-charts type="line"
				  :opts="{extra:{line:{type:'curve'}},
						enableScroll:true,
						xAxis:{scrollShow:true,itemCount:4,disableGrid:true}}" 
				  :chartData="chartsDataLine1" 
				  :ontouch="true"
				  :canvas2d="true"
				  :reshow="currentTab==='armCircumference'"/>
				</view>
			</view> 
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
		

		<br/><br/><br/>
		
		<view class="uni-form-item uni-column">
			<input class="uni-input" maxlength="3" @input="onKeyInput" placeholder="请输入您当前身体数据" />
			<button type="default" @click="insertChatRow">添加</button>
			<button type="default" @click="deleteChatRow">清空</button>
			<button type="default" @click="deleteLastData">删除最近一次数据</button>
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
				cateCurrentIndex:0,
				cateId:'1',
				currentTab: 'weight',
				currentTabName: '体重',
				categories:[
					{
						id:1,
						name:'体重',
						value:"weight"
					},
					{
						id:2,
						name:'胸围',
						value:"chest"
					},
					{
						id:3,
						name:'臂围',
						value:"armCircumference"
					}
				],
				dbName: 'person_data',
				dbPath: '_doc/person_data.db',
				dbTable: 'person_data',
				dbIsOpen: false,
				chatText: {
					weight: 0,
				},
				chatText1: [
					{
						weight: 1,
					},
					{
						weight: 2,
					}
				],
				chartsDataLine1: {},
				maxId:0,
				allData:'',
			}
		},
		methods: {
			createChatTable() {
				let sql = 'CREATE TABLE if not exists ' + this.dbTable +
					' ( "id" int(32) NOT NULL,"weight" float(32),"classify" varchar(32),"createTime" varchar(32), PRIMARY KEY ("id"));'
				
				let _this = this;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: function(data) {
						console.log("数据库创建成功！");
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
			},
			openDatabase() {
				plus.sqlite.openDatabase({
					name: this.dbName,
					path: this.dbPath,
					success: function(e) {
						console.log('打开数据库成功')
					},
					fail: function(e) {
						// console.log(e,'打开数据库失败')
					}
				});
			},
			isOpenDatabase() {
				let res = plus.sqlite.isOpenDatabase({
					name: this.dbName,
					path: this.dbPath
				});
				if (res) {
					console.log(res,'数据库已打开')
				} else {
					console.log(res,'数据库未打开')
				}
			},
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
			insertChatRow() {
				let newId =  this.maxId + 1;
				console.log("当前最大ID为： " + this.maxId);
				console.log("即将插入的ID为： " + newId);
				
				let num = Math.floor(Math.random()*(1 - 100) + 100);
				let data = this.chatText
				let sql = "insert into " + this.dbTable +  "(id, weight, classify, createTime) values(" + newId + "," + num + ",'" + this.currentTab + "','" + (new Date().getYear() + 1900) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "')";
				
				let _this = this;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: function(data) {
						console.log("插入数据成功！");
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
				
				this.initCharts();
			},
			insertListChatRow() {
				// 老方法尚未用到,尚未修改
				let data = this.chatText1
				let sql = '';
				for(let i = 0; i < data.length; i++) {
					sql = "insert into " + this.dbTable +  "(id, weight, createTime) values(" + this.maxId + "," + data[i].weight + ",'" + (new Date().getYear() + 1900) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "')";
					this.executeSql(sql)
				}
			},
			deleteChatRow() {
				let sql = "delete from " + this.dbTable + " where classify = '" + this.currentTab + "'";;
				
				let _this = this;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: function(data) {
						console.log("成功清空当前分类下的数据！");
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
				
				this.initCharts();
			},
			selectSql() {
				let sql = "select * from " + this.dbTable + " where classify = '" + this.currentTab + "'";
				
				let _this = this;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: function(data) {
						_this.allData = data;
						console.log("查询数据成功！");
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
				
				let sql1 = "select max(id) from " + this.dbTable;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql1,
					success: function(data) {
						_this.maxId = data[0]["max(id)"];
						console.log("获取最大id为： " + data[0]["max(id)"]);
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
			},
			dropTable() {
				let sql = 'DROP TABLE ' + this.dbTable + ';'
				plus.sqlite.executeSql({
					name: this.dbName,
					sql: sql,
					success: function(e) {
						console.log("删除数据表成功");
					},
					fail: function(e) {
						console.log('executeSql failed: ' + JSON.stringify(e));
					}
				})
			},
			transaction(){
				plus.sqlite.transaction({
					name: this.dbName,
					operation: 'begin',
					success: function(e){
						console.log('transaction success!');
					},
					fail: function(e){
						console.log('transaction failed: '+JSON.stringify(e));
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
						params1.push(_this.allData[i].weight);
					}
					seriesJsonObject['name'] = _this.currentTabName;
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
				}else{
					this.createChatTable();
					this.chartsDataLine1= {"categories":["0"],"series":[{"name":"0","data":[0]}]};
				}
			},  
			onKeyInput(event) {
				this.chatText.weight = event.target.value;
			},
			deleteLastData(){
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
			},
			tabChange(e){
				this.chartsDataLine1.series=[]
				let index = e.currentTarget.dataset.index
				this.cateCurrentIndex = index
				this.cateId = e.currentTarget.dataset.cateId
				this.getTabContent();
				this.initCharts();
			},
			getTabContent(){
				let myList = this.categories
				for(let i = 0 ; i< myList.length; i++){
					if(this.cateId == myList[i].id){
						this.currentTab = myList[i].value
						this.currentTabName = myList[i].name
					}
				}
			},
			initCharts(){
				this.selectSql();
				setTimeout(() => {
					this.getServerData();
				}, 1000);
			}
		},
		onReady() {
			this.openDatabase();
			this.initCharts();
		},
		onBackPress() {
			this.closeDatabase();
		},
	}
</script>



<style>
.charts-box{
  width: 100%;
  height:300px;
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
