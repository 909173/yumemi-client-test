import { mount } from "@vue/test-utils"
import { describe, test, expect, vi, afterEach } from "vitest"
import { reactive } from "vue"
import PrefecturesVue from "../../components/Prefectures.vue"
import PrefectureVue from "../../components/Prefectures/Prefecture.vue"
import prefectureStore, {
  prefectureStoreKey,
  PrefectureStoreType,
} from "../../store/prefecture"
import populationStore, {
  populationStoreKey,
  PopulationStoreType,
} from "../../store/population"
import { Prefecture, PrefectureDisplay } from "../../types/prefecture"
describe("Prefectures importテスト", () => {
  test("Prefectures import テスト", async () => {
    const cmp = await import("../../components/Prefectures.vue")
    expect(cmp).toBeDefined()
  })
})
describe("コンポーネント描画テスト", () => {
  test("初期描画テスト", () => {
    expect(PrefecturesVue).toBeTruthy()
    const wrapper = mount(PrefecturesVue, {
      global: {
        provide: {
          [prefectureStoreKey.valueOf()]: prefectureStore,
          [populationStoreKey.valueOf()]: populationStore,
        },
      },
    })
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
    const prefectureMock: PrefectureStoreType = {
      ...prefectureStore,
      state: reactive({
        prefectures,
      }),
    }
    const wrapper = mount(PrefecturesVue, {
      global: {
        provide: {
          [prefectureStoreKey.valueOf()]: prefectureMock,
          [populationStoreKey.valueOf()]: populationStore,
        },
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
    const prefectures: PrefectureDisplay[] = [
      {
        prefCode: 0,
        isCheck: true,
        prefName: "北海道",
      },
    ]
    const prefectureMock: PrefectureStoreType = {
      ...prefectureStore,
      state: reactive({
        prefectures,
      }),
    }
    const populationMock: PopulationStoreType = {
      ...populationStore,
      // 人口取得リクエストのイベントモック
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fetchPopulation: async (_: Prefecture) => {},
    }
    const spy = vi.spyOn(populationMock, "fetchPopulation")
    const wrapper = mount(PrefecturesVue, {
      global: {
        provide: {
          [prefectureStoreKey.valueOf()]: prefectureMock,
          [populationStoreKey.valueOf()]: populationMock,
        },
      },
    })
    await wrapper.getComponent(PrefectureVue).vm.$emit("check", prefectures[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(prefectures[0])
  })
  test("チェックオフイベント", async () => {
    // 県のモックデータ
    const prefectures: PrefectureDisplay[] = [
      {
        prefCode: 0,
        isCheck: false,
        prefName: "北海道",
      },
    ]
    const prefectureMock: PrefectureStoreType = {
      ...prefectureStore,
      state: reactive({
        prefectures,
      }),
    }
    const populationMock: PopulationStoreType = {
      ...populationStore,
      // 人口取得リクエストのイベントモック
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      disposePopulation: async (_: Prefecture) => {},
    }
    const spy = vi.spyOn(populationMock, "disposePopulation")
    const wrapper = mount(PrefecturesVue, {
      global: {
        provide: {
          [prefectureStoreKey.valueOf()]: prefectureMock,
          [populationStoreKey.valueOf()]: populationMock,
        },
      },
    })
    await wrapper.getComponent(PrefectureVue).vm.$emit("check", prefectures[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(prefectures[0])
  })
})

describe("ストアロード失敗", () => {
  test("prefectureStoreロード失敗テスト", () => {
    expect(() => mount(PrefecturesVue)).toThrowError(
      "prefecture store not found"
    )
  })
  test("populationStoreロード失敗テスト", () => {
    expect(() =>
      mount(PrefecturesVue, {
        global: {
          provide: {
            [prefectureStoreKey.valueOf()]: prefectureStore,
          },
        },
      })
    ).toThrowError("population store not")
  })
})
