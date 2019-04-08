import { getGratuities, toOption } from '@/services/Gratuity'
import { withLoad } from '@/store/modules/Loading'

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
    GET_GRATUITIES: withLoad(KEY, async ({ commit }) => {
      commit('SET_GRATUITIES', await getGratuities())
    })
  }
}

export default Gratuity
