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

    <div class="calc">
      <p class="result">
        <span class="name">Valor à pagar</span>
        <span class="value">{{ toBRL(unpaidTotal) }}</span>
      </p>
      <p class="result">
        <span class="name">Valor pago</span>
        <span class="value">{{ toBRL(paidTotal) }}</span>
      </p>
      <p class="result">
        <span class="name">Total</span>
        <span class="value">{{ toBRL(total) }}</span>
      </p>
    </div>

    <v-line />

    <v-button class="button" :to="'/payment/' + id">Pagar</v-button>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import VLine from '@/components/VLine.vue'
import VButton from '@/components/VButton.vue'
import VDetails from '@/components/VDetails.vue'
import OrderList from '@/components/Order/OrderList.vue'
import PaymentList from '@/components/Payment/PaymentList.vue'
import { formatToBRL } from 'brazilian-values'

export default {
  components: { OrderList, PaymentList, VLine, VButton, VDetails },
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
  methods: {
    toBRL: formatToBRL
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

<style lang="scss">
.bill-view {
  @media screen and (min-width: 768px) {
    width: 768px;
    margin-left: auto;
    margin-right: auto;
  }

  .calc {
    box-sizing: border-box;
    display: block;
    padding: 0 12px;

    & > .result {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > .name {
        font-size: em(18px);
      }

      & > .value {
        font-size: em(18px);
        font-weight: 500;
      }
    }
  }

  & > .button {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
