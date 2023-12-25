<template>
  <div class="echarts-box">
    <div id="myEcharts" :style="{ width: '900px', height: '300px' }"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts"
import { onMounted, onUnmounted, onUpdated } from 'vue'

let chart

const props = defineProps({
  'predict': Array,
  'std': Array
})

onMounted(() => {
  initChart()
})

onUpdated(() => {
    // 更新数据
    const opt = chart.getOption()
    opt.series[0].data = props.predict
    opt.series[1].data = props.std
    chart.setOption(opt, true)
})

onUnmounted(() => {
  echarts.dispose()
})

function initChart() {
  chart = echarts.init(document.getElementById("myEcharts"), "dark");
  // 把配置和数据放这里
  chart.setOption({
    title: {
      text: '六种方法模型预测结果',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['AL', 'Bagging', 'DT', 'KNN', 'RF', 'SVM']
    },
    tooltip: {},
    yAxis: {},
    // visualMap: {
    //   // pieces: [
    //   //   {
    //   //     value: 0,
    //   //     label: '预测值',
    //   //     color: '#5470c6'
    //   //   },
    //   //   {
    //   //     value: 1,
    //   //     label: '真实值',
    //   //     color: '#91cc75'
    //   //   }
    //   // ]
    // },
    series: [
      {
        data: props.predict,
        type: "scatter"
      },
      {
        data: props.std,
        type: "line"
      }
    ]
  });
  window.onresize = function() {
    //自适应大小
    chart.resize();
  };
}
</script>

<style lang="less">
</style>