<template>
    <div>
        <draggable chosen-class="chosen" group="test" @start="drag=true" @end="drag=false" >
            <el-button>btn1</el-button>
            <el-button>btn2</el-button>
        </draggable>

        <draggable chosen-class="chosen" group="test" @start="drag=true" @end="drag=false">
            <el-button>btn4</el-button>
            <el-button>btn3</el-button>
        </draggable>

        <com-item 
            el_name="el-select" 
            el_child="el-option" 
            :content="content" 
            :defaultVal="value"
            @react="hello"
        />
        <com-item 
            el_name="el-radio-group" 
            el_child="el-radio" 
            :content="[true,false]" 
            :defaultVal="true"
            @react="hello"
        />
        <com-item
            el_name="el-input"
            defaultVal="hello"
            @react="hello"
        />
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import ComItem from './ComItem.js'
import Child from './child'
export default {
    data(){
        return {
            drag:false,
            content:['vue','jsx','component'],

            value:'vue',
            componentName:'el-button',
            temp:111
        }
    },
    components:{
        draggable,
        ComItem,
        Child
    },
    methods:{
        hello(data){
            this.temp = 1
        },
    }
}
</script>
<style lang="scss">
    .chosen{
        cursor: move;
    }
</style>