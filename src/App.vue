<template>
  <div class="all-charts">
    <PredictionCharts :predict="prediction" :std="std"/>
  </div>
  <vi-drawer teleport v-model="open" class="my-drawer">
    <vi-row class="btn-row" align="center" justify="flex-start" gap="16px">
      <vi-bubble dark class="my-bubble">
        <vi-button color="green">上传数据</vi-button>
        <template v-slot:content>
          请注意，上传的数据必须包含label与feature
        </template>
      </vi-bubble>
      <vi-select type="button" placeholder="预测起始行" class="my-start-select" v-model="selectStart">
        <vi-option v-for="index, i in tableData.length" :value="i" :key="i">
          第{{ index }}行
        </vi-option>
      </vi-select>
      至
      <vi-select type="button" placeholder="预测结束行" class="my-start-select" v-model="selectEnd">
        <vi-option v-for="index, i in tableData.length" :value="i" v-show="isEndLine(i)">
          第{{ index }}行
        </vi-option>
      </vi-select>
    </vi-row>
    <vi-row class="btn-row" align="center" justify="flex-start" gap="16px">
      <vi-button color="yellow" @click="predictDataWithX">预测数据</vi-button>
      <vi-select type="button" placeholder="请选择预测数据行" v-model="selectLine">
        <vi-option v-for="index, i in tableData.length" :value="i" :key="i">
          第{{ index }}行
        </vi-option>
      </vi-select>
    </vi-row>
    <vi-table-editor class="my-table" v-model="tableData" :defaultCol="8"></vi-table-editor>
  </vi-drawer>
</template>

<script setup>
import PredictionCharts from './components/PredictionCharts.vue'
import { ref, reactive, computed, watch } from 'vue'
import { ViMessage } from 'viog-ui'
import { predictData } from './network'

const selectStart = ref()
const selectEnd = ref()
const selectLine = ref()
const prediction = ref()
const std = ref()

const open = ref(true)
const tableData = reactive([])

watch(selectStart, () => {
  if (selectEnd.value === undefined || selectStart.value === undefined) return
  if (selectEnd.value < selectStart.value) selectEnd.value = selectStart.value
})

const isEndLine = computed(() => {
  return (i = 0) => {
    // console.log(typeof i, i)
    // console.log(typeof selectStart.value, selectStart.value)
    return selectStart.value === undefined || i >= selectStart.value
  }
})

async function predictDataWithX () {
  if (selectLine.value === undefined) {
    ViMessage.append('您还没有选择预测的数据行', 1000)
  } else {
    const predictLine = tableData[selectLine.value]
    if (predictLine.length < 7) {
      ViMessage.append('请输入完整测试数据！', 1000)
    } else{
      const input = predictLine.map((val) => Number(val))
      const stdY = input[7]
      input.length = 7
      // console.log(input)
      const data = await predictData(input.join(','))
      // console.log(data)
      prediction.value = [
        [0, data.al[0]],
        [1, data.bagging[0]],
        [2, data.dt[0]],
        [3, data.knn[0]],
        [4, data.rf[0]],
        [5, data.svm[0]],
      ]
      std.value = [
        [0, stdY],
        [1, stdY],
        [2, stdY],
        [3, stdY],
        [4, stdY],
        [5, stdY],        
      ]
    }
  }
}

</script>

<style scoped>
.all-charts {
  width: 100%;
  height: 100%;
}
.my-drawer {
  --vi-drawer-width: 400px;

  .btn-row {
    --vi-purple-color6: #f8fa7c67;
    height: 45px;

    .my-start-select {
      --vi-select-width: 110px;
    }
  }

  .my-table {
    height: calc(100% - 90px);
    --vi-table-width: 100%;
    --vi-table-height: 100%;
  }
}
</style>
