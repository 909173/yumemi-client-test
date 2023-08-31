import { mount } from "@vue/test-utils"
import { createPinia, setActivePinia } from "pinia"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { ChartConfiguration } from "c3"
import PopulationVue from "../../components/Population.vue"
import { usePopulationStore } from "../../store/population"
// c3jsのwindow.SVGPathElementがjsdom, happy-dom環境では存在しないプロパティでエラーを吐くのでc3関連はmockする

beforeEach(() => {
  setActivePinia(createPinia())
})

describe("Population importテスト", () => {
  // c3のMock
  vi.mock("c3", () => {
    return {
      generate: vi.fn((arg: ChartConfiguration) => arg),
    }
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  test("population importテスト", async () => {
    const cmp = await import("../../components/Population.vue")
    expect(cmp).toBeDefined()
  })
})

describe("コンポーネント描画テスト", () => {
  test("初期描画テスト", () => {
    expect(PopulationVue).toBeTruthy()
    const populationStore = usePopulationStore()
    const wrapper = mount(PopulationVue, {
      data: () => ({
        populationStore,
      }),
    })
    // expect(wrapper).toMatchSnapshot()
    expect(wrapper.text()).toEqual("")
    expect(wrapper.find("div").element.id).toEqual("c3-graph")
  })
})

describe("グラフデータセットイベント", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  test("グラフデータセットテスト", () => {
    const populationStore = usePopulationStore()

    mount(PopulationVue)

    const initializedC3GraphData = populationStore.c3graphData as any
    expect(initializedC3GraphData.bindto).toEqual("#c3-graph")
    expect(initializedC3GraphData.data.x).toEqual("year")
    expect(initializedC3GraphData.data.xFormat).toEqual("%Y")
  })
})
