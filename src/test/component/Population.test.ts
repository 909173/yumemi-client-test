import { mount } from "@vue/test-utils"
import { afterEach, describe, expect, test, vi } from "vitest"
import { ChartConfiguration } from "c3"
import PopulationVue from "../../components/Population.vue"
import populationStore, { populationStoreKey } from "../../store/population"
// c3jsのwindow.SVGPathElementがjsdom, happy-dom環境では存在しないプロパティでエラーを吐くのでc3関連はmockする

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
    const wrapper = mount(PopulationVue, {
      global: {
        provide: {
          [populationStoreKey.valueOf()]: populationStore,
        },
      },
    })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.text()).toEqual("")
    expect(wrapper.find("div").element.id).toEqual("c3-graph")
  })
})

describe("グラフデータセットイベント", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  test("グラフデータセットテスト", () => {
    // const populationMock: PopulationStoreType = {
    //   ...populationStore,
    //   // eslint-disable-next-line @typescript-eslint/no-empty-function
    //   setGraph: (_: ChartAPI) => {},
    // }
    const spy = vi.spyOn(populationStore, "setGraph")
    const wrapper = mount(PopulationVue, {
      global: {
        provide: {
          [populationStoreKey.valueOf()]: populationStore,
        },
      },
    })
    console.log(wrapper.vm)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(populationStore.state.c3graphData)
  })
})

describe("ストアロード失敗", () => {
  test("populationStoreロード失敗", () => {
    expect(() => mount(PopulationVue)).toThrowError(
      "population store not found"
    )
  })
})
