import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getProductGroups } from '@/api'

type FilterOption = string

export const useFilterStore = defineStore('filter', () => {
  const options = ref<FilterOption[]>([])
  const selectedOptions = ref<FilterOption[]>([])
  const filterInput = ref('')
  const availableOptions = computed(() => {
    console.log(options.value);
    
    return options.value.filter((option) => {
      return option.toLowerCase().includes(filterInput.value.toLowerCase())
    })
  })

  const getOptions = async () => {
    options.value = await getProductGroups()
  }

  return { selectedOptions, availableOptions, filterInput, getOptions }
})
