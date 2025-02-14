<template>
  <form
    @submit.prevent="emit('change', optionsSelectedIntermediary)"
  >
    <fieldset>
      <legend id="filter-label">Productgroep</legend>
      <div>
        <input
          type="search"
          id="search"
          v-model="filterInput"
          placeholder="Zoek op ..."
          aria-label="Zoek in productgroepen"
        />
      </div>
      <ul
        aria-labelledby="filter-label"
      >
        <li
          v-for="option in optionsAvailable"
          :key="option"
        >
          <label>
            <input
              type="checkbox"
              :id="`filter-option-${useId()}`"
              :checked="optionsSelected.includes(option)"
              @change="toggleOptionSelection(option)"
            />
            {{ option }}
          </label>
        </li>
      </ul>
      <button type="submit">Toepassen</button>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, useId, watchEffect } from 'vue'
import type { FilterOption } from '@/types'

const { options, optionsSelected = [] } = defineProps<{
  options: FilterOption[]
  optionsSelected?: FilterOption[]
}>()

const emit = defineEmits<{
  change: [options: FilterOption[]]
}>()

const filterInput = ref('')
// Create an intermediary ref to store options selected but not yet committed
const optionsSelectedIntermediary = ref<FilterOption[]>([])

watchEffect(() => {
  // Assign a shallow copy of the optionsSelected prop once it's available to the intermediary ref
  optionsSelectedIntermediary.value = [...optionsSelected]
})

const optionsSorted = computed(() => {  
  return [...options].sort((a, b) => {
    if (optionsSelected.includes(a)) {
      return -1
    }
    if (optionsSelected.includes(b)) {
      return 1
    }
    return 0
  })
})

const optionsAvailable = computed(() => {    
  return optionsSorted.value.filter((option) => {
    return option.toLowerCase().includes(filterInput.value.toLowerCase())
  })
})

const toggleOptionSelection = (option: FilterOption) => {
  if (optionsSelectedIntermediary.value.includes(option)) {
    optionsSelectedIntermediary.value = optionsSelectedIntermediary.value.filter(
      (selectedOption) => selectedOption !== option
    )    
  } else {
    optionsSelectedIntermediary.value.push(option)
  }
}
</script>

<style scoped>

</style>
