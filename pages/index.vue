<template>
  <div>
    <header>
      <h1 class="mt-0">課題</h1>
    </header>
    <main>
      <div class="container">
        <PrefSelectArea></PrefSelectArea>
        <Chart></Chart>
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

<style>
header {
  width: 100%;
  background-color: #3b8070;

  text-align: center;
}

.container {
  width: 90%;

  margin-right: auto;
  margin-left: auto;
}

.mt-0 {
  margin-top: 0;
}
</style>
