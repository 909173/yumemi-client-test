import { ref } from "vue"
import { defineStore } from "pinia"
import { PrefectureDisplay } from "../types/prefecture"
import { PrefectureResponse } from "../types/api"
import axiosInstance from "../util/axiosSettings"

export const usePrefectureStore = defineStore("prefecture", () => {
  const prefectures = ref<PrefectureDisplay[]>([])
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
  return { prefectures, changeCheckPrefecture, fetchPrefecture }
})
