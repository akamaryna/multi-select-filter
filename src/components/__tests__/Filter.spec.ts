import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Filter from '../Filter.vue'

describe('Filter', () => {
  it('renders properly', () => {
    const wrapper = mount(Filter, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
