/**
 * @typedef Gratuity
 * @property {string} name
 * @property {number} percentage
 */

/**
 * Get a list of gratuities from an API.
 * @returns {Promise<Gratuity[]>}
 */
export const getGratuityList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      name: '10%',
      percentage: 0.1
    },
    {
      name: '12%',
      percentage: 0.12
    },
    {
      name: '18%',
      percentage: 0.18
    },
    {
      name: 'Nenhuma',
      percentage: 0
    }
  ]
}
