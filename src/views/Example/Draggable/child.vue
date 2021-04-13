
<template>
    <el-button @click="func">ddd</el-button>
</template>

<script>
/* 
vue $attr
*/
export default {
    props:{
        func:{
            type:Function,
        }
    },
    mounted(){
        console.log(this.$attrs)
        this.func()
    }
}
</script>