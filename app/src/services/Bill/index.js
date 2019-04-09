/**
 * @typedef {{ id: string, name: string }} BillListItem
 */

/**
 * Get a list of open bills from an API.
 * @returns {Promise<BillListItem[]>}
 */
export const getBills = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      id: '1',
      name: 'Mesa 1'
    },
    {
      id: '2',
      name: 'Mesa 2'
    }
  ]
}

/**
 * @typedef Order
 * @property {string} id
 * @property {string} name
 * @property {number} value
 */

/**
 * @typedef PaymentPerOrders
 * @property {string} id
 * @property {'PerOrders'} type
 * @property {number} value
 * @property {string[]} orders
 * @property {string} gratuity
 */

/**
 * @typedef PaymentPerValue
 * @property {string} id
 * @property {'PerValue'} type
 * @property {number} value
 * @property {string} gratuity
 */

/**
 * @typedef {PaymentPerOrders|PaymentPerValue} Payment
 */

/**
 * @typedef Bill
 * @property {string} id
 * @property {string} name
 * @property {Order[]} orders
 * @property {Payment[]} payments
 */

/**
 * Get bill details by its id from an API.
 * @param {string} id
 * @returns {Promise<Bill>}
 */
export const getBillById = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    id: '1',
    name: 'Mesa 1',
    orders: [
      {
        id: '1',
        name: 'Coca-Cola Lata 350ml',
        value: 5
      },
      {
        id: '2',
        name: 'Cheeseburger',
        value: 18
      },
      {
        id: '1',
        name: 'Coca-Cola Lata 350ml',
        value: 5
      }
    ],
    payments: [
      {
        id: '1',
        type: 'PerOrders',
        value: 5.5,
        orders: ['1'],
        gratuity: '1'
      }
    ]
  }
}

/**
 * It resolves paid status based on paid orders in payments.
 * @param {Bill} bill
 * @returns {(Order & { isPaid: boolean })[]}
 */
export const resolvePaidStatus = (bill) => {
  const paidOrdersIds = bill.payments
    .filter((payment) => payment.type === 'PerOrders')
    .map((payment) => payment.orders || [])
    .flat()

  return bill.orders.map((order) => {
    const index = paidOrdersIds.indexOf(order.id)
    if (index !== -1) {
      paidOrdersIds.splice(index, 1)
    }

    return {
      ...order,
      isPaid: index !== -1
    }
  })
}

/**
 * Sum items values.
 * @param {{ value: number }[]} items
 * @returns {number}
 */
export const sumItemsValues = (items) =>
  items.reduce((sum, item) => sum + item.value, 0)
