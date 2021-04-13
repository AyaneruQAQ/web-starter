<template>
    <div>
      	<template v-if="param.formType==='input'">
			<el-input
				v-model="inputValue"
			/>
		</template>
		<template v-else-if="param.formType==='file'">
			<el-input
				v-model="inputValue"
				type="file"
			/>
		</template>
		<template v-else-if="param.formType==='date'">
			<el-date-picker
				v-model="inputValue"
				value-format="yyyy-MM-dd HH-mm-ss"
				type="datetime"
				placeholder="请选择日期时间"
			>
			</el-date-picker>
		</template>
		<template v-else-if="param.formType==='radio'">
			<el-radio-group v-model="inputValue">
				<el-radio :label="true">是</el-radio>
				<el-radio :label="false">否</el-radio>
			</el-radio-group>
		</template>
		<template v-else-if="param.formType==='select'">
<!-- 			<el-checkbox-group>
				<el-checkbox
					v-for="item in param.valueRange"
					:key="item"
					:label="item"
				>{{item}}</el-checkbox>
			</el-checkbox-group> -->
			<el-select v-model="inputValue" >
				<el-option
					v-for="item in param.valueRange"
					:key="item"
					:label="item"
					:value="item"
				></el-option>
			</el-select>
		</template>
    </div>
</template>

<script>
export default {
	data(){
		return{
			inputValue:this.value
		}
	},
  props:['param','value'],
	watch:{
		param:{
			handler(val){
				if(!this.value){
					switch(val.formType){
						case 'input':
							this.inputValue=''
							break
						case 'radio':
							this.inputValue=false
							break
						case 'select':
							this.inputValue=''
							break
						case 'date':
							this.inputValue=''
							break
						case 'file':
							this.inputValue=''
							break
						default:
							this.inputValue=''
							break
					}
				}else{
					this.inputValue = this.value
				}
				
			}
		},
		inputValue:{
			handler(val){
				this.$emit('changeInput',val)
			}
		}
	}
}
</script>
