import { AxiosResponse } from "axios"
import { ChartAPI } from "c3"
import { afterEach, describe, expect, test, vi } from "vitest"
import populationStore from "../../store/population"
import { PopulationResponse } from "../../types/api"
import { PopulationDisplay } from "../../types/population"
import { Prefecture } from "../../types/prefecture"
import axiosInstance from "../../util/axiosSettings"
// import axiosInstance from  "../../util/axiosSettings"
afterEach(() => {
  populationStore.clearState()
  vi.clearAllMocks()
})
describe("clearState テスト", () => {
  test("正常テスト", () => {
    const population: PopulationDisplay[] = [
      {
        data: [],
        prefCode: 0,
        prefName: "北海道",
      },
    ]
    const c3graphData = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      load: (_: { columns: [string, ...any[]] }) => {},
    } as ChartAPI
    populationStore.setGraph(c3graphData)
    populationStore.setPopulation(population)
    expect(populationStore.state).toEqual({
      c3graphData,
      population,
    })
    populationStore.clearState()
    expect(populationStore.state).toEqual({
      c3GraphData: undefined,
      population: [],
    })
  })
})
describe("setPopulation テスト", () => {
  const newPopulations: PopulationDisplay[] = [
    {
      data: [],
      prefCode: 0,
      prefName: "北海道",
    },
  ]
  test.each([[newPopulations], [[]]])("正常テスト", (arg) => {
    populationStore.setPopulation(arg)
    expect(populationStore.state.population).toEqual(arg)
  })
})

describe("setGraph テスト", () => {
  test("正常テスト", () => {
    const newC3Graph: ChartAPI = {
      data: {},
    } as ChartAPI // FIXME: c3jsのgenerateがjsdom, happy-domで呼び出せないため
    populationStore.setGraph(newC3Graph)
    expect(populationStore.state.c3graphData).toEqual(newC3Graph)
  })
})

describe("addPopulation テスト", () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  const newPopulation: PopulationDisplay = {
    data: [
      {
        value: 11,
        year: 2021,
      },
    ],
    prefCode: 0,
    prefName: "北海道",
  }
  test("正常テスト", () => {
    const c3Graph = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      load: (_: { columns: [string, ...any[]] }) => {},
    } as ChartAPI
    const spy = vi.spyOn(c3Graph, "load")
    populationStore.setGraph(c3Graph)
    populationStore.addPopulation(newPopulation)
    expect(populationStore.state.population).toEqual([newPopulation])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      columns: [
        ["year", ...newPopulation.data.map((x) => `${x.year}`)],
        [
          `${newPopulation.prefName}`,
          ...newPopulation.data.map((x) => x.value),
        ],
      ],
    })
  })
  test("c3データ非存在", () => {
    const c3Graph = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      load: (_: { columns: [string, ...any[]] }) => {},
    } as ChartAPI
    const spy = vi.spyOn(c3Graph, "load")
    expect(() => populationStore.addPopulation(newPopulation)).toThrowError(
      "graph data is not initialized"
    )
    expect(spy).toHaveBeenCalledTimes(0)
  })
})

describe("disposePopulation テスト", () => {
  test("正常系テスト", () => {
    const c3Graph: ChartAPI = {
      data: {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      unload: (_: string[]) => {},
    } as ChartAPI
    const spy = vi.spyOn(c3Graph, "unload")
    populationStore.setGraph(c3Graph)
    const population: PopulationDisplay[] = [
      {
        data: [],
        prefCode: 0,
        prefName: "北海道",
      },
    ]
    populationStore.setPopulation(population)
    populationStore.disposePopulation(population[0])
    expect(populationStore.state.population).toEqual([])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([population[0].prefName])
  })
  test("グラフデータ非初期化", () => {
    const population: PopulationDisplay[] = [
      {
        data: [],
        prefCode: 0,
        prefName: "北海道",
      },
    ]
    populationStore.setPopulation(population)
    expect(() => populationStore.disposePopulation(population[0])).toThrowError(
      "graph data is not initialized"
    )
  })
})

describe("人口取得イベントテスト", () => {
  test("正常系", async () => {
    const axiosInstanceMock = axiosInstance
    const populationResponse: PopulationResponse = {
      message: "message",
      result: {
        boundaryYear: 2022,
        data: [
          {
            label: "総人口",
            data: [
              {
                value: 200,
                year: 2022,
              },
            ],
          },
        ],
      },
    }
    axiosInstanceMock.get = vi.fn().mockResolvedValue({
      status: 200,
      data: populationResponse,
    } as AxiosResponse<PopulationResponse>)
    const c3Graph = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      load: (_: { columns: [string, ...any[]] }) => {},
    } as ChartAPI
    populationStore.setGraph(c3Graph)
    const pref: Prefecture = {
      prefCode: 0,
      prefName: "北海道",
    }
    await populationStore.fetchPopulation(pref)
    expect(axiosInstanceMock.get).toHaveBeenCalledWith(
      "population/composition/perYear",
      {
        params: {
          prefCode: pref.prefCode,
        },
      }
    )
  })
  test("総人口なし", async () => {
    const axiosInstanceMock = axiosInstance
    const populationResponse: PopulationResponse = {
      message: "message",
      result: {
        boundaryYear: 2022,
        data: [
          {
            label: "生産年齢人口",
            data: [
              {
                value: 200,
                year: 2022,
              },
            ],
          },
        ],
      },
    }
    axiosInstanceMock.get = vi.fn().mockResolvedValue({
      status: 200,
      data: populationResponse,
    } as AxiosResponse<PopulationResponse>)
    const c3Graph = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      load: (_: { columns: [string, ...any[]] }) => {},
    } as ChartAPI
    populationStore.setGraph(c3Graph)
    const pref: Prefecture = {
      prefCode: 0,
      prefName: "北海道",
    }
    const promiseFunc = populationStore.fetchPopulation(pref)
    await expect(promiseFunc).rejects.toThrow("total population data not found")
  })
})
