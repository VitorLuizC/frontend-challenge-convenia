import { withLoad, isLoading } from '@/store/modules/Loading'
import {
  getBills,
  getBillById,
  resolvePaidStatus,
  sumItemsValues
} from '@/services/Bill'

const BILL_KEY = 'Bill/BILL'
const BILLS_KEY = 'Bill/BILLS'

const state = () => ({
  /**
   * @type {import('@/services/Bill').Bill | undefined}
   */
  bill: undefined,

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
    BILL: (state) => state.bill,

    BILLS: (state) => state.bills,

    LOADING_BILL: isLoading(BILL_KEY),

    LOADING_BILLS: isLoading(BILLS_KEY),

    ORDERS: (state) => {
      if (!state.bill) {
        return []
      }
      return resolvePaidStatus(state.bill)
    },

    PAID_TOTAL: (_, getters) => {
      const paidOrders = getters['ORDERS'].filter((order) => order.isPaid)
      return sumItemsValues(paidOrders)
    },

    UNPAID_ORDERS: (_, getters) => {
      return getters['ORDERS'].filter((order) => !order.isPaid)
    },

    UNPAID_TOTAL: (_, getters) => {
      return sumItemsValues(getters['UNPAID_ORDERS'])
    },

    TOTAL: (_, getters) => {
      return getters['PAID_TOTAL'] + getters['UNPAID_TOTAL']
    },

    TOTAL_WITH_GRATUITY: (_, getters, __, rootGetters) => (gratuityId) => {
      const gratuity = rootGetters['Gratuity/PERCENTAGE_OF'](gratuityId)
      return getters['UNPAID_TOTAL'] + getters['UNPAID_TOTAL'] * gratuity
    }
  },

  mutations: {
    SET_BILL: (state, bill) => {
      state.bill = bill
    },
    SET_BILLS: (state, bills) => {
      state.bills = bills
    }
  },

  actions: {
    GET_BILL: withLoad(BILL_KEY, async ({ commit }, id) => {
      commit('SET_BILL', await getBillById(id))
    }),
    GET_BILLS: withLoad(BILLS_KEY, async ({ commit }) => {
      commit('SET_BILLS', await getBills())
    })
  }
}

export default Gratuity
