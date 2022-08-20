# Vite + Vue + TypeScript 人口グラフ表示アプリケーション

## アプリ概要

RESAS APIを用いた県ごとの人口推移グラフを表示するアプリケーション

## 試験概要

[ゆめみ フロントエンドコーディング試験](https://notion.yumemi.co.jp/0e9ef27b55704d7882aab55cc86c999d)

## 選択技術

- ビルド: Vite
- フロントエンドフレームワーク: Vue3
- テストツール: Vitest
- APIリクエスト: Axios
- Linter: Prettier + ESLint + EditorConfig
- デプロイ先: Netlify
  - ミドルウェアサーバー: Netlify Lambda
- CSSフレームワーク: なし
- グラフ表示: C3.js
## 実行方法

```cmd
npm install
npm run dev 
```
### envについて

.env.exampleを参考に.envファイルにRESASのAPIキーをセットしてください。