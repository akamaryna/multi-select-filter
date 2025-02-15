import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { productGroupsMock } from '@/mocks/product-groups-mock'
import Filter from '@/components/Filter.vue'

const createWrapper = (props?: {}) => {
  return shallowMount(Filter, {
    props: {
      options: productGroupsMock,
      label: 'Product groups',
      optionsSelected: [],
      ...props
    },
  })
}

describe('Filter', () => {
  describe('Rendering', () => {
    it('should render all options', () => {
      const wrapper = createWrapper()
      const options = wrapper.findAll('[data-test="option"]')
      expect(options.length).toBe(productGroupsMock.length)
    })
  })

  describe('Searching', () => {
    it('should show only matching options when typing in search input, regardless of case', async () => {
      const testCases = ['boek', 'BOEK']
      for (const searchQuery of testCases) {
        const wrapper = createWrapper()
        const searchInput = wrapper.get('[data-test="search"]')
        await searchInput.setValue(searchQuery)
        const options = wrapper.findAll('[data-test="option"]')
        const allContainSearchPhrase = options.every(option => option.text().toLowerCase().includes(searchQuery.toLowerCase()))
        expect(allContainSearchPhrase).toBe(true)
      }
    })
  })

  describe('Sorting', () => {
    it('should display selected options on top of the list', async () => {
      const lastOption = productGroupsMock[productGroupsMock.length - 1]
      const wrapper = createWrapper({
        optionsSelected: [lastOption]
      })
      const options = wrapper.findAll('[data-test="option"]')
      expect(options[0].text()).toBe(lastOption)
    })

    it ('should not shuffle the order of the options if they are not submitted', async () => {
      const index = 3
      const wrapper = createWrapper()
      const optionToSelect = wrapper.findAll('[data-test="option"]')[index]
      await optionToSelect.get('input[type="checkbox"]').setValue(true)
      expect(
        wrapper.findAll('[data-test="option"]')[index].text())
        .toBe(optionToSelect.text()
      )
    })
  })

  describe('Form Submission', () => {
    it('should correctly emit selected options when form is submitted', async () => {
      const wrapper = createWrapper()
      const options = wrapper.findAll('[data-test="option"]')
      await options[0].get('input[type="checkbox"]').setValue(true)
      await options[1].get('input[type="checkbox"]').setValue(true)
      await options[2].get('input[type="checkbox"]').setValue(true)
      // Unselect the first option
      await options[0].get('input[type="checkbox"]').setValue(false)
      await wrapper.find('form').trigger('submit.prevent')
      expect(
        wrapper.emitted().change[0])
        .toEqual([[productGroupsMock[1], productGroupsMock[2]]])
    })
  })
})
