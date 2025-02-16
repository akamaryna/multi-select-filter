<template>
  <h1>Multi-Select Filter</h1>
  <br />
  <Filter
    :options="productGroups"
    :optionsSelected="productGroupsSelected"
    label="Productgroep"
    @change="apply"
  />
  <br />
  <p>Geselecteerde productgroepen: {{ productGroupsSelected }}</p>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useFilterStore } from '../stores/core'
import Filter from '@/components/Filter.vue'

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
