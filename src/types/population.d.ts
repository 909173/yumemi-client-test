import { Prefecture } from "./prefecture"

export type Population = {
  value: number
  year: number
}

export type PopulationDisplay = Prefecture & {
  data: Population[]
}
