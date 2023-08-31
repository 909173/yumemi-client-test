import { mount } from "@vue/test-utils"
import { createPinia, setActivePinia } from "pinia"
import { describe, test, expect, vi, afterEach, beforeEach } from "vitest"
import PrefecturesVue from "../../components/Prefectures.vue"
import PrefectureVue from "../../components/Prefectures/Prefecture.vue"

import { Prefecture, PrefectureDisplay } from "../../types/prefecture"
import { usePrefectureStore } from "../../store/prefecture"
import { usePopulationStore } from "../../store/population"
beforeEach(() => {
  setActivePinia(createPinia())
})
describe("Prefectures importテスト", () => {
  test("Prefectures import テスト", async () => {
    const cmp = await import("../../components/Prefectures.vue")
    expect(cmp).toBeDefined()
  })
})
describe("コンポーネント描画テスト", () => {
  test("初期描画テスト", () => {
    expect(PrefecturesVue).toBeTruthy()
    const wrapper = mount(PrefecturesVue)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).contain("都道府県")
  })
  test("都道府県描画テスト", () => {
    const prefectures: PrefectureDisplay[] = [
      {
        prefCode: 0,
        isCheck: false,
        prefName: "北海道",
      },
      {
        prefCode: 0,
        isCheck: false,
        prefName: "青森",
      },
    ]
    const prefectureStore = usePrefectureStore()
    prefectureStore.prefectures = prefectures
    const wrapper = mount(PrefecturesVue, {
      data: () => {
        return {
          prefectures,
        }
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).contain(
      ["都道府県", ...prefectures.map((x) => x.prefName)].reduce(
        (a, b) => `${a}${b}`
      )
    )
  })
})

describe("画面イベントテスト", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  test("チェックONイベント", async () => {
    // 県のモックデータ
    const populationStore = usePopulationStore()
    const prefectureStore = usePrefectureStore()
    const prefectures: PrefectureDisplay[] = [
      {
        prefCode: 0,
        isCheck: true,
        prefName: "北海道",
      },
    ]
    prefectureStore.prefectures = prefectures
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    populationStore.fetchPopulation = async (_: Prefecture) => {}
    const spy = vi.spyOn(populationStore, "fetchPopulation")
    const wrapper = mount(PrefecturesVue, {
      data: () => ({
        prefectures,
        populationStore,
      }),
    })
    await wrapper.getComponent(PrefectureVue).vm.$emit("check", prefectures[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(prefectures[0])
  })
  test("チェックオフイベント", async () => {
    const populationStore = usePopulationStore()
    const prefectureStore = usePrefectureStore()
    // 県のモックデータ
    const prefectures: PrefectureDisplay[] = [
      {
        prefCode: 0,
        isCheck: false,
        prefName: "北海道",
      },
    ]
    prefectureStore.prefectures = prefectures

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    populationStore.disposePopulation = async (_: Prefecture) => {}
    const spy = vi.spyOn(populationStore, "disposePopulation")
    const wrapper = mount(PrefecturesVue, {
      data: () => ({
        prefectures,
        populationStore,
      }),
    })

    await wrapper.getComponent(PrefectureVue).vm.$emit("check", prefectures[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(prefectures[0])
  })
})
