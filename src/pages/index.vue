<script lang="ts" setup>
import Prefectures from "../components/Prefectures.vue"
import Population from "../components/Population.vue"
import { PrefectureDisplay } from "../types/prefecture"
import { usePrefectureStore } from "../store/prefecture"
import { usePopulationStore } from "../store/population"
const prefectureStore = usePrefectureStore()
const populationStore = usePopulationStore()
const handleChangeCheck = (arg: PrefectureDisplay) => {
  prefectureStore.changeCheckPrefecture(arg)
  if (arg.isCheck) populationStore.fetchPopulation(arg)
  else populationStore.disposePopulation(arg)
}
prefectureStore.fetchPrefecture()
</script>
<template>
  <Prefectures
    :prefectures="prefectureStore.prefectures"
    :handle-change-check="handleChangeCheck"
  />
  <Population />
</template>
