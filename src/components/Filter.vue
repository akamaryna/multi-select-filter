<template>
  <form
    class="filter"
    data-test="filter"
    @submit.prevent="emit('change', optionsSelectedIntermediary)"
  >
    <fieldset class="filter__wrapper">
      <legend
        id="filter-label"
        class="filter__label">{{ label }}
      </legend>
      <div>
        <input
          class="filter__search"
          type="search"
          id="search"
          v-model="filterInput"
          placeholder="Zoek op ..."
          aria-label="Zoek in filteropties"
          data-test="search"
        />
      </div>
      <ul
        v-if="optionsAvailable.length"
        class="filter__options"
        aria-labelledby="filter-label"
        role="listbox"
        aria-multiselectable="true"
        tabindex="0"
        data-test="filter-listbox"
        @keydown="handleListboxKeydown"
      >
        <li
          v-for="(option, index) in optionsAvailable"
          :key="option"
          class="filter__option"
          data-test="option"
          role="option"
          tabindex="-1"
          :aria-selected="optionsSelectedIntermediary.includes(option)"
          @keydown="handleOptionKeydown($event, index)"
        >
          <label
            class="filter__option-label"
            tabindex="-1"
            data-test="option-label"
          >
            <input
              class="filter__option-input"
              type="checkbox"
              tabindex="-1"
              :id="`filter-option-${useId()}`"
              :checked="optionsSelectedIntermediary.includes(option)"
              @click="toggleOptionSelection(option)"
            />
            <span v-html="option"> </span>
          </label>
        </li>
      </ul>
      <p
        v-else
        class="filter__note">Niets gevonden 🤷‍♀️
      </p>
      <button
        class="filter__button"
        :disabled="optionsAvailable.length === 0"
        type="submit">Toepassen
      </button>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, useId, watchEffect } from 'vue'
import type { FilterOption } from '@/types/types'

const { options, optionsSelected = [] } = defineProps<{
  options: FilterOption[]
  optionsSelected?: FilterOption[]
  label: string
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

/**
 * Toggle selection of a filter option
 */
const toggleOptionSelection = (option: FilterOption) => {  
  if (optionsSelectedIntermediary.value.includes(option)) {    
    optionsSelectedIntermediary.value = optionsSelectedIntermediary.value.filter(
      (selectedOption) => selectedOption !== option
    )    
  } else {
    optionsSelectedIntermediary.value.push(option)
  }
}

/**
 * Navigate and focus filter options on ArrowUp/ArrowDown key press
 */
const handleListboxKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    const listbox = event.currentTarget as HTMLElement
    const options = listbox.querySelectorAll<HTMLElement>('[role="option"]')
    const currentIndex = [...options].findIndex(option => option.contains(document.activeElement))
    let newIndex = 0

    if (event.key === 'ArrowDown') {
      newIndex = (currentIndex + 1) % options.length
    } else if (event.key === 'ArrowUp') {
      newIndex = (currentIndex - 1 + options.length) % options.length
    }

    const newOption = options[newIndex]
    const labelToFocus = newOption.querySelector<HTMLElement>('label')

    if (labelToFocus) {
      labelToFocus.focus()
    }

    event.preventDefault()
  }
}

/**
 * Toggle selection of a filter option on Enter/Space key press
 */
const handleOptionKeydown = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Enter' || event.key === ' ') {
    toggleOptionSelection(optionsAvailable.value[index])
    event.preventDefault()
  }
}
</script>

<style scoped>
.filter {
  width: 100%;

  @media (min-width: 769px) {
    width: 400px;
  }
}

.filter__wrapper {
  border: 1px solid var(--grey);
  border-radius: var(--border-radius);
  padding: var(--spacing-x2);
  background-color: var(--grey-light);
}

.filter__label {
  font-size: 1.2rem;
}

.filter__search {
  background-image: url('@/assets/search.svg');
  background-position: right var(--spacing-x2) center; 
  background-repeat: no-repeat;
  background-size: 20px;
  padding: var(--spacing-x3) var(--spacing-x8) var(--spacing-x3) var(--spacing-x3);
  box-sizing: border-box;
  width: 100%;
  display: block;
  border: 1px solid var(--grey);
  border-radius: var(--border-radius);
  font-size: 1rem;

  &:focus {
    outline: var(--focus-outline);
  }
}

.filter__options {
  list-style: none;
  padding: var(--spacing) 0;
  margin-top: var(--spacing-x2);
  max-height: 50vh;
  overflow-y: auto;
  border-radius: var(--border-radius);

  &:focus {
    outline: var(--focus-outline);
  }
}

.filter__option-label {
  display: flex;
  padding: var(--spacing-x2) var(--spacing);
  border-radius: var(--border-radius);
  cursor: pointer;
  
  @media (min-width: 769px) {
    margin: 0px var(--spacing);
  }

  &:focus {
    outline: var(--focus-outline);
  }
}

.filter__option-input {
  margin-right: var(--spacing);;
}

.filter__button {
  display: block;
  width: 100%;
  background-color: var(--blue);
  border-radius: var(--border-radius);
  border: 1px solid transparent;
  font-size: 1.4rem;
  font-family: inherit;
  margin-top: var(--spacing-x2);
  padding: var(--spacing-x2);
  color: var(--white);
  outline: 2px solid transparent;
  cursor: pointer;

  &:not(:disabled):hover {
    background-color: var(--blue-light);
    border-color: var(--blue-light);
  }

  &:not(:disabled):active {
    background-color: var(--blue-dark);
    border-color: var(--blue-dark);
  }

  &:disabled {
    background-color: var(--grey);
    cursor: not-allowed;
  }

  &:not(:disabled):focus {
    outline: var(--focus-outline);
  }
}

.filter__note {
  color: var(--grey);
  text-align: center;
  margin-top: var(--spacing-x2);
}
</style>
