import { APIGatewayProxyHandler } from "aws-lambda"
import { config } from "dotenv"
import { PopulationResponse } from "./types/api"
import axiosInstance from "./util/axiosSettings"
config()
export const handler: APIGatewayProxyHandler = (event, _, callback) => {
  const param = event.queryStringParameters
  const prefCode = param?.prefCode
  if (!prefCode) {
    callback(new Error("pref code is not set"))
    return
  }
  axiosInstance
    .get<PopulationResponse>("population/composition/perYear", {
      params: {
        prefCode: param.prefCode,
      },
    })
    .then((res) => {
      callback(null, {
        statusCode: 200,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(res.data),
      })
    })
    .catch((err) => {
      callback(err)
    })
}
