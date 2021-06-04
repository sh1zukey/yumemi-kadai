# yumemi-kadai

## 主な使用フレームワーク、ライブラリ
- Nuxt.js
- express (serverMiddleware)
- highcharts

## ファイル構成
- pages/index.vue：トップページ
- components/PrefSelectArea.vue：都道府県選択のチェックボックス
- components/Chart.vue：グラフ本体
- assets/css/style.css：共通のスタイルが記述されたCSSファイル
- store/index.js：vuex store
- api/index.js：API、serverMiddleware機能を用いて動作

## 環境変数
- APIKEY：RESASのAPIキー
