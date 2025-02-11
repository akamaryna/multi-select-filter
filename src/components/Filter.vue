<template>
  <ul>
    <li v-for="option in availableOptions" :key="option">
      <label>
        <input type="checkbox" :checked="selectedOptions.includes(option)" />
        {{ option }}
      </label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useFilterStore } from '../stores/filter'
const store = useFilterStore()

const { getOptions } = store
const { availableOptions, selectedOptions } = storeToRefs(store)
onBeforeMount(async () => {
  await getOptions()
})
</script>

<style scoped>

</style>
