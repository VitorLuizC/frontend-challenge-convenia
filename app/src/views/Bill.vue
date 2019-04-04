<template>
  <main v-if="bill" class="bill-view">
    <h2 class="title">{{ bill.name }}</h2>

    <section class="order-panel">
      <h3 class="title">Pedidos</h3>
      <ul class="list">
        <li v-for="order in orders" :key="order.id" class="item">
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

    Total: {{ sum }}

    <hr />
  </main>
</template>

<script>
import { getBillById } from '@/services/Bill'

// TODO: Traduzir "somar valor dos pedidos" e usar como nome dessa função.
const sum = (orders) => {
  const sum = (sum, order) => sum + order.value
  return orders.reduce(sum, 0)
}

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      bill: undefined
    }
  },
  computed: {
    idsOfPaidOrders() {
      if (!this.bill) {
        return []
      }

      return this.bill.payments
        .filter((payment) => payment.type === 'PerOrders')
        .map((payment) => payment.orders || [])
        .flat()
    },
    orders() {
      if (!this.bill) {
        return []
      }

      return this.bill.orders.map((order) => ({
        ...order,
        isPaid: this.idsOfPaidOrders.includes(order.id)
      }))
    },
    sum() {
      if (!this.bill) {
        return 0
      }

      return sum(this.bill.orders)
    }
  },
  watch: {
    id: {
      immediate: true,
      async handler(id) {
        this.bill = undefined
        this.bill = await getBillById(id)
      }
    }
  }
}
</script>
