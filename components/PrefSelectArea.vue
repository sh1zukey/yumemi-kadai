<template>
  <div>
    <h1 class="my-0">都道府県</h1>
    <div class="checkbox-container">
      <div v-for="(pref, index) in prefData" :key="index" class="checkbox">
        <label
          ><input
            :id="index"
            v-model="selectedPrefCodes"
            :value="pref.prefCode"
            type="checkbox"
          />{{ pref.prefName }}</label
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      selectedPrefCodes: [],
    }
  },
  computed: {
    ...mapGetters({
      prefData: 'prefData',
    }),
  },
  watch: {
    selectedPrefCodes() {
      this.debouncedUpdateChart()
    },
  },
  created() {
    // lodashのdebounce機能を用いて処理回数を間引きする
    const debounce = require('lodash.debounce')
    this.debouncedUpdateChart = debounce(function () {
      this.updateChart()
    }, 500)
  },
  methods: {
    updateChart() {
      // 選択された都道府県の一覧をstoreに反映する
      this.setSelectedPrefCodes(this.selectedPrefCodes)
      // 都道府県ごとの人口データを取得する
      this.updatePrefPopulationData()
    },
    ...mapMutations({
      setSelectedPrefCodes: 'setSelectedPrefCodes',
    }),
    ...mapActions({
      updatePrefPopulationData: 'updatePrefPopulationData',
    }),
  },
}
</script>

<style scoped>
.checkbox-container {
  display: grid;

  grid-auto-rows: 28px;
  grid-template-columns: repeat(auto-fit, 90px);
}

.checkbox input {
  margin-right: 0.1rem;
}
</style>
