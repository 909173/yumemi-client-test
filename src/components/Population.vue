<script setup lang="ts">
import "c3/c3.min.css"
import { ChartConfiguration, generate } from "c3"
import { onMounted, ref } from "vue"
import { usePopulationStore } from "../store/population"

const populationStore = usePopulationStore()

const c3GraphConfig = ref<ChartConfiguration>({
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
})
function initC3Graph() {
  const graphData = generate(c3GraphConfig.value)
  populationStore.c3graphData = graphData
}
onMounted(() => {
  initC3Graph()
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
