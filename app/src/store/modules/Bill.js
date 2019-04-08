import { withLoad } from '@/store/modules/Loading'
import { getBills } from '@/services/Bill'

const BILL_KEY = 'Bill/BILL'
const BILLS_KEY = 'Bill/BILLS'

const state = () => ({
  /**
   * @type {import('@/services/Bill').BillListItem[]}
   */
  bills: []
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
    BILLS: (state) => state.bills,
    LOADING_BILL: (_, __, ___, rootGetters) =>
      rootGetters['Loading/IS_LOADING'](BILL_KEY),
    LOADING_BILLS: (_, __, ___, rootGetters) =>
      rootGetters['Loading/IS_LOADING'](BILLS_KEY)
  },

  mutations: {
    SET_BILLS: (state, bills) => {
      state.bills = bills
    }
  },

  actions: {
    GET_BILLS: withLoad(BILLS_KEY, async ({ commit }) => {
      commit('SET_BILLS', await getBills())
    })
  }
}

export default Gratuity
