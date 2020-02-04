import Vue from 'vue'
import Launches from '@/components/Launches'

describe('Launches.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Launches)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#launches-table h1').textContent)
      .toEqual('SpaceX Launches')
  })
})
