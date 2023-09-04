import { defineStore } from "pinia"
import { ref } from "vue"
import { computed } from "@vue/reactivity"
import { PrefectureDisplay } from "../types/prefecture"
import axiosInstance from "../util/axiosSettings"
import { PrefectureResponse } from "../types/api"
export const useExcludePrefectures = defineStore("excludePrefectures", () => {
  const prefectures = ref<PrefectureDisplay[]>(
    JSON.parse(localStorage.getItem("excludePrefectures") ?? "[]")
  )
  function setExcludePrefectures(pref: PrefectureDisplay) {
    const currentPrefIndex = prefectures.value.findIndex(
      (x) => x.prefCode === pref.prefCode
    )
    if (!prefectures.value) prefectures.value = [pref]
    else if (currentPrefIndex === -1) prefectures.value.push(pref)
    else prefectures.value[currentPrefIndex] = pref
    localStorage.setItem(
      "excludePrefectures",
      JSON.stringify(prefectures.value)
    )
  }
  const fetchPrefectures = async () => {
    const response = await axiosInstance.get<PrefectureResponse>("/prefectures")
    prefectures.value = response.data.result.map((x) => ({
      ...x,
      isCheck:
        prefectures.value.find((y) => x.prefCode === y.prefCode)?.isCheck ??
        false,
    }))
  }
  const excludePrefectureCodes = computed(() => {
    return prefectures.value.filter((x) => x.isCheck).map((x) => x.prefCode)
  })
  return {
    prefectures,
    setExcludePrefectures,
    excludePrefectureCodes,
    fetchPrefectures,
  }
})
