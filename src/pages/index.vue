<template>
  <div class="container">
    <div>
      <h1>{{ title }}</h1>
      <p>{{ $store.state.message }}</p>
      <hr />
      <div class="link" @click="$store.commit('doit')">
        <a @click.stop="$store.commit('reset')">
          clicked: {{ $store.state.counter }}
        </a>
      </div>
    </div>
    <div>
      <nuxt-link to="/memo">メモアプリ</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
      message: 'this is message.',
    }
  },
  methods: {
    doAction() {
      this.$store.state.counter++
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.link {
  margin: 20px;
  padding: 10px;
  background: #eee;
}
</style>
