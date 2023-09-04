<script setup lang="ts"></script>
<template>
  <header class="header">
    <div class="header-container">
      <h1 class="header-title">Title</h1>
    </div>
    <div class="side-bar">
      <router-link to="/" class="router-link">都道府県データ一覧</router-link>
      <router-link to="/exclude-prefectures" class="router-link"
        >除外県一覧</router-link
      >
    </div>
  </header>
</template>

<style scoped>
.router-link {
  padding: 12px;
}
.header {
  background-color: grey;
  display: flex;
  align-items: center;
}
.header-container {
  padding: 0px 12px;
  flex-grow: 1;
  height: auto;
  text-align: left;
}
.header-title {
  margin: 0;
}
</style>
