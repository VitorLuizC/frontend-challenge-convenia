import { getGratuities, toOption } from '@/services/Gratuity'
import { withLoad, isLoading } from '@/store/modules/Loading'

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
    LOADING: isLoading(KEY),

    OPTIONS: (state) => state.gratuities.map(toOption),

    GRATUITIES: (state) => state.gratuities
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
