<!--
    作用：列表页的布局与逻辑
    分页的页码和条数由本组件控制

    1. hasExpandSearch 属性：是否有展开项，默认无。 如有，设置 hasExpandSearch=true
    2. showIndex 属性：是否展示索引列，默认是
    3. showSelection 属性：是否展示多选列，默认否
    4. form 属性：表单搜索项，必传
    5. total 属性：是列表条数，必传
    6. tableData 属性：列表数据，必传
    7. getData() 方法：父组件获取本组件data，包括 currentPage、pageSize、tableOrderBy、selectionData
    8. clearSelectionData() 方法：清空选中项

    1. 搜索与重置按钮: 重新请求列表，触发父组件的 onRequestList事件，重置表单需父组件操作
    2. 新增按钮: 跳转到新增页
    3. 行点击: 跳转到详情页
    4. 页码和页数改变: 重新请求列表，触发父组件的 onRequestList事件

    1. firstRowOfSearch 插槽：搜索栏第一行内容，永远都是展开的， 每项可以使用 FormItemOfGrid组件快速布局
    2. ExpandRowOfSearch 插槽：搜索栏展开项内容， 每项可以使用 FormItemOfGrid组件快速布局
    3. leftBtnOfOption 插槽：列表顶部左边放置操作按钮
    4. rightBtnOfOption 插槽：列表顶部右边放置操作按钮
    5. listOfTable 插槽：放置列表

-->

<template>
  <div class="PageList">
    <!--搜索区域-->
    <div class="searchArea u-border">
      <el-form
        :model="form"
        label-width="100px"
      >

        <!-- 第一行-->
        <el-row>
          <slot name="firstRowOfSearch" />
        </el-row>

        <!--搜索展开项-->
        <el-row v-show="hasExpandSearch && searchIsOpen">
          <slot name="ExpandRowOfSearch" />
        </el-row>

        <!--操作区-->
        <el-row class="u-textRight">
          <el-form-item>

            <el-button
              type="primary"
              @click.stop.prevent="onSearch"
            >搜索</el-button>
            <el-button @click.stop.prevent="onSearch(true)">重置</el-button>

            <el-button
              v-if="hasExpandSearch"
              type="text"
              @click.stop.prevent="searchIsOpen = !searchIsOpen"
            >
              <span>{{ searchIsOpen == true ? '折叠' : '展开' }}</span>
              <i :class="searchIsOpen == true ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
            </el-button>
          </el-form-item>
        </el-row>

      </el-form>
    </div>

    <!--列表区域-->
    <div class="resultArea u-border">

      <!--表头操作区域-->
      <div class="optionArea u-cf">
        <!--左边：放增删改查相关-->
        <div class="u-fl">
          <el-button
            v-if="showAdd"
            type="primary"
            icon="el-icon-plus"
            @click.stop="onAdd"
          >新增</el-button>
          <slot name="leftBtnOfOption" />
        </div>

        <!--右边：放其他按钮-->
        <div class="u-fr">
          <slot name="rightBtnOfOption" />
        </div>
      </div>

      <!--列表区域-->
      <div class="tableList">

        <!--列表-->
        <el-table
          v-loading="tableLoad"
          empty-text="抱歉，暂无相关数据"
          style="width: 100%"
          :data="tableData"
          stripe
          border
          @selection-change="onTableSelectionChange"
          @sort-change="onTableSortChange"
          @cell-click="onCellClick"
        >
          <el-table-column
            v-if="showSelection"
            type="selection"
            align="center"
            width="55"
          />
          <el-table-column
            v-if="showIndex"
            type="index"
            label="序号"
            align="center"
            width="55"
          />
          <slot name="listOfTable" />
        </el-table>

        <!--分页器-->
        <div
          v-show="total > 0"
          class="PaginationCom paginationArea"
        >
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            @size-change="onPageSizeChange"
            @current-change="onCurrentPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageList',
  props: {
    showAdd: {
      // 是否显示新增按钮
      type: Boolean,
      default: false
    },
    hasExpandSearch: {
      // 是否有展开搜索项
      type: Boolean,
      default: false
    },
    showSelection: {
      // 是否显示多选列
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean, // 是否显示索引列
      default: true
    },
    tableLoad: {
      type: Boolean, // 列表是否加载中
      default: false
    },
    toNewPage: {
      type: Boolean, // 新增按钮打开对话框还是去新的页面,true去新的页面
      default: true
    },
    toDetail: {
      // 单击某行,是否跳转到详情页面
      type: Boolean,
      default: true
    },
    tableData: {
      // 列表数据
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    total: {
      // 列表条数
      type: Number,
      required: true,
      default: 0
    },
    form: {
      // 表单项
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      searchIsOpen: false,
      pageSizes: [20, 50, 100, 200],
      currentPage: 1,
      pageSize: 20,
      tableOrderBy: [], // 列表排序
      selectionData: [] // 选中项
    }
  },
  methods: {
    onAdd() {
      // 是否打开新的页面以新增
      if (this.toNewPage) {
        this.$router.push({ path: `${this.$route.path}/new` })
      } else {
        // 否则打开新增对话框
        this.$emit('openAddDialog')
      }
    },

    onSearch(isReset) {
      this.currentPage = 1
      this.selectionData = []
      this.$emit('onRequestList', isReset)
    },

    onPageSizeChange(size) {
      this.pageSize = size
      this.onSearch()
    },

    onCurrentPageChange(page) {
      this.currentPage = page
      this.selectionData = []
      this.$emit('onRequestList')
    },

    onTableSortChange(column) {
      const myOrder = column.order === 'ascending' ? 'ASC' : 'DESC'
      this.tableOrderBy = [column.prop, myOrder]
      this.onSearch()
    },

    onTableSelectionChange(rows) {
      this.selectionData = rows
    },

    onCellClick(row) {
      if (this.toDetail) {
        this.$router.push({
          path: `${this.$route.path}/${row.id}`
        })
      }
    },

    // 获取data的值
    getData() {
      return {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        tableOrderBy: this.tableOrderBy,
        selectionData: this.selectionData
      }
    },

    // 清空选中项
    clearSelectionData() {
      this.selectionData = []
    }
  }
}
</script>

<style lang="scss">
.searchArea {
  background: white;
  padding: 18px 15px;
  padding-bottom: 0;
}

.resultArea {
  margin-top: 15px;
  padding: 18px 15px;
  background: white;

  .optionArea {
    margin-bottom: 15px;
  }
}

.paginationArea {
  margin-top: 15px;
  text-align: right;
}

.u-border {
  border: 1px solid #e2e6e9 !important;
  border-radius: 6px !important;
}
.u-textRight {
  text-align: right !important;
}
.u-fl {
  float: left;
}
.u-fr {
  float: right;
}
</style>
