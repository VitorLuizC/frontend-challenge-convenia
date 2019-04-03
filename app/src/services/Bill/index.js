/**
 * Get a list of open bills from an API.
 * @returns {Promise<{ id: string, name: string }[]>}
 */
export const getOpenBills = async () => {
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
 * @property {string} observation
 */

/**
 * @typedef Gratuity
 * @property {string} name
 * @property {number} percentage
 */

/**
 * @typedef PaymentPerOrders
 * @property {string} id
 * @property {'PerOrders'} type
 * @property {number} value
 * @property {Order[]} orders
 * @property {Gratuity} gratuity
 */

/**
 * @typedef PaymentPerValue
 * @property {string} id
 * @property {'PerValue'} type
 * @property {number} value
 * @property {Gratuity} gratuity
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
      }
    ],
    payments: []
  }
}
