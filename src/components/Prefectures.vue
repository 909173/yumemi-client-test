<script setup lang="ts">
import { PrefectureDisplay } from "../types/prefecture"
import { usePrefectureStore } from "../store/prefecture"
import { usePopulationStore } from "../store/population"
import PrefectureVue from "./Prefectures/Prefecture.vue"
const prefectureStore = usePrefectureStore()
const populationStore = usePopulationStore()
prefectureStore.fetchPrefecture()
const handleChangeCheck = (arg: PrefectureDisplay) => {
  prefectureStore.changeCheckPrefecture(arg)
  if (arg.isCheck) populationStore.fetchPopulation(arg)
  else populationStore.disposePopulation(arg)
}
</script>
<template>
  <div class="prefecture-container">
    <h3>都道府県</h3>
    <div class="prefecture-flex">
      <PrefectureVue
        v-for="pref in prefectureStore.prefectures"
        :key="pref.prefCode"
        :prefecture="pref"
        @check="handleChangeCheck"
      />
    </div>
  </div>
</template>
<style scoped>
.prefecture-container {
  max-width: 900px;
  width: 100%;
}
.prefecture-flex {
  display: grid;
  grid-template-columns: 33% 33% 33%;
}
</style>
