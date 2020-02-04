import Vue from 'vue'

Vue.config.productionTip = false
global.fetch = jest.fn(() => Promise.resolve());