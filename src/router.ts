import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import indexVue from "./pages/index.vue"
import ExcludePrefectureVue from "./pages/ExcludePrefecture.vue"
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: indexVue,
  },
  {
    path: "/exclude-prefectures",
    component: ExcludePrefectureVue,
  },
]
export default createRouter({
  history: createWebHistory(),
  routes,
})
