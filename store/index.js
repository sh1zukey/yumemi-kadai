export const state = () => ({
  prefData: [],
  selectedPrefCodes: [],
})

export const mutations = {
  setPrefs(state, prefData) {
    state.prefData = prefData
  },
  setSelectedPrefCodes(state, selectedPrefCodes) {
    state.selectedPrefCodes = selectedPrefCodes
  },
}

export const actions = {
  async initPrefs({ commit }) {
    const response = await this.$axios
      .get('/api/prefectures')
      .then((response) => response)
      .catch((err) => err.response)

    if (response.status === 200) {
      commit('setPrefs', response.data)
    }
  },
}
