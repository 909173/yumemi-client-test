import { mount } from "@vue/test-utils"
import { test, expect, describe } from "vitest"
import HeaderContainer from "../../components/HeaderContainer.vue"

describe("importテスト", () => {
  test("ヘッダーコンポーネントimportテスト", async () => {
    const cmp = await import("../../components/HeaderContainer.vue")
    expect(cmp).toBeDefined()
  })
})
describe("コンポーネント描画テスト", () => {
  test("ヘッダー初期表示", () => {
    expect(HeaderContainer).toBeTruthy()
    const wrapper = mount(HeaderContainer, {})
    expect(wrapper.text()).toEqual("Title")
    expect(wrapper.get("header")).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
