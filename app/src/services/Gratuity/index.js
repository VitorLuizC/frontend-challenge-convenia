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

  const { default: gratuities } = await import('@/services/Gratuity/data.json')

  return gratuities
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
