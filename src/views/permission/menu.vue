<template>
  <div>
    <el-dialog
      :visible.sync="showDia"
      :title="dialogTitle"
      
    >
      <el-form class="form" label-position="right" label-width="80px">
        <el-form-item label="菜单类型:">
          <el-radio-group v-model="editMenu.menuType" :disabled="dialogTitle==='编辑菜单'">
            <el-radio label="目录"></el-radio>
            <el-radio label="菜单"></el-radio>
            <el-radio label="按钮"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单id:">
          <el-input class="formInput" v-model="editMenu.id" placeholder="菜单id"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称:">
          <el-input class="formInput" v-model="editMenu.name" placeholder="菜单名称">
          </el-input>
        </el-form-item>
        <el-form-item label="上级菜单:">
          <select-tree
            :disabled="editMenu.menuType==='目录'?true:false"
            customStyle="width:50%"
            :props="treeProps"
            :value="editMenu.parentName"
            :options="treeData"
            @getValue="setParent($event)"
          />
        </el-form-item>
        <el-form-item label="菜单路径:">
          <el-input class="formInput" v-model="editMenu.path" placeholder="菜单路径"></el-input>
        </el-form-item>
        <el-form-item label="授权标识:">
          <el-input class="formInput" v-model="editMenu.perms" placeholder="授权标识"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取 消</el-button>
        <el-button type="primary" @click="saveMenu">确 定</el-button>
      </span>
    </el-dialog>
    <div class="btnArea">
      <el-button @click="addMenu" type="primary" size="medium">新增菜单</el-button>
    </div>
    <!-- row-key不能为0，否则会无法展开 -->
    <el-table
      :data="tableData"
      border
			row-key="id"
			stripe
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!-- <el-table-column
        type="index"
        label="序号"
        width="80"
				align="center"
      >
      </el-table-column> -->
			<el-table-column
        prop="id"
        label="菜单id"
        width=""
				align="left"
				header-align="center"
      >
			</el-table-column>
      <el-table-column
        prop="name"
        label="菜单名称"
        width=""
				align="center"
      >
      </el-table-column>
      <el-table-column
        prop="parentName"
        label="上级菜单"
        width=""
				align="center"
      >
      </el-table-column>
      <el-table-column
        prop="menuType"
        label="类型"
        width=""
				align="center"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="菜单路径"
        width=""
				align="center"
      >
      </el-table-column>
      <el-table-column
        prop="perms"
        label="授权标识"
        width=""
				align="center"
				show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
        width=""
				align="center"
      >
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope,'edit')">
            {{ $t('permission.editPermission') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('permission.delete') }}
          </el-button>
				</template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import SelectTree from '@/components/SelectTree'
import _ from 'lodash'

let that

export default {
  data() {
    return {
        tableData:[],
        showDia:false,
        dialogTitle:'新增菜单',
        editMenu:{},

        treeProps:{
          value:'name',
          label:'name',
          children:'children'
        },
        treeData:[],
        tableIndex:0,
    }
  },
  // filters:{
  //   generateIndex:function(value){
  //     if(value.row.parentName===''){
  //       that.tableIndex += 1
  //       return that.tableIndex
  //     }else{
  //       return ''
  //     }
  //   }
  // },
  components:{
    SelectTree
  },
  beforeCreate(){
    that = this
  },
	created(){
		this.getMenu()
	},
	methods:{
		handleEdit(scope,type){
      this.editMenu = scope.row
      this.showDia = true
      if(type === 'edit'){
        this.dialogTitle = '编辑菜单'
      }
		},
		handleDelete(scope){

		},
		async getMenu(){
      const {routers} = await this.$store.dispatch('user/getInfo')
      
      this.tableData = routers
      const tempData = _.cloneDeep(routers)
      this.treeData = this.filterMenu(tempData)
    },
    /**
     *筛选出不包括按钮的菜单树
     *@param {object} data -后台返回的菜单树
     *
     * */
    filterMenu(data){
      const res = []

      for(const item of data){
        if(item.children){
          item.children = this.filterMenu(item.children)
        }
        if(item.menuType!=="按钮"){
          res.push(item)
        }
      }

      return res
    },
    indexMethod(row){
      if(row.parentName===''){
        this.tableIndex += 1
        return this.tableIndex
      }
      return ''
    },
    saveMenu(){
      this.showDia = false
      console.log(this.editMenu)
    },
    setParent(data){
      this.editMenu.parentName = data
    },
    addMenu(){
      this.editMenu = {}
      this.dialogTitle = '新增菜单'
      this.showDia = true
    }
	}
}
</script>
<style lang="scss" scoped>
  .form{
    width: 80%;
    margin: auto;
  }
  .formInput,.formSelect{
    width: 50%;
  }
  .btnArea{
    margin:10px;
    overflow: hidden;
    *{
      float: right;
    }
  }
</style>