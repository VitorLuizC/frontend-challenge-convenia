<template>
  <main v-if="bill" class="bill-view">
    <h2 class="title">{{ bill.name }}</h2>

    <v-details summary="Pedidos" open>
      <order-list :orders="bill.orders" />
    </v-details>

    <v-line />

    <v-details summary="Pagamentos">
      <payment-list :payments="bill.payments" />
    </v-details>

    <v-line />

    Total (à pagar): {{ unpaidTotal }}<br />
    Total (pago): {{ paidTotal }}<br />
    Total: {{ total }}<br />

    <v-line />

    <router-link :to="'/payment/' + id">Pagar</router-link>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import VLine from '@/components/VLine.vue'
import VDetails from '@/components/VDetails.vue'
import OrderList from '@/components/Order/OrderList.vue'
import PaymentList from '@/components/Payment/PaymentList.vue'

export default {
  components: { OrderList, PaymentList, VLine, VDetails },
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

<style lang="scss">
.bill-view {
  @media screen and (min-width: 768px) {
    width: 768px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
