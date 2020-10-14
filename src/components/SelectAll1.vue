<template>
    <div class="wrapper">
        <div>00000000000nnnnnnnnnnnnnnn</div>
      <select-all-two v-model="select" :child-options="options" ></select-all-two>
      <div>
          <li v-for="(item,index) in filterArr" :key="index" >{{item.label}} </li>
      </div>
    </div>
</template>

<script>
    import SelectAllTwo from './subComponents/SelectAllTwo'
    export default {
        name: 'SelectAll1',
        components:{
            SelectAllTwo
        },
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '麻辣烫'
                }, {
                    value: '选项2',
                    label: '酸菜鱼'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '火锅'
                }],
                select: [],
                filterArr:[],
                optionSelected:[]
            }
        },
        watch:{
            options: {
            handler() {
                this.optionSelected = this.options.map((item) => item.value);
                this.select = ['all', ...this.optionSelected];
            },
            immediate: true
        },
            select:{
                handler(newVal){
                    this.filterArr = this.options.filter((item) => {
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