<template>
  <div class="box">
    <div class="btn">
      <el-button
        type="text"
        @click="dialogVisible = true"
      >
        系统版本
      </el-button>
    </div>
    <el-dialog
      center
      width="40%"
      title="版本查看"
      :visible.sync="dialogVisible"
    >
      <div class="content">
        账户管理平台: {{ version }}
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    version() {
      // eslint-disable-next-line no-undef
      return VERSION
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.btn {
  margin: 20px 30px;
  display: flex;
  justify-content: flex-end;
}
.content {
  padding: 50px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
}
</style>
