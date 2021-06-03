export const state = () => ({
  prefData: [],
  selectedPrefCodes: [],
  prefPopulationData: {},
  isLoading: false,
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
  isLoading: (state) => {
    return state.isLoading
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
  setLoading(state, isLoading) {
    state.isLoading = isLoading
  },
}

export const actions = {
  async initPrefs({ commit }) {
    const response = await this.$axios
      .get('/api/prefectures')
      .then((response) => response)
      .catch((error) => error.response)

    if (response.status === 200) {
      commit('setPrefs', response.data)
    }
  },
  async updatePrefPopulationData({ state, commit }) {
    const prefPopulationData = state.prefPopulationData
    const promises = []

    commit('setLoading', true)

    state.selectedPrefCodes.forEach((prefCode) => {
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
    commit('setLoading', false)
  },
}
