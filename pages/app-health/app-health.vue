<template>
	<view class="app-health">
		
		<view class="charts-box">

			<qiun-data-charts type="line"
			:opts="{extra:{line:{type:'curve'}},
					enableScroll:true,
					xAxis:{scrollShow:true,itemCount:4,disableGrid:true}}" 
			:chartData="chartsDataLine1" 
			:ontouch="true"
			:canvas2d="true"/>
			
		</view>
		
		<view>
			<!-- <button type="default" @click="isOpenDatabase">判断数据库是否打开</button> -->
			<!-- <button type="default" @click="closeDatabase">关闭数据库</button> -->
			<!-- <button type="default" @click="openDatabase">打开数据库</button> -->
			<!-- <button type="default" @click="dropTable">删除表</button> -->
			<!-- <button type="default" @click="createChatTable">创建表</button> -->
			<!-- <button type="default" @click="transaction">执行事务</button> -->
			<!-- <button type="default" @click="insertChatRow">新增数据</button> -->
			<!-- <button type="default" @click="insertListChatRow">批量新增数据</button> -->
			<!-- <button type="default" @click="selectSql">查询数据</button> -->
			<!-- <button type="default" @click="deleteChatRow">删除所有数据</button> -->
		</view>
		
		<br/><br/><br/>
		
		 <view class="uni-form-item uni-column">
			<input class="uni-input" maxlength="3" @input="onKeyInput" placeholder="请输入您当前的体重" />
			<button type="default" @click="insertChatRow">添加</button>
			<button type="default" @click="deleteChatRow">清空</button>
			<button type="default" @click="deleteLastData">删除最近一次数据</button>
			<button type="default" @click="dropTable">删除表</button>
		</view>
		
		<view>
			<text>
				{{allData}}
			</text>
		</view>
		
	</view>
</template>

<script>	
	export default {
		data() {
			return {
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
				exeSql:'',
				exeData:'',
				maxId:0,
				allData:'',
			}
		},
		methods: {
			createChatTable() {
				let sql = 'CREATE TABLE if not exists ' + this.dbTable +
					' ( "id" int(32) NOT NULL,"weight" float(32),"createTime" varchar(32), PRIMARY KEY ("id"));'
				
				let _this = this;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: function(data) {
						_this.exeSql = sql;
						_this.exeData = data;
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
				let sql = "insert into " + this.dbTable +  "(id, weight, createTime) values(" + newId + "," + num + ",'" + (new Date().getYear() + 1900) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "')";
				
				let _this = this;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: function(data) {
						_this.exeSql = sql;
						_this.exeData = data;
						console.log("插入数据成功！");
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
				
				this.selectSql();
				setTimeout(() => {
					this.getServerData();
				}, 1000);
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
				let sql = "delete from " + this.dbTable;
				
				let _this = this;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: function(data) {
						_this.exeSql = sql;
						_this.exeData = data;
						console.log("删除表成功！");
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
				
				this.selectSql();
				setTimeout(() => {
					this.getServerData();
				}, 1000);
			},
			selectSql() {
				let curPage = 1
				let pageSize = 100
				let sql = 'select * from ' + this.dbTable + ' where 1=1' +
					' limit ' + pageSize + ' offset ' + (curPage - 1) * pageSize;
				
				let _this = this;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: function(data) {
						_this.exeSql = sql;
						_this.allData = data;
						console.log("查询数据成功！");
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
				
				setTimeout(() => {
					this.getServerData();
				}, 1000);
				
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
					seriesJsonObject['name'] = '体重';
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
					this.chartsDataLine1= {"categories":["0"],"series":[{"name":"体重","data":[0]}]};
				}
				// console.log(this.chartsDataLine1);
			},  
			onKeyInput(event) {
				this.chatText.weight = event.target.value;
			},
			deleteLastData(){
				let sql = "delete from " + this.dbTable +" where id = " + this.maxId;
				
				let _this = this;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: function(data) {
						_this.exeSql = sql;
						_this.exeData = data;
						console.log("成功删除最新数据！");
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
				
				this.selectSql();
				setTimeout(() => {
					this.getServerData();
				}, 1000);
			}
		},
		onReady() {
			this.openDatabase();
			this.selectSql();
			setTimeout(() => {
				this.getServerData();
			}, 1000);
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
</style>
