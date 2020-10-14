<template>
    <div class="wrapper">
      <select-all-one v-model="select" :child-options="options" ></select-all-one>
      <div>
          <li v-for="(item,index) in filterArr" :key="index" >{{item.label,'--------'}} </li>
      </div>
    </div>
</template>

<script>
    import SelectAllOne from './subComponents/SelectAllOne'
    export default {
        name: 'SelectAll',
        components:{
            SelectAllOne
        },
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '火腿肠'
                }],
                select: [],
                filterArr:[]
            }
        },
        watch:{
            select:{
                handler(newVal){
                    this.filterArr = this.options.filter((item, i) => {
                    if (newVal.includes(item.value)) {
                        return item;
                    }
                    return null;
                });
                },
                deep:true,
                immediate:true
            }
        }
 
    }
</script>

<style lang="scss" scoped>
</style>