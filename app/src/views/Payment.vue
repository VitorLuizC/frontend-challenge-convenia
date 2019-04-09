<template>
  <main>
    <gratuity-options v-model="gratuity" />

    <section class="switcher">
      <a :class="['tab', { '-active': type === 'PerOrders' }]">
        Pagar separadamente (por pedidos)
      </a>
      <a :class="['tab', { '-active': type === 'PerValue' }]">
        Pagar conta ou divisão
      </a>
    </section>

    <order-checkboxes :orders="orders" v-model="ordersToBePaid" />

    <hr />

    <div v-if="!isLoading" class="payment">
      <p>Total (à pagar): {{ totalFor(gratuity) }}</p>
      <p>Total: {{ paymentTotal }}</p>

      <button>Fazer o pagamento</button>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import GratuityOptions from '@/containers/Gratuity/GratuityOptions.vue'
import OrderCheckboxes from '@/containers/Order/OrderCheckboxes.vue'
import { sumItemsValues } from '@/services/Bill'

export default {
  components: { GratuityOptions, OrderCheckboxes },
  data() {
    return {
      type: 'PerOrders',
      gratuity: '0',
      ordersToBePaid: []
    }
  },
  computed: {
    ...mapGetters('Bill', {
      orders: 'UNPAID_ORDERS',
      totalFor: 'TOTAL_WITH_GRATUITY',
      isLoadingBill: 'LOADING_BILL'
    }),
    ...mapGetters('Gratuity', {
      percentageOf: 'PERCENTAGE_OF',
      isLoadingGratuities: 'LOADING'
    }),
    paymentTotal() {
      const orders = sumItemsValues(this.ordersToBePaid)
      return orders + orders * this.percentageOf(this.gratuity)
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
