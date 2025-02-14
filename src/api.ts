import type { FilterOption } from '@/types'

export const getProductGroups = async (): Promise<FilterOption[]> => {
  const response = await fetch('src/assets/items.json')
  const { data } = await response.json()
  return data
}
