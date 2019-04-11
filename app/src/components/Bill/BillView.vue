<template>
  <main class="bill-view">
    <v-details summary="Pedidos" open>
      <order-list :orders="orders" />
    </v-details>

    <v-line />

    <v-details summary="Pagamentos">
      <payment-list :payments="payments" />
    </v-details>

    <v-line />

    <bill-calcs v-bind="{ paid, total, unpaid }" />

    <v-line />

    <v-button class="button" :to="paymentLink" primary>Pagar</v-button>
  </main>
</template>

<script>
import VLine from '@/components/VLine.vue'

import VButton from '@/components/VButton.vue'
import VDetails from '@/components/VDetails.vue'
import OrderList from '@/components/Order/OrderList.vue'
import PaymentList from '@/components/Payment/PaymentList.vue'
import BillCalcs, { BillCalcsProps } from '@/components/Bill/BillCalcs.vue'

export default {
  components: {
    OrderList,
    PaymentList,
    BillCalcs,
    VLine,
    VButton,
    VDetails
  },
  props: {
    ...BillCalcsProps,
    orders: Array,
    payments: Array,
    paymentLink: {
      type: [Object, String],
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.bill-view {
  & > .button {
    @include block-center-vertical(flex);
  }
}
</style>
