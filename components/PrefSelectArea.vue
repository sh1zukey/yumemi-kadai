<template>
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
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      selectedPrefCodes: [],
    }
  },
  computed: {
    ...mapState({
      prefData: (state) => state.prefData,
    }),
  },
  watch: {
    selectedPrefCodes() {
      this.setSelectedPrefCodes(this.selectedPrefCodes)
    },
  },
  methods: {
    ...mapMutations({
      setSelectedPrefCodes: 'setSelectedPrefCodes',
    }),
  },
}
</script>

<style>
.checkbox-container {
  display: grid;

  grid-auto-rows: 30px;
  grid-template-columns: repeat(auto-fit, 100px);
}
</style>
