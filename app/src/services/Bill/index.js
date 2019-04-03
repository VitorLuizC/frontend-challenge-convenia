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
