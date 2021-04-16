<!--
    作用：列表页搜索区每项表单的布局
    默认插槽：放置内容
-->

<template>
  <el-col :span="span">
    <el-form-item :label="label + '：'">
      <slot />
    </el-form-item>
  </el-col>
</template>

<script>
export default {
  name: 'FormItemOfGrid',
  props: {
    span: {
      // 占多少分栏
      type: Number,
      default: 6
    },
    label: {
      // label
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
</style>
