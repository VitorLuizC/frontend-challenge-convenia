<template>
  <main v-if="bill" class="bill-view">
    <h2 class="title">{{ bill.name }}</h2>

    <section class="order-panel">
      <h3 class="title">Pedidos</h3>
      <ul class="list">
        <li v-for="order in bill.orders" :key="order.id" class="item">
          {{ order }}
        </li>
      </ul>
    </section>

    <hr />

    <section class="payment-panel">
      <h3 class="title">Pagamentos</h3>
      <ul class="list">
        <li v-for="payment in bill.payments" :key="payment.id" class="item">
          {{ payment }}
        </li>
      </ul>
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

export default {
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
