import Vue from 'vue'

/* 
vue component 使用jsx语法  
https://cn.vuejs.org/v2/guide/render-function.html
https://segmentfault.com/a/1190000019659205
*/
const ComItem = Vue.component('com-item',{
    render:function (h) {
        const Tag = this.el_name //jsx标签首字母大写
        const ChildTag = this.el_child
        const Child = (props)=>(<ChildTag {...props}></ChildTag>)

        // return h(this.el_name,{
        //     domProps:{innerHTML:this.content}
        // })
        // const {el_name:Tag,content} = this.props
        return (
            <Tag 
                vModel={this.inputVal}
                vOn:change={this.ff}
            >
                {
                    this.el_child?this.content.map((item,index)=>{
                        return(
                            <Child value={item} label={item} key={index}/>
                        )
                    })
                    :this.content
                }
            </Tag>
        )
    },
    data(){
        return {
            inputVal:'',
            ChildTag:''
        }
    },
    props:{
        el_name:{
            type:String,
            required:true
        },
        el_child:{
            type:String,
            required:false
        },
        content:{
            type:Array,
            required:false
        },
        defaultVal:{
            type:String|Boolean,
            required:false
        },
    },
    watch:{
        defaultVal:{
            handler(val){
                this.inputVal = val
            },
            immediate:true
        }
    },
    methods:{
        ff(data){
            this.$emit('react',data)
        }
    }
})

export default ComItem
