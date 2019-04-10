<template>
  <main v-if="bill" class="bill-view">
    <h2 class="title">{{ bill.name }}</h2>

    <v-details summary="Pedidos" open>
      <order-list :orders="bill.orders" />
    </v-details>

    <v-details summary="Pagamentos">
      <payment-list :payments="bill.payments" />
    </v-details>

    <hr />

    <section class="payment-panel">
      <h3 class="title"></h3>
    </section>

    <hr />

    Total (à pagar): {{ unpaidTotal }}<br />
    Total (pago): {{ paidTotal }}<br />
    Total: {{ total }}<br />

    <hr />

    <router-link :to="'/payment/' + id">Pagar</router-link>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import VDetails from '@/components/VDetails.vue'
import OrderList from '@/components/Order/OrderList.vue'
import PaymentList from '@/components/Payment/PaymentList.vue'

export default {
  components: { OrderList, PaymentList, VDetails },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: mapGetters('Bill', {
    bill: 'BILL',
    total: 'TOTAL',
    paidTotal: 'PAID_TOTAL',
    unpaidTotal: 'UNPAID_TOTAL'
  }),
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
