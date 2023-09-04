<script setup lang="ts">
import "./assets/common.css"
import HeaderContainer from "./components/HeaderContainer.vue"
</script>

<template>
  <HeaderContainer />
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.main-container {
  flex-direction: column;
  display: flex;
  align-items: center;
}
</style>
