import { withLoad, isLoading } from '@/store/modules/Loading'
import { getBills, getBillById } from '@/services/Bill'

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
 * Sum items values.
 * @param {{ value: number }[]} items
 * @returns {number}
 */
const sumItemsValues = (items) =>
  items.reduce((sum, item) => sum + item.value, 0)

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
      const orders = (state.bill && state.bill.orders) || []
      const payments = (state.bill && state.bill.payments) || []

      const paidOrdersIds = payments
        .filter((payment) => payment.type === 'PerOrders')
        .map((payment) => payment.orders || [])
        .flat()

      return orders.map((order) => {
        const index = paidOrdersIds.indexOf(order.id)
        if (index !== -1) {
          paidOrdersIds.splice(index, 1)
        }

        return {
          ...order,
          isPaid: index !== -1
        }
      })
    },

    PAID_TOTAL: (_, getters) => {
      const paidOrders = getters['ORDERS'].filter((order) => order.isPaid)
      return sumItemsValues(paidOrders)
    },

    UNPAID_ORDERS: (_, getters) => {
      return getters['ORDERS'].filter((order) => !order.isPaid)
    },

    UNPAID_OPTIONS: (_, getters) => {
      return getters['UNPAID_ORDERS'].map((order) => ({
        value: order.id,
        label: order.name
      }))
    },

    UNPAID_TOTAL: (_, getters) => {
      return sumItemsValues(getters['UNPAID_ORDERS'])
    },

    TOTAL: (_, getters) => {
      return getters['PAID_TOTAL'] + getters['UNPAID_TOTAL']
    },

    TOTAL_WITH_GRATUITY: (_, getters, rootGetters) => (gratuityId) => {
      const gratuity = rootGetters['Gratuity/PERCENTAGE_OF'](gratuityId)
      return getters['TOTAL'] + getters['UNPAID_TOTAL'] * gratuity
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
