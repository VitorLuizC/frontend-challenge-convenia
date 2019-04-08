import { getGratuities, toOption } from '@/services/Gratuity'

const KEY = 'Gratuity'

const state = () => ({
  /**
   * @type {import('@/services/Gratuity').Gratuity[]}
   */
  gratuities: []
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
    LOADING: (_, __, ___, rootGetters) =>
      rootGetters['Loading/IS_LOADING'](KEY),

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
    }
  },

  actions: {
    GET_GRATUITIES: async ({ commit, rootGetters, dispatch }) => {
      // It'll be loaded just once!
      if (!rootGetters['Loading/IS_UNSET'](KEY)) {
        return
      }

      await dispatch(
        'Loading/LOAD',
        {
          key: KEY,
          async handler() {
            commit('SET_GRATUITIES', await getGratuities())
          }
        },
        { root: true }
      )
    }
  }
}

export default Gratuity
