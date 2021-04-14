<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top:30px;">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">admin</el-tag> can see this
        </span>
        <el-tag v-permission="['admin']" class="permission-sourceCode" type="info">
          v-permission="['admin']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['editor']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">editor</el-tag> can see this
        </span>
        <el-tag v-permission="['editor']" class="permission-sourceCode" type="info">
          v-permission="['editor']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['admin','editor']" class="permission-alert">
          Both
          <el-tag class="permission-tag" size="small">admin</el-tag> and
          <el-tag class="permission-tag" size="small">editor</el-tag> can see this
        </span>
        <el-tag v-permission="['admin','editor']" class="permission-sourceCode" type="info">
          v-permission="['admin','editor']"
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'DirectivePermission',
  components: { SwitchRoles },
  directives: { permission },
  data() {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  methods: {
    handleRolesChange() {
      this.key++
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  ::v-deep .permission-alert {
    width: 320px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  ::v-deep .permission-sourceCode {
    margin-left: 15px;
  }
  ::v-deep .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>

