import { getGratuities, toOption } from '@/services/Gratuity'

const state = () => ({
  /**
   * @type {import('@/services/Gratuity').Gratuity[]}
   */
  gratuities: [],
  isLoaded: false
})

/**
 * @typedef {ReturnType<typeof state>} State
 */

/**
 * @type {import('vuex').Module<State, any>}
 */
const Gratuity = {
  namespaced: true,

  state,

  getters: {
    LOADING: (state) => !state.isLoaded,

    OPTIONS: (state) => state.gratuities.map(toOption),

    /**
     * @param {State} state
     * @returns {(id: string) => number}
     */
    PERCENTAGE_OF: (state) => (id) => {
      const gratuity = state.gratuities.find((gratuity) => gratuity.id === id)
      if (!gratuity) {
        throw new Error(`Can't find gratuity of ID "${id}".`)
      }
      return gratuity.percentage
    }
  },

  mutations: {
    /**
     * @param {State} state
     * @param {import('@/services/Gratuity').Gratuity[]} gratuities
     */
    SET_GRATUITIES: (state, gratuities) => {
      state.gratuities = gratuities
    },
    SET_LOADED: (state) => {
      state.isLoaded = true
    }
  },

  actions: {
    GET_GRATUITIES: async ({ commit, state }) => {
      // It'll be loaded just one time!
      if (state.isLoaded) {
        return
      }

      commit('SET_GRATUITIES', await getGratuities())
      commit('SET_LOADED')
    }
  }
}

export default Gratuity
