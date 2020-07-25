import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const createStore = () => {
  return new Vuex.Store({
    state() {
      return {
        message: 'count number.',
        counter: 0,
      }
    },
    mutations: {
      doit(state) {
        const n = Math.floor(Math.random() * 10)
        state.counter += n
        state.message = 'add ' + n + '.'
      },
      reset(state) {
        state.counter = 0
        state.message = 'reset now.'
      },
    },
    plugins: [createPersistedState()],
  })
}

export default createStore
