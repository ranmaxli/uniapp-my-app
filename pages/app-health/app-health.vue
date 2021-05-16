<template>
	<view class="app-health">
		
		<view class="charts-box">
		   <!-- 此处改变的是 seriesTemplate 模板中的默认配置，不必每个series都传smooth:true，将会覆盖:chartData.series 实现更低的代码量 -->
		   <qiun-data-charts type="line" :opts="{extra:{line:{type:'curve'}}}" :chartData="chartsDataLine1" :echartsH5="true" :echartsApp="true"/>
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
			<!-- <button type="default" @click="deleteLastData">删除最近一次数据</button> -->
			<button type="default" @click="dropTable">删除表</button>
			<!-- <button type="default" @click="selectSql">查询数据</button> -->
		</view>
		
		<view>
			<text>
				{{exeData}}
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
			}
		},
		methods: {
			createChatTable() {
				let sql = 'CREATE TABLE if not exists ' + this.dbTable +
					'(`weight` float (32), `createTime` varchar(32));'
				this.executeSql(sql);
				
				// let sql = 'CREATE TABLE if not exists ' + this.dbTable +
				// 	' ( "id" int(32) NOT NULL,"weight" float(32),"createTime" varchar(32), PRIMARY KEY ("id"));'
				// this.executeSql(sql)
			},
			openDatabase() {
				plus.sqlite.openDatabase({
					name: this.dbName,
					path: this.dbPath,
					success: function(e) {
						console.log('打开数据库成功')
					},
					fail: function(e) {
						console.log(e,'打开数据库失败')
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
				let data = this.chatText
				let sql = "insert into " + this.dbTable +  "(weight, createTime) values(" + data.weight + ",'" + (new Date().getYear() + 1900) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "')";
				this.executeSql(sql)
			},
			insertListChatRow() {
				// let _this = this;
				// setTimeout(() => {
				// 	_this.getMaxId();
				// 	_this.maxId++
				// }, 1000);
				// console.log(this.maxId);
				let data = this.chatText1
				let sql = '';
				for(let i = 0; i < data.length; i++) {
					sql = "insert into " + this.dbTable +  "(id, weight, createTime) values(" + this.maxId + "," + data[i].weight + ",'" + (new Date().getYear() + 1900) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "')";
					this.executeSql(sql)
				}
			},
			deleteChatRow() {
				let sql = "delete from " + this.dbTable;
				this.executeSql(sql)
			},
			selectSql() {
				let curPage = 1
				let pageSize = 100
				let sql = 'select * from ' + this.dbTable + ' where 1=1' +
					' limit ' + pageSize + ' offset ' + (curPage - 1) * pageSize;
				this.executeSql(sql)
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
			executeSql(sql) {
				let _this = this;
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success: function(data) {
						_this.exeSql = sql;
						_this.exeData = data;
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
				if(sql.indexOf("insert") == 0 || sql.indexOf("delete") == 0 || sql.indexOf("update") == 0){
					this.selectSql();
					setTimeout(() => {
						this.getServerData();
					}, 1000);
				}
				console.log(sql);
				if(sql.indexOf("max(id)") == 0){
					_this.maxId = _this.exeData;
					console.log("当前最大id为： " + getMaxId);
				}
			},
			getServerData() {
				let _this = this;

				if(_this.exeData.length != 0){
					var seriesJsonArray = [];
					var seriesJsonObject = {};
					var params1 = [];
					for(var i = 0; i < _this.exeData.length; i++){
						params1.push(_this.exeData[i].weight);
					}
					seriesJsonObject['name'] = '体重';
					seriesJsonObject['data'] = params1;
					seriesJsonArray.push(seriesJsonObject);
			
					var resultJsonObject = {};
					var params2 = [];
					for(var i = 0; i < _this.exeData.length; i++){
						params2.push(_this.exeData[i].createTime);
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
			// getMaxId(){
			// 	let sql = "select max(id) from " + this.dbTable;
			// 	this.executeSql(sql)
			// },
			// deleteLastData(){
			// 	let sql = "delete from " + this.dbTable + " where 1 order by id desc limit 1";
			// 	console.log(sql);
			// 	this.executeSql(sql)
			// }
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
