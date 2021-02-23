<template>
    <div ref='echartsRef' class="chart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name:'Chart',
    props:{
        options:{
            type:Object,
            default(){
                return {}
            }
        },
        events:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    data(){
        return {
            echartsInstance:''
        }
    },
    watch:{
        options:{
            handler(){
                this.$nextTick().then(()=>{
                    this.render();
                })
            },
            deep:true,
            immediate:true
        }
    },
    mounted(){
    // 直接给onresize赋值，window,body只有一个起作用，后定义的会覆盖先定义的,下面这种写法只有最后一个echarts图会执行resize()
    // window.onresize = () => {
    //   this.resize();
    // };
        window.addEventListener('resize',this.resize)
    },
    beforeDestroy(){
        window.removeEventListener('resize',this.resize);
        this.dispose();
    },
    methods:{
        render(){
            this.echartsInstance=echarts.getInstanceByDom(this.$refs.echartsRef)
            if(!this.echartsInstance){
                //创建echarts实例
                this.echartsInstance=echarts.init(this.$refs.echartsRef)
                
                this.events.map(({event,handler})=>{
                    //绑定事件处理函数
                    this.echartsInstance.on(event,handler)
                })
            }
            //清空当前实例，会移除实例中所有得组件和图表
            this.echartsInstance.clear();
            //获取当前实例中维护的option对象
            this.echartsInstance.setOption(this.options)
        },
        dispose(){
            //销毁实例，实例销毁后无法再被使用
            this.echartsInstance?.dispose();
        },
        resize(){
            //改变图标尺寸，在容器大小发生改变时需要手动调用
            this.echartsInstance?.resize()
        }
    }
}
</script>