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
        subtitle: {
          text: 'Source: RESAS - 地域経済分析システム',
        },
        xAxis: {
          title: {
            text: '年度',
          },
          categories: [], // 横軸
          crosshair: true,
        },
        yAxis: {
          title: {
            text: '人口数',
          },
          labels: {
            format: '{value}',
          },
          opposite: true,
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
            enableMouseTracking: false,
          },
        },
        series: [], // データ本体
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
          const xAxis = this.prefPopulationData[
            String(this.selectedPrefCodes[0])
          ].map((data) => {
            return data.year
          })

          // グラフ表示用のデータを作る
          const seriesData = []
          this.selectedPrefCodes.forEach((prefCode) => {
            const value = this.prefPopulationData[String(prefCode)].map(
              (data) => {
                return data.value
              }
            )

            const prefData = this.prefData.find(
              (pref) => pref.prefCode === Number(prefCode)
            )
            seriesData.push({ name: prefData.prefName, data: value })
          })

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
