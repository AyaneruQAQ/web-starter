<template>
    <div>
		<el-select 
			v-model="curRule" 
			value-key="ruleName" 
			placeholder="请选择规则查看修改"
			@change="handleRuleChange"
		>
			<el-option
				v-for="(rule,index) in allRules"
				:key="index"
				:label="rule.ruleName"
				:value="rule"
			>
			</el-option>
		</el-select>
		<div>
			<h2>请选择触发事件</h2>
			<el-form :inline="true" :model="factorsForm">
				<el-form-item class="formItem">
					<el-radio-group v-model="conditionMode">
						<el-radio label="all">全部满足</el-radio>
						<el-radio label="one">满足其一</el-radio>
					</el-radio-group>
				</el-form-item>
				<draggable 
					chosen-class="chosen" 
					group="factor" 
					@change="log"
					:list="factorsForm.factors">
				<el-form-item
					v-for="(factor,index) in factorsForm.factors"
					:key="index"
					class="formItem"
				>
					<el-form-item>
						<el-select v-model="factor.key" value-key="param.key" placeholder="事件列表">
							<el-option
								v-for="item in factors"
								:key="item.param.key"
								:label="item.factorName"
								:value="item"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-select v-model="factor.relationalOperator" placeholder="关系式">
							<el-option
								v-for="item in expressions"
								:key="item.expressionKey"
								:label="item.expressionName"
								:value="item.expressionKey"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<dynamic-item 
							v-if="factor.key.showInputParam" 
							@changeInput="handleInputChange($event,index)" 
							:value="factor.expectedValue" 
							:param="factor.key.param" 
						/>
					</el-form-item>
					<el-form-item>
						<el-button 
							type="primary" icon="el-icon-plus" circle 
							@click="addFactor" 
							v-show="index===factorsForm.factors.length-1">
						</el-button>
						<el-button 
							type="danger" icon="el-icon-delete" circle  
							@click="deleteFactor(index)" 
							v-show="index!==0">
						</el-button>
					</el-form-item>
				</el-form-item>
				</draggable>
			</el-form>
		</div>
		<div>
			<h2>请选择执行动作</h2>
			<el-form :inline="true" :model="actionsForm">
				<el-form-item
					v-for="(action,index) in actionsForm.actions"
					:key="index"
					class="formItem"
				>
					<el-form-item>
						<el-select v-model="action.method" value-key="actionMethod" placeholder="行为列表">
							<el-option
								v-for="item in actions"
								:key="item.actionMethod"
								:label="item.actionName"
								:value="item"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<dynamic-item 
							v-if="action.method.hasInputParams" 
							@changeInput="handleActionInputChange($event,index)" 
							:value="action.params[0].value" 
							:param="action.method.params[0]" 
						/>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-plus" circle 
							@click="addAction" 
							v-show="index===actionsForm.actions.length-1">
						</el-button>
						<el-button 
							type="danger" icon="el-icon-delete" circle  
							@click="deleteAction(index)" v-show="index!==0">
							</el-button>
					</el-form-item>
				</el-form-item>
			</el-form>
		</div>
		<div>
			<el-input class="nameInput" v-model="ruleName">
				<template slot="prepend">规则名称</template>
			</el-input>
		</div>
		<el-button type="primary" @click="handleSubmit">提交</el-button>
	</div>
</template>

<script>
import DynamicItem from './DynamicItem'
import _ from 'lodash'
import {sendRules,getRules,updateRules} from '../_api/index'
import draggable from 'vuedraggable'

