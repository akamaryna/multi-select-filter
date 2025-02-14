<template>
  <div>
    <h1>Welkom mijn geweldige filter</h1>
  </div>
  <Filter
    :options="productGroups"
    :optionsSelected="productGroupsSelected"
    @change="apply"
  />
  <p>Geselecteerde productgroepen: {{ productGroupsSelected }}</p>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useFilterStore } from '../stores/core'
import Filter from './Filter.vue'

const store = useFilterStore()
const { getData, setSelectedProductGroupsInLocalStorage } = store
const { productGroups, productGroupsSelected } = storeToRefs(store)

const apply = (productGroupsSelected: string[]) => {  
  setSelectedProductGroupsInLocalStorage(productGroupsSelected)
}

onBeforeMount(async () => {
  await getData()  
})
</script>
