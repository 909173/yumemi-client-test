<script setup lang="ts">
import "./assets/common.css"
import PrefecturesVue from "./components/Prefectures.vue"
import HeaderContainer from "./components/HeaderContainer.vue"
import Population from "./components/Population.vue"
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
