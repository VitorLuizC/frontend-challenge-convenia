/**
 * @typedef {{ id: string, name: string }} BillListItem
 */

/**
 * Get a list of open bills from an API.
 * @returns {Promise<BillListItem[]>}
 */
export const getBills = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const { default: bills } = await import('@/services/Bill/data.json')

  return bills.map((bill) => ({
    id: bill.id,
    name: bill.table.name
  }))
}

/**
 * @typedef Order
 * @property {string} id
 * @property {string} name
 * @property {number} value
 */

/**
 * @typedef Payment
 * @property {string} id
 * @property {number} value
 * @property {number} paidAt
 */

/**
 * @typedef Bill
 * @property {string} id
 * @property {string} name
 * @property {Order[]} orders
 * @property {Payment[]} payments
 * @property {import('@/services/Gratuity').Gratuity} gratuity
 */

/**
 * Get bill details by its id from an API.
 * @param {string} id
 * @returns {Promise<Bill>}
 */
export const getBillById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { default: bills } = await import('@/services/Bill/data.json')

  return bills.find((bill) => bill.id === id)
}

/**
 * Sum orders values.
 * @param {Order[]} orders
 * @returns {number}
 */
export const sumOrders = (orders) =>
  orders.reduce((sum, order) => sum + order.value, 0)

/**
 * Sum payments values.
 * @param {Payment[]} payments
 * @returns {number}
 */
export const sumPayments = sumOrders
