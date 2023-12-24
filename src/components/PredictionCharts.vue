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
})

onUnmounted(() => {
  echarts.dispose()
})

function initChart() {
  chart = echarts.init(document.getElementById("myEcharts"), "dark");
  // 把配置和数据放这里
  chart.setOption({
    xAxis: {},
    tooltip: {},
    yAxis: {},
    series: [
      {
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68]
        ],
        type: "scatter"
      },
      {
        data: [
          [10.0, 7.04],
          [8.07, 5.95],
          [13.0, 6.58],
          [9.05, 3.81],
          [11.0, 2.33],
          [14.0, 1.66],
          [13.4, 3.81],
          [10.0, 4.33],
          [14.0, 6.96],
          [12.5, 7.82],
          [9.15, 3.2],
          [11.5, 7.2],
          [3.03, 3.23],
          [12.2, 4.83],
          [2.02, 5.47],
          [1.05, 6.33],
          [4.05, 7.96],
          [6.03, 8.24],
          [12.0, 9.26],
          [12.0, 10.84],
          [7.08, 2.82],
          [5.02, 2.68]
        ],
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