import { computed, ref } from "vue"
import { defineStore } from "pinia"
import { PrefectureDisplay } from "../types/prefecture"
import { PrefectureResponse } from "../types/api"
import axiosInstance from "../util/axiosSettings"
import { useExcludePrefectures } from "./excludePrefectures"

export const usePrefectureStore = defineStore("prefecture", () => {
  const prefectures = ref<PrefectureDisplay[]>([])
  const excludePrefectures = useExcludePrefectures()
  const displayPrefectures = computed(() => {
    const excludePrefectureCodes = excludePrefectures.excludePrefectureCodes
    return prefectures.value.filter(
      (x) => !excludePrefectureCodes.includes(x.prefCode)
    )
  })
  function changeCheckPrefecture(state: {
    prefCode: number
    isCheck: boolean
  }) {
    prefectures.value = prefectures.value.map((x) =>
      x.prefCode === state.prefCode
        ? {
            ...x,
            isCheck: state.isCheck,
          }
        : x
    )
  }
  async function fetchPrefecture() {
    const response = await axiosInstance.get<PrefectureResponse>("/prefectures")
    prefectures.value = response.data.result.map((x) => ({
      ...x,
      isCheck: false,
    }))
  }
  return {
    prefectures,
    changeCheckPrefecture,
    fetchPrefecture,
    displayPrefectures,
  }
})
