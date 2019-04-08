const state = () => ({
  /**
   * @type {Record<string, 'LOADING'|'LOADED'>}
   */
  statuses: {}
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
    IS_UNSET: (state) => (key) => !state.statuses[key],

    /**
     * @param {State} state
     * @returns {(key: string) => boolean}
     */
    IS_LOADED: (state) => (key) => state.statuses[key] === 'LOADED',

    /**
     * @param {State} state
     * @returns {(key: string) => boolean}
     */
    IS_LOADING: (state) => (key) => state.statuses[key] === 'LOADING'
  },

  mutations: {
    /**
     * @param {State} state
     * @param {string} key
     */
    UNSET: (state, key) => {
      state.statuses = {
        ...state.statuses,
        [key]: undefined
      }
    },

    /**
     * @param {State} state
     * @param {string} key
     */
    START: (state, key) => {
      state.statuses = {
        ...state.statuses,
        [key]: 'LOADING'
      }
    },

    /**
     * @param {State} state
     * @param {string} key
     */
    FINISH: (state, key) => {
      state.statuses = {
        ...state.statuses,
        [key]: 'LOADED'
      }
    }
  },

  actions: {
    UNSET: ({ commit }, key) => commit('UNSET', key),

    LOAD: async ({ commit }, { key, handler = () => {} }) => {
      commit('START', key)
      try {
        const value = await handler()
        commit('FINISH', key)
        return Promise.resolve(value)
      } catch (reason) {
        commit('FINISH', key)
        return Promise.reject(reason)
      }
    }
  }
}

export default Loading
