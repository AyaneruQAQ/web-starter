<template>
    <div class="child">
        <div class="red-title">{{$t('myExample.title')}}</div>
        <div class="content">child-content</div>
        <el-button>child-btn</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .red-title{
        color: red;
    }
    .content{
        color: red;
    }
    .child ::v-deep .el-button{
        color: red;
    }
</style>