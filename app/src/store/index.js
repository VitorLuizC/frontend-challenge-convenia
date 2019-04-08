import Vue from 'vue'
import Vuex from 'vuex'
import Bill from '@/store/modules/Bill'
import Gratuity from '@/store/modules/Gratuity'
import Loading from '@/store/modules/Loading'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    Bill,
    Gratuity,
    Loading
  }
})
