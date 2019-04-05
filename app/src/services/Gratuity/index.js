/**
 * @typedef Gratuity
 * @property {string} id
 * @property {string} name
 * @property {number} percentage
 */

/**
 * Get a list of gratuities from an API.
 * @returns {Promise<Gratuity[]>}
 */
export const getGratuities = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      id: '1',
      name: 'Gorjeta de 10%',
      percentage: 0.1
    },
    {
      id: '2',
      name: 'Gorjeta de 12%',
      percentage: 0.12
    },
    {
      id: '3',
      name: 'Gorjeta de 18%',
      percentage: 0.18
    },
    {
      id: '4',
      name: 'Nenhuma gorjeta',
      percentage: 0
    }
  ]
}

/**
 * Transform gratuity to option object.
 * @param {Gratuity} gratuity
 * @returns {{ label: string, value: string }}
 */
export const toOption = (gratuity) => ({
  label: gratuity.name,
  value: gratuity.id
})
