const state = () => ({
  /**
   * @type {Record<string, number>}
   */
  states: {}
})

/**
 * @typedef {ReturnType<typeof state>} State
 */

/**
 * @type {import('vuex').Module<State, any>}
 */
const Loading = {
  namespaced: true,

  state,

  getters: {
    /**
     * @param {State} state
     * @returns {(key: string) => boolean}
     */
    IS_LOADED: (state) => (key) => state.states[key] === 0,

    /**
     * @param {State} state
     * @returns {(key: string) => boolean}
     */
    IS_LOADING: (state) => (key) => state.states[key] > 0
  },

  mutations: {
    /**
     * @param {State} state
     * @param {string} key
     */
    START: (state, key) => {
      const value = state.states[key]
      state.states = {
        ...state.states,
        [key]: value ? value + 1 : 1
      }
    },

    /**
     * @param {State} state
     * @param {string} key
     */
    FINISH: (state, key) => {
      const value = state.states[key]
      state.states = {
        ...state.states,
        [key]: value ? value - 1 : 0
      }
    }
  },

  actions: {
    START: ({ commit }, key) => commit('START', key),
    FINISH: ({ commit }, key) => commit('FINISH', key)
  }
}

/**
 * Decorate an action to causes loading states changes during its execution. It
 * set state as loading when function is init and unset on throws an error,
 * resolves or returns.
 * @param {string} key
 * @param {import('vuex').ActionHandler<any, any>} action
 * @returns {import('vuex').ActionHandler<any, any>}
 */
export const withLoad = (key, action) =>
  async function(context, payload) {
    const { dispatch } = context

    dispatch('Loading/START', key, { root: true })
    try {
      const value = await action.call(this, context, payload)
      dispatch('Loading/FINISH', key, { root: true })
      return Promise.resolve(value)
    } catch (reason) {
      dispatch('Loading/FINISH', key, { root: true })
      return Promise.reject(reason)
    }
  }

export default Loading
