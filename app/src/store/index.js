import Vue from 'vue'
import Vuex from 'vuex'
import bill from '@/store/modules/bill'
import Gratuity from '@/store/modules/Gratuity'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    bill,
    Gratuity
  }
})
