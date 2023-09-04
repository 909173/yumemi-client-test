<script lang="ts" setup>
import Prefectures from "../components/Prefectures.vue"
import { PrefectureDisplay } from "../types/prefecture"
import { useExcludePrefectures } from "../store/excludePrefectures"
const excludePrefectures = useExcludePrefectures()
const handleChangeCheck = (arg: PrefectureDisplay) => {
  excludePrefectures.setExcludePrefectures(arg)
}
excludePrefectures.fetchPrefectures()
</script>
<template>
  <h1>県一覧から除外する県を選択してください</h1>
  <Prefectures
    :prefectures="excludePrefectures.prefectures"
    :handle-change-check="handleChangeCheck"
  />
</template>
