<template>
  <div class="echarts-box">
    <div class="myC" id="myEcharts" :style="{ width: '100%', height: '300px'}"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts"
import { onMounted, onUnmounted, onBeforeUpdate } from 'vue'

let chart

const props = defineProps({
  'predict': Array,
  'std': Array
})

onMounted(() => {
  initChart()
})

onBeforeUpdate(() => {
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    yAxis: {},
    series: [
      {
        name: '预测结果',
        data: props.predict,
        type: "scatter"
      },
      {
        name: '真实结果',
        label: { show: true, fontSize: 16 },
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

<style scoped>
.echarts-box {
  width: 100%;
  height: 50%;
}
.myC {
  background-color: transparent;
}

#myEcharts {
  background-color: transparent;
}
</style>