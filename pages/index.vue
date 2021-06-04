<template>
  <div>
    <header>
      <h1 class="my-0">課題</h1>
    </header>
    <main>
      <div class="container">
        <PrefSelectArea />
        <Chart />
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async fetch() {
    await this.initPrefs()
  },
  methods: {
    ...mapActions({
      initPrefs: 'initPrefs',
    }),
  },
}
</script>

<style scoped>
header {
  width: 100%;
  background-color: #70c9ba;

  margin-bottom: 1rem;

  text-align: center;
}

main .container {
  width: 90%;

  margin-right: auto;
  margin-left: auto;
}
</style>
