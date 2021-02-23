<template>
    <div>
        <el-select v-model="selectChild" multiple collapse-tags  @change="changeSelect" filterable style="margin-left: 20px;" placeholder="请选择">
            <el-option label="全选" value="all" @click.native="selectAll"></el-option>
            <el-option v-for="item in childOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default{
        name:'SelectAllOne',
        props:{
            childOptions:{
                type:Array,
                default:function(){
                    []
                }
            },
            value:{
                type:Array,
                 default:function(){
                    []
                }
            }
        },
        data(){
            return{
                selectChild:[],
                optionSelected:[],
            }
        },
        watch:{
            childOptions:{
                handler(){
                    this.optionSelected=this.childOptions.map(item=>item.value)
                    this.selectChild=['all', ...this.optionSelected]
                },
                immediate:true
            },
            selectChild:{
                handler(newVal){
                    // 将selectChild的值传给父组件selectAll，传给父组件的值是想赋给value的，父组件通过v-model绑定的是value属性
                    this.$emit('input',newVal)
                },
                immediate:true
            }
        },
        methods: {
            selectAll(){
                if(this.selectChild.includes('all')){
                    this.selectChild=['all', ...this.optionSelected]
                }
                else
                this.selectChild=[];
            },
            changeSelect(val){
                const index=this.selectChild.indexOf('all');
                if(val.includes('all')&&this.selectChild.length===this.optionSelected.length){
                    this.selectChild.splice(index,1);
                }
                
            }
        }
    }
</script>

<style>
</style>