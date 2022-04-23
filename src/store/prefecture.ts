import { InjectionKey, reactive, readonly } from "vue"
import { PrefectureDisplay } from "../types/prefecture"
import { PrefectureResponse } from "../types/api"
import axiosInstance from "../util/axiosSettings"
const state = reactive<{ prefectures: PrefectureDisplay[] }>({
  prefectures: [],
})

const setPrefectures = (prefectures: PrefectureDisplay[]) =>
  (state.prefectures = prefectures)

const changeCheckPrefecture = (arg: { prefCode: number; isCheck: boolean }) => {
  state.prefectures = state.prefectures.map((x) =>
    x.prefCode === arg.prefCode
      ? {
          ...x,
          isCheck: arg.isCheck,
        }
      : x
  )
}
const fetchPrefecture = async () => {
  try {
    const response = await axiosInstance.get<PrefectureResponse>("/prefectures")
    setPrefectures(
      response.data.result.map((x) => ({
        ...x,
        isCheck: false,
      }))
    )
  } catch (err) {
    console.error(err)
  }
}
const prefectureStore = {
  state: readonly(state),
  fetchPrefecture,
  changeCheckPrefecture,
  setPrefectures,
}
export default prefectureStore
export type PrefectureStoreType = typeof prefectureStore
export const prefectureStoreKey: InjectionKey<PrefectureStoreType> =
  Symbol("prefecture")
