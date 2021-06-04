export const state = () => ({
  // 都道府県データ
  prefData: [],
  // 現在選択している都道府県
  selectedPrefCodes: [],
  // 都道府県ごとの人口数データ
  prefPopulationData: {},
  // 描画する都道府県
  drawPrefCodes: [],
})

export const getters = {
  prefData: (state) => {
    return state.prefData
  },
  selectedPrefCodes: (state) => {
    return state.selectedPrefCodes
  },
  prefPopulationData: (state) => {
    return state.prefPopulationData
  },
  drawPrefCodes: (state) => {
    return state.drawPrefCodes
  },
}

export const mutations = {
  setPrefs(state, prefData) {
    state.prefData = prefData
  },
  setSelectedPrefCodes(state, selectedPrefCodes) {
    state.selectedPrefCodes = selectedPrefCodes
  },
  setPrefPopulationData(state, prefPopulationData) {
    state.prefPopulationData = prefPopulationData
  },
  setDrawPrefCodes(state, drawPrefCodes) {
    state.drawPrefCodes = drawPrefCodes
  },
}

export const actions = {
  // 都道府県データを取得する
  async initPrefs({ commit }) {
    const response = await this.$axios
      .get('/api/prefectures')
      .then((response) => response)
      .catch((error) => error.response)

    if (response.status === 200) {
      commit('setPrefs', response.data)
    }
  },
  // 選択された都道府県データを取得する
  // 尚取得済みのデータは再取得しない
  async updatePrefPopulationData({ state, commit }) {
    const prefPopulationData = state.prefPopulationData
    const selectedPrefCodes = state.selectedPrefCodes
    const promises = []

    selectedPrefCodes.forEach((prefCode) => {
      if (!prefPopulationData[String(prefCode)]) {
        promises.push(this.$axios.get('/api/population/' + prefCode))
      }
    })

    const responses = await Promise.all(promises)
      .then((responses) => responses)
      .catch((error) => error.response)

    responses.forEach((response) => {
      const prefCode = response.config.url.split('/').slice(-1)[0]
      prefPopulationData[String(prefCode)] = response.data
    })
    commit('setPrefPopulationData', prefPopulationData)
    commit('setDrawPrefCodes', selectedPrefCodes)
  },
}
