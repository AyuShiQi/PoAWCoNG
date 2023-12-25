<template>
  <div class="echarts-box">
    <div class="myC" id="myEcharts3" :style="{ width: '100%', height: '259px'}"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts"
import { onMounted, onUnmounted, onBeforeUpdate } from 'vue'

let chart

const props = defineProps({
  'al': Array
})

onMounted(() => {
  initChart()
})

onBeforeUpdate(() => {
    // 更新数据
    const opt = chart.getOption()
    opt.series[0].data = props.al
    chart.setOption(opt, true)
})

onUnmounted(() => {
  echarts.dispose()
})

function initChart() {
  chart = echarts.init(document.getElementById("myEcharts3"), "dark");
  // 把配置和数据放这里
  chart.setOption({
    title: {
      text: '主动学习acc',
      left: 'center'
    },
    yAxis: {
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    xAxis: {},
    series: [
      {
        name: 'acc',
        data: [],
        type: "line",
        smooth: true
      }
    ]
  });
  window.onresize = function() {
    //自适应大小
    chart.resize();
  };
}
</script>

<style scoped>
.echarts-box {
  width: 100%;
  height: 50%;
}
.myC {
  background-color: transparent;
}

#myEcharts {
  background-color: #c8fff2;
}
</style>