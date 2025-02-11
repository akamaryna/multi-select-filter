export const getProductGroups = async () => {
  try {
    const response = await fetch('src/assets/items.json')
    const { data } = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching filter options:', error)
    return []
  }
}
