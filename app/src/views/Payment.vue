<template>
  <v-screen title="Pagamento" :back-to="'/bill/' + id">
    <gratuity-options v-model="gratuity" />

    <template v-if="!isLoading">
      <order-checkboxes :orders="bill.orders" v-model="ordersToBePaid" />

      <hr />

      <input
        type="number"
        :value="value || sum"
        @input="value !== sum && (value = $event.target.value)"
      />

      <button type="button" @click="value = 0">Limpar</button>

      <p>À pagar: {{ unpaidTotalFor(gratuity) }}</p>
      <p>Pago: {{ paidTotal }}</p>
      <p>Total: {{ totalFor(gratuity) }}</p>

      <button>Fazer o pagamento</button>
    </template>
  </v-screen>
</template>

<script>
import { mapGetters } from 'vuex'
import GratuityOptions from '@/containers/Gratuity/GratuityOptions.vue'
import OrderCheckboxes from '@/containers/Order/OrderCheckboxes.vue'
import { sumOrders } from '@/services/Bill'
import VScreen from '@/components/VScreen.vue'

export default {
  components: { GratuityOptions, OrderCheckboxes, VScreen },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      value: undefined,
      type: 'PerOrders',
      gratuity: '806c5d88-9832-44ce-978a-e239c54de3ee',
      ordersToBePaid: []
    }
  },
  computed: {
    ...mapGetters('Bill', {
      bill: 'BILL',
      paidTotal: 'PAID_TOTAL',
      totalFor: 'TOTAL_WITH_GRATUITY',
      unpaidTotalFor: 'UNPAID_TOTAL_WITH_GRATUITY',
      isLoadingBill: 'LOADING_BILL'
    }),
    ...mapGetters('Gratuity', {
      percentageOf: 'PERCENTAGE_OF',
      isLoadingGratuities: 'LOADING'
    }),
    sum() {
      const sum = sumOrders(this.ordersToBePaid)
      return sum + sum * this.percentageOf(this.gratuity)
    },
    isLoading() {
      return this.isLoadingBill || this.isLoadingGratuities
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(id) {
        this.$store.dispatch('Bill/GET_BILL', id)
      }
    }
  }
}
</script>
