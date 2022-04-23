<script setup lang="ts">
import "./assets/common.css"
import { provide } from "vue"
import PrefecturesVue from "./components/Prefectures.vue"
import HeaderContainer from "./components/HeaderContainer.vue"
import prefectureStore, { prefectureStoreKey } from "./store/prefecture"
import populationStore, { populationStoreKey } from "./store/population"
import Population from "./components/Population.vue"
provide(prefectureStoreKey, prefectureStore)
provide(populationStoreKey, populationStore)
</script>

<template>
  <HeaderContainer />
  <div class="main-container">
    <PrefecturesVue />
    <Population />
  </div>
</template>

<style scoped>
.main-container {
  flex-direction: column;
  display: flex;
  align-items: center;
}
</style>