export default {
  data () {
    return {
			"factors": [{
				"factorName": "定时",
				"showInputParam": true,
				"param": {
					"title": "请选择一个时间",
					"key": "timing",
					"name": "时间",
					"dataType": "datetime",
					"formType": "date",
					"defaultValue": "2021-02-01 18:00:00",
					"valueRange": ""
				}
			}, {
				"factorName": "看不到标签",
				"showInputParam": true,
				"param": {
					"title": "",
					"key": "cantSeeTag",
					"name": "看不到标签",
					"dataType": "boolean",
					"formType": "radio",
					"defaultValue": true,
					"valueRange": [true, false]
				}
			}, {
				"factorName": "节假日",
				"showInputParam": true,
				"param": {
					"title": "请选择节假日",
					"key": "festival",
					"name": "节假日",
					"dataType": "string",
					"formType": "select",
					"defaultValue": "春节",
					"valueRange": ["春节", "元旦"]
				}
			}],
			"actions": [{
				"actionName": "充电",
				"actionMethod": "goCharging",
				"hasInputParams": false
			}, {
				"actionName": "打招呼",
				"actionMethod": "greet",
				"hasInputParams": true,
				"params": [{
					"title": "请输入招呼语",
					"key": "greetWords",
					"dataType": "string",
					"formType": "input",
					"defaultValue": "您好",
					"valueRange": ""
				}]
			}, {
				"actionName": "播放生日歌",
				"actionMethod": "playBirthdayMusic",
				"hasInputParams": true,
				"params": [{
					"title": "请选择音乐文件",
					"key": "url",
					"dataType": "string",
					"formType": "file",
					"defaultValue": "",
					"valueRange": ""
				}]
			}, {
				"actionName": "说话",
				"actionMethod": "说话",
				"hasInputParams": true,
				"params": [{
					"title": "请输入说话内容",
					"key": "speakWord",
					"dataType": "string",
					"formType": "input",
					"defaultValue": "",
					"valueRange": ""
				}]
			}],
			"expressions": [{
				"expressionDesc": "大于",
				"expressionName": "大于",
				"expressionKey": ">"
			}, {
				"expressionDesc": "小于",
				"expressionName": "小于",
				"expressionKey": "<"
			}, {
				"expressionDesc": "等于",
				"expressionName": "等于",
				"expressionKey": "=="
			}, {
				"expressionDesc": "不等于",
				"expressionName": "不等于",
				"expressionKey": "!="
			}, {
				"expressionDesc": "大于等于",
				"expressionName": "大于等于",
				"expressionKey": ">="
			}, {
				"expressionDesc": "小于等于",
				"expressionName": "小于等于",
				"expressionKey": "<="
			}],
			factorsForm:{
				factors:[
					{
						key:'',
						relationalOperator:'==',
						expectedValue:'',
					}
				]
			},
			actionsForm:{
				actions:[
					{
						method:'',
						params:[{
							key:'',
							dataType:'',
							formType:'',
							value:''
						}]
					}
				]
			},

			conditionMode:'all',
			ruleName:'',

			curRule:'',
			allRules:[{
				conditionMode: "all",
				enable: true,
				executeMode: 2,
				robotSn: "",
				ruleContent: {
					actions: [{method: "说话", params: [{key: "speakWord", dataType: "string", formType: "input", value: "打打"}]}],
					factors: [
						{key: "cantSeeTag", relationalOperator: "==", expectedValue: true},
						{key: "festival", relationalOperator: "==", expectedValue: '春节'},
					],
				},
				ruleName: "111"
			}]
    }
	},
	mounted(){
		getRules().then(res=>{
			this.allRules = res.data
		})

		const a = this.allRules[0]?.ruleContent?.action
		console.log(a)
	},
	methods:{
		log(evt){
			console.log(evt,this.factorsForm.factors)
		},
		addFactor(){
			this.factorsForm.factors.push({
				key:'',
				relationalOperator:'==',
				expectedValue:''
			})
		},
		addAction(){
			this.actionsForm.actions.push({
				method:'',
				params:[{
					key:'',
					dataType:'',
					formType:'',
					value:''
				}]
			})
		},
		deleteFactor(index){
			this.factorsForm.factors.splice(index,1)
		},
		deleteAction(index){
			this.actionsForm.actions.splice(index,1)
		},
		handleInputChange(val,index){
			this.factorsForm.factors[index].expectedValue = val
		},
		handleActionInputChange(val,index){
			this.actionsForm.actions[index].params[0].value = val
		},
		handleSubmit(){
			console.log(this.factorsForm,this.actionsForm)
			const factors = _.cloneDeep(this.factorsForm.factors)
			const actions = _.cloneDeep(this.actionsForm.actions)
			if(factors.length===1&&factors[0].key === '' || actions.length===1&&actions[0].method===''){
				this.$message.error('请至少设置一项事件和动作后再提交')
				return
			}
			if(this.ruleName === ''){
				this.$message.error('规则名称不能为空')
				return
			}
			for(let i=0;i<factors.length;i++){
				factors[i].key = factors[i].key.param.key
			}

			for(let j=0;j<actions.length;j++){
				if(actions[j].method.hasInputParams){
					const {dataType,formType,key} = actions[j].method.params[0]
					actions[j].params[0] = Object.assign(actions[j].params[0],{dataType,formType,key})
				}else{
					actions[j].params = []
				}
				actions[j].method = actions[j].method.actionMethod
			}
			
			const data = {
				ruleName:this.ruleName,
				robotSn:'',
				executeMode:2,
				conditionMode:this.conditionMode,
				enable:true,
				ruleContent:{
					factors,
					actions
				}
				
			}
			sendRules(data).then(res=>{
				console.log(res)
				if(res.code === 200){
					this.$message.success('添加成功')
				}
			})
		},

		handleRuleChange(rule){
			this.curRule = rule
			console.log(rule)
			this.factorsForm.factors = rule.ruleContent.factors
			this.actionsForm.actions = rule.ruleContent.actions

			//处理事件、动作数据格式
			for(let i=0;i<this.factorsForm.factors.length;i++){
				const idx = this.factors.findIndex((val)=>{
					return val.param.key === this.factorsForm.factors[i].key
				})
				this.factorsForm.factors[i].key = this.factors[idx]
			}

			for(let i=0;i<this.actionsForm.actions.length;i++){
				const idx = this.actions.findIndex(val=>{
					return val.actionMethod === this.actionsForm.actions[i].method
				})
				this.actionsForm.actions[i].method = this.actions[idx]
			}
			this.conditionMode = rule.conditionMode
			this.ruleName = rule.ruleName
		}
		// getRules(){
		// 	getRules().then(res=>{
		// 		console.log(res)
		// 	})
		// }
	},
	components:{
		DynamicItem,
		draggable
	}
}
</script>
<style lang="scss" scoped>
	.formItem{
		width: 100%;
	}
	.nameInput{
		width: 30%;
	}
	.chosen{
        cursor: move;
    }
</style>