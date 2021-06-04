<template>
  <div>
    <h1 class="my-0">都道府県</h1>
    <div class="checkbox-container">
      <div v-for="(pref, index) in prefData" :key="index">
        <input
          :id="index"
          v-model="selectedPrefCodes"
          :value="pref.prefCode"
          type="checkbox"
        />
        <label>{{ pref.prefName }}</label>
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
      this.setSelectedPrefCodes(this.selectedPrefCodes)
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
</style>
