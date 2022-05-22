<script setup lang="ts">
import "c3/c3.min.css"
import { ChartConfiguration, generate } from "c3"
import { inject, onMounted } from "vue"
import { populationStoreKey } from "../store/population"
const populationStore = inject(populationStoreKey)
if (!populationStore) throw new Error("population store not found")

const c3GraphConfig: ChartConfiguration = {
  bindto: "#c3-graph",
  data: {
    x: "year",
    xFormat: "%Y",
    columns: [["year"]],
    labels: true,
  },
  axis: {
    x: {
      type: "timeseries",
      tick: {
        format: "%Y",
      },
      label: {
        text: "年度",
        position: "outer-right",
      },
    },
    y: {
      label: {
        text: "人口数",
        position: "outer-top",
      },
    },
  },
}
onMounted(() => {
  const graphData = generate(c3GraphConfig)
  populationStore.setGraph(graphData)
})
</script>
<template>
  <div id="c3-graph"></div>
</template>

<style scoped>
#c3-graph {
  max-width: 900px;
  width: auto;
  max-height: 500px;
}
</style>
