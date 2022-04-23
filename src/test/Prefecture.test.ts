import { mount } from "@vue/test-utils"
import { describe, expect, test, vi } from "vitest"
import PrefectureVue from "../components/Prefectures/Prefecture.vue"
import { PrefectureDisplay } from "../types/prefecture"
describe("Prefecture Import テスト", () => {
  test("Prefecture import テスト", async () => {
    const cmp = await import("../components/Prefectures/Prefecture.vue")
    expect(cmp).toBeDefined()
  })
})

describe("コンポーネント描画テスト", () => {
  test("画面初期描画テスト", () => {
    const prefecture: PrefectureDisplay = {
      isCheck: false,
      prefCode: 0,
      prefName: "北海道",
    }
    expect(PrefectureVue).toBeTruthy()
    const wrapper = mount(PrefectureVue, {
      props: {
        prefecture,
      },
    })
    const checkboxIsChecked = wrapper.find("input").element.checked
    expect(wrapper.text()).toEqual(prefecture.prefName)
    expect(wrapper.html()).toMatchSnapshot()
    expect(checkboxIsChecked).toEqual(false)
  })
  test("画面病がテスト(チェックボックスチェック)", () => {
    const isCheck = true
    const prefecture: PrefectureDisplay = {
      isCheck,
      prefCode: 0,
      prefName: "北海道",
    }
    const wrapper = mount(PrefectureVue, {
      props: {
        prefecture,
      },
    })
    const checkboxIsChecked = wrapper.find("input").element.checked
    expect(checkboxIsChecked).toEqual(isCheck)
  })
})
