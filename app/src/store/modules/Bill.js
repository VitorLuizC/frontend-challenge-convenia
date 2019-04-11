import uuid from 'uuid/v1'
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
      const sum = sumOrders((state.bill && state.bill.orders) || [])
      const gratuity = (state.bill && state.bill.gratuity.percentage) || 0
      return sum + sum * gratuity
    },

    UNPAID_TOTAL: (_, getters) => {
      return getters['TOTAL'] - getters['PAID_TOTAL']
    }
  },

  mutations: {
    SET_BILL: (state, bill) => {
      state.bill = bill
    },
    SET_BILLS: (state, bills) => {
      state.bills = bills
    },
    SET_GRATUITY: (state, gratuity) => {
      state.bill = {
        ...state.bill,
        gratuity
      }
    },
    SET_PAYMENT: (state, payment) => {
      state.bill = {
        ...state.bill,
        payments: [...state.bill.payments, payment]
      }
    }
  },

  actions: {
    SET_GRATUITY: withLoad(
      BILL_KEY,
      async ({ commit, rootGetters }, gratuityID) => {
        const gratuities = rootGetters['Gratuity/GRATUITIES'] || []
        const gratuity = gratuities.find(
          (gratuity) => gratuity.id === gratuityID
        )
        if (!gratuity) {
          throw new Error(`Can't find gratuity of ID "${gratuityID}".`)
        }
        commit('SET_GRATUITY', gratuity)
      }
    ),
    SET_PAYMENT: withLoad(BILL_KEY, async ({ commit }, value) => {
      commit('SET_PAYMENT', {
        id: uuid(),
        value,
        paidAt: Date.now()
      })
    }),
    GET_BILL: withLoad(BILL_KEY, async ({ commit }, id) => {
      commit('SET_BILL', await getBillById(id))
    }),
    GET_BILLS: withLoad(BILLS_KEY, async ({ commit }) => {
      commit('SET_BILLS', await getBills())
    })
  }
}

export default Gratuity
