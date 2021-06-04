<template>
  <div>
    <h1 class="mb-0">グラフ</h1>
    <highchart :options="populationChartOptions" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      populationChartOptions: {
        chart: {
          type: 'line',
        },
        title: {
          text: '人工推移',
        },
        xAxis: {
          title: {
            text: '年度',
          },
          categories: [],
          crosshair: true, // マウスを当てると線が出て、数値が分かりやすくなる
        },
        yAxis: {
          title: {
            text: '人口数',
          },
          labels: {
            format: '{value}', // y軸の目盛り幅が値によって動的に変わる
          },
          opposite: true, // 右側のy軸とする
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
            enableMouseTracking: false,
          },
        },
        series: [],
      },
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      prefData: 'prefData',
      selectedPrefCodes: 'selectedPrefCodes',
      prefPopulationData: 'prefPopulationData',
    }),
  },
  watch: {
    isLoading() {
      // ロード終了後か？
      if (!this.isLoading) {
        // チェックされている都道府県が0の場合は何も表示しない
        if (this.selectedPrefCodes.length === 0) {
          this.populationChartOptions.xAxis.categories = []
          this.populationChartOptions.series = []
        } else if (this.selectedPrefCodes.length > 0) {
          // 取得済みデータから実際に表示するデータを抽出する
          const showPrefData = {}
          this.selectedPrefCodes.forEach((prefCode) => {
            showPrefData[String(prefCode)] =
              this.prefPopulationData[String(prefCode)]
          })

          // すべてのデータで同一の可能性があるのでX軸の結合の実装はしない
          // let xAxis = []
          // for (const key in showPrefData) {
          //   const tempXAxis = showPrefData[key].map((data) => {
          //     return data.year
          //   })
          //   xAxis = xAxis.concat(tempXAxis)
          // }
          // console.log(xAxis)

          // 選択された一番最初の都道府県のyearをX軸にする
          const xAxis = showPrefData[this.selectedPrefCodes[0]].map((data) => {
            return data.year
          })

          // グラフ表示用のデータを作る
          const seriesData = []
          for (const key in showPrefData) {
            const data = showPrefData[key].map((data) => {
              return data.value
            })
            const prefData = this.prefData.find(
              (pref) => pref.prefCode === Number(key)
            )
            seriesData.push({ name: prefData.prefName, data })
          }

          // グラフに反映
          this.populationChartOptions.xAxis.categories = xAxis
          this.populationChartOptions.series = seriesData
        }
      }
    },
  },
}
</script>

<style scoped></style>
