import type { FilterOption } from '@/types/types'

export const getProductGroups = async (): Promise<FilterOption[]> => {
  const response = await fetch('/items.json')
  const { data } = await response.json()
  return data
}
