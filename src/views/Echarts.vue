<template>
 <div class="echarts-wrapper" >
  <div class="echarts-simple-demo" ref="myChart">
  </div>
  <chart :options='option' class="chart-template" />
 </div>
</template>

<script>
import * as echarts from "echarts";
import chart from '../components/Chart'
export default {
  name: "echarts",
  data() {
    return {
      option : {
    title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
                {value: 484, name: '联盟广告'},
                {value: 300, name: '视频广告'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}
    };
  },
  components:{
    chart
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.$refs.myChart);
      let myChart = echarts.init(this.$refs.myChart);
      myChart.on('click',()=>{
          console.log('okkkkk')
      })
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts-wrapper{
    height: 100%;
    width: 100%;
    display: flex;
    margin-top: 100px;
    justify-content: space-around;
    .echarts-simple-demo {
  height: 400px;
  width: 400px;
}
.chart-template{
  height: 400px;
  width: 400px;
}
}

</style>
