import { afterEach, describe, expect, test, vi } from "vitest"
import prefectureStore from "../../store/prefecture"
import { PrefectureResponse } from "../../types/api"
import { PrefectureDisplay } from "../../types/prefecture"
import axiosInstance from "../../util/axiosSettings"

afterEach(() => {
  prefectureStore.clearState()
  vi.clearAllMocks()
})

describe("clearStateテスト", () => {
  test("正常テスト", () => {
    const prefectures: PrefectureDisplay[] = [
      {
        isCheck: false,
        prefCode: 1,
        prefName: "北海道",
      },
    ]
    prefectureStore.setPrefectures(prefectures)
    expect(prefectureStore.state).toEqual({
      prefectures,
    })
    prefectureStore.clearState()
    expect(prefectureStore.state).toEqual({
      prefectures: [],
    })
  })
})

describe("setPrefectures テスト", () => {
  const prefectures: PrefectureDisplay[] = [
    {
      isCheck: false,
      prefCode: 1,
      prefName: "北海道",
    },
  ]
  test.each([[prefectures], [[]]])("正常テスト", (arg) => {
    prefectureStore.setPrefectures(arg)
    expect(prefectureStore.state).toEqual({
      prefectures: arg,
    })
  })
})

describe("changeCheckPrefecture テスト", () => {
  test("チェックON 正常系", () => {
    const targetPref: PrefectureDisplay = {
      isCheck: true,
      prefCode: 1,
      prefName: "北海道",
    }
    const nonTargetPref: PrefectureDisplay = {
      isCheck: true,
      prefCode: 2,
      prefName: "青森",
    }
    const pref = {
      prefCode: targetPref.prefCode,
      isCheck: false,
    }
    prefectureStore.setPrefectures([targetPref, nonTargetPref])
    prefectureStore.changeCheckPrefecture(pref)
    expect(prefectureStore.state.prefectures).toEqual([
      {
        ...targetPref,
        isCheck: false,
      },
      nonTargetPref,
    ])
  })
  test("チェックOFF 正常系", () => {
    const targetPref: PrefectureDisplay = {
      isCheck: false,
      prefCode: 1,
      prefName: "北海道",
    }
    const nonTargetPref: PrefectureDisplay = {
      isCheck: false,
      prefCode: 2,
      prefName: "青森",
    }
    const pref = {
      prefCode: targetPref.prefCode,
      isCheck: true,
    }
    prefectureStore.setPrefectures([targetPref, nonTargetPref])
    prefectureStore.changeCheckPrefecture(pref)
    expect(prefectureStore.state.prefectures).toEqual([
      {
        ...targetPref,
        isCheck: true,
      },
      nonTargetPref,
    ])
  })
  test("チェックON 異常系変更なし", () => {
    const targetPref: PrefectureDisplay = {
      isCheck: true,
      prefCode: 1,
      prefName: "北海道",
    }
    const nonTargetPref: PrefectureDisplay = {
      isCheck: true,
      prefCode: 2,
      prefName: "青森",
    }
    const pref = {
      prefCode: targetPref.prefCode,
      isCheck: true,
    }
    prefectureStore.setPrefectures([targetPref, nonTargetPref])
    prefectureStore.changeCheckPrefecture(pref)
    expect(prefectureStore.state.prefectures).toEqual([
      targetPref,
      nonTargetPref,
    ])
  })
  test("チェックOFF 異常系変更なし", () => {
    const targetPref: PrefectureDisplay = {
      isCheck: false,
      prefCode: 1,
      prefName: "北海道",
    }
    const nonTargetPref: PrefectureDisplay = {
      isCheck: false,
      prefCode: 2,
      prefName: "青森",
    }
    const pref = {
      prefCode: targetPref.prefCode,
      isCheck: false,
    }
    prefectureStore.setPrefectures([targetPref, nonTargetPref])
    prefectureStore.changeCheckPrefecture(pref)
    expect(prefectureStore.state.prefectures).toEqual([
      targetPref,
      nonTargetPref,
    ])
  })
})

describe("fetchPrefectureテスト", () => {
  test("正常系", async () => {
    const axiosInstanceMock = axiosInstance
    const prefectureResponse: PrefectureResponse = {
      message: "message",
      result: [
        {
          prefCode: 1,
          prefName: "北海道",
        },
      ],
    }
    axiosInstanceMock.get = vi.fn().mockResolvedValue({
      status: 200,
      data: prefectureResponse,
    })
    await prefectureStore.fetchPrefecture()
    expect(axiosInstanceMock.get).toHaveBeenCalledWith("/prefectures")
    expect(prefectureStore.state).toEqual({
      prefectures: prefectureResponse.result.map((x) => ({
        ...x,
        isCheck: false,
      })),
    })
  })
})
