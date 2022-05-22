<script setup lang="ts">
import { inject } from "vue"
import { populationStoreKey } from "../store/population"
import { PrefectureDisplay } from "../types/prefecture"
import { prefectureStoreKey } from "../store/prefecture"
import PrefectureVue from "./Prefectures/Prefecture.vue"
const prefectureStore = inject(prefectureStoreKey)
const populationStore = inject(populationStoreKey)
if (!prefectureStore) throw new Error("prefecture store not found")
if (!populationStore) throw new Error("population store not found")
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
        v-for="pref in prefectureStore.state.prefectures"
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
