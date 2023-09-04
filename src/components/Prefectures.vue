<script setup lang="ts">
import { PrefectureDisplay } from "../types/prefecture"
import PrefectureVue from "./Prefectures/Prefecture.vue"
const props = defineProps<{
  handleChangeCheck: (arg: PrefectureDisplay) => void
  prefectures: PrefectureDisplay[]
}>()
</script>
<template>
  <div class="prefecture-container">
    <h3>都道府県</h3>
    <div class="prefecture-flex">
      <PrefectureVue
        v-for="pref in prefectures"
        :key="pref.prefCode"
        :prefecture="pref"
        @check="props.handleChangeCheck"
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
