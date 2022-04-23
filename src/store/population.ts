import { InjectionKey, reactive, readonly } from "vue"
import { ChartAPI } from "c3"
import { PopulationDisplay } from "../types/population"
import { Prefecture } from "../types/prefecture"
import axiosInstance from "../util/axiosSettings"
import { PopulationResponse } from "../types/api"

const state = reactive<{
  population: PopulationDisplay[]
  c3graphData?: ChartAPI
}>({
  population: [],
  c3graphData: undefined,
})

const setPopulation = (arg: PopulationDisplay[]) => (state.population = arg)
const setGraph = (arg: ChartAPI) => (state.c3graphData = arg)
const addPopulation = (arg: PopulationDisplay) => {
  try {
    state.population.push(arg)
    if (!state.c3graphData) throw new Error("graph data is not initialized")
    state.c3graphData.load({
      columns: [
        ["year", ...arg.data.map((x) => x.year)],
        [`${arg.prefName}`, ...arg.data.map((x) => x.value)],
      ],
    })
  } catch (err) {
    console.error(err)
  }
}
const disposePopulation = (arg: Prefecture) => {
  try {
    state.population = state.population.filter(
      (x) => x.prefCode !== arg.prefCode
    )
    if (!state.c3graphData) throw new Error("graph data is not initialized")
    state.c3graphData.unload([`${arg.prefName}`])
  } catch (err) {
    console.error(err)
  }
}

const fetchPopulation = async (arg: Prefecture) => {
  try {
    const response = await axiosInstance.get<PopulationResponse>(
      "population/composition/perYear",
      {
        params: {
          prefCode: arg.prefCode,
        },
      }
    )
    const totalPopulation = response.data.result.data.find(
      (x) => x.label === "総人口"
    )?.data
    if (!totalPopulation) throw new Error("total population data not found")
    addPopulation({
      ...arg,
      data: totalPopulation,
    })
  } catch (err) {
    console.log(err)
  }
}

const populationStore = {
  state: readonly(state),
  fetchPopulation,
  setPopulation,
  addPopulation,
  disposePopulation,
  setGraph,
}
export default populationStore
export const populationStoreKey: InjectionKey<typeof populationStore> =
  Symbol("population")
