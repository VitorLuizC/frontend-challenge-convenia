import { withLoad, isLoading } from '@/store/modules/Loading'
import { getBills, getBillById, sumPayments, sumOrders } from '@/services/Bill'

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

    PAID_TOTAL: (state) => {
      const payments = (state.bill && state.bill.payments) || []
      return sumPayments(payments)
    },

    TOTAL: (state) => {
      const orders = (state.bill && state.bill.orders) || []
      return sumOrders(orders)
    },

    TOTAL_WITH_GRATUITY: (_, getters, __, rootGetters) => (gratuityId) => {
      const gratuity = rootGetters['Gratuity/PERCENTAGE_OF'](gratuityId)
      return getters['TOTAL'] + getters['TOTAL'] * gratuity
    },

    UNPAID_TOTAL: (_, getters) => {
      return getters['TOTAL'] - getters['PAID_TOTAL']
    },

    UNPAID_TOTAL_WITH_GRATUITY: (_, getters) => (gratuityId) => {
      return getters['TOTAL_WITH_GRATUITY'](gratuityId) - getters['PAID_TOTAL']
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
