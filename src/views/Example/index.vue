<template>
    <div>
        <ExampleTitle/>
        <div class="content">content</div>
        <el-button v-auth="['exam.edit']">btn</el-button>
    </div>
</template>
<script>
import ExampleTitle from './_components/ExampleTitle'
export default {
    components:{
        ExampleTitle
    }
}
</script>
<style lang="scss" scoped>
    .content{
        color: green;
    }
    ::v-deep .el-button{
            color: green;
        }
    
</style>