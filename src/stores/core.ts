import { ref, computed, watch, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'
import { getProductGroups } from '@/api'
import type { FilterOption } from '@/types'

export const useFilterStore = defineStore('filter', () => {
  const productGroups = ref<FilterOption[]>([])
  const productGroupsSelected = ref<FilterOption[]>([])

  const getData = async () => {
    try {
      productGroups.value = await getProductGroups()
    } catch (error: unknown) {
      console.error('Error fetching data')
    }
  }

  onBeforeMount(() => {
    // Load selected product groups from local storage
    const productGroupsSelectedFromStorage = localStorage.getItem('productGroupsSelected')
    if (productGroupsSelectedFromStorage) {
      productGroupsSelected.value = JSON.parse(productGroupsSelectedFromStorage)
    }
  })

  const setSelectedProductGroupsInLocalStorage = (newValue: FilterOption[]) => {
    productGroupsSelected.value = newValue
    localStorage.setItem('productGroupsSelected', JSON.stringify(newValue))
  }

  return {
    productGroups,
    productGroupsSelected,
    getData,
    setSelectedProductGroupsInLocalStorage
  }
})
