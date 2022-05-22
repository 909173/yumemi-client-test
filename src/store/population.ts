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
const clearState = () => {
  state.c3graphData = undefined
  state.population = []
}
const setPopulation = (arg: PopulationDisplay[]) => (state.population = arg)
const setGraph = (arg: ChartAPI): void => {
  state.c3graphData = arg
}
const addPopulation = (arg: PopulationDisplay) => {
  state.population.push(arg)
  if (!state.c3graphData) throw new Error("graph data is not initialized")
  state.c3graphData.load({
    columns: [
      ["year", ...arg.data.map((x) => `${x.year}`)],
      [`${arg.prefName}`, ...arg.data.map((x) => x.value)],
    ],
  })
}
const disposePopulation = (arg: Prefecture) => {
  state.population = state.population.filter((x) => x.prefCode !== arg.prefCode)
  if (!state.c3graphData) throw new Error("graph data is not initialized")
  state.c3graphData.unload([`${arg.prefName}`])
}

const fetchPopulation = async (arg: Prefecture) => {
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
}

const populationStore = {
  state: readonly(state),
  fetchPopulation,
  setPopulation,
  addPopulation,
  disposePopulation,
  setGraph,
  clearState,
}
export default populationStore
export type PopulationStoreType = typeof populationStore
export const populationStoreKey: InjectionKey<PopulationStoreType> =
  Symbol("population")
