import { APIGatewayProxyHandler } from "aws-lambda"
import { config } from "dotenv"
import { PrefectureResponse } from "./types/api"
import axiosInstance from "./util/axiosSettings"
config()
export const handler: APIGatewayProxyHandler = (_, __, callback) => {
  axiosInstance
    .get<PrefectureResponse>("prefectures")
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
    .catch((err) => callback(err))
}
