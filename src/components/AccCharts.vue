<template>
  <div class="echarts-box">
    <div class="myC" id="myEcharts2" :style="{ width: '100%', height: '559px'}"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts"
import { onMounted, onUnmounted, onBeforeUpdate } from 'vue'

let chart

const props = defineProps({
  'acc': Array
})

onMounted(() => {
  initChart()
})

onBeforeUpdate(() => {
    // 更新数据
    const opt = chart.getOption()
    for (let i = 0; i < opt.series[0].data.length; i++) {
      opt.series[0].data[i].value = props.acc[i]
    }
    console.log(opt.series[0])
    chart.setOption(opt, true)
})

onUnmounted(() => {
  echarts.dispose()
})

function initChart() {
  chart = echarts.init(document.getElementById("myEcharts2"), "dark");
  // 把配置和数据放这里
  chart.setOption({
    title: {
      text: '六种方法模型训练后预测准确度',
      left: 'center'
    },
    yAxis: {
      type: 'category',
      data: ['AL', 'Bagging', 'DT', 'KNN', 'RF', 'SVM']
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
        name: '预测准确度',
        data: [
          {
            value: 0,
            itemStyle: {
              color: '#ffc8c8'
            }
          },
          {
            value: 0,
            itemStyle: {
              color: '#ffe5c8'
            }
          },
          {
            value: 0,
            itemStyle: {
              color: '#ffe5c8'
            }
          },
          {
            value: 0,
            itemStyle: {
              color: '#dfffc8'
            }
          },
          {
            value: 0,
            itemStyle: {
              color: '#c8ffd8'
            }
          },
          {
            value: 0,
            itemStyle: {
              color: '#c8ffd8'
            }
          }
        ],
        type: "bar"
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