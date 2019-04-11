<template>
  <form class="payment-form">
    <v-details summary="Selecionar pedidos" open>
      <order-checkboxes :orders="orders" v-model="ordersToBePaid" />
    </v-details>

    <v-line />

    <payment-value v-model="value" @clear="onClear" />

    <v-line />

    <bill-calcs
      v-bind="{
        paid: paid + value,
        total: total,
        unpaid: total - (paid + value)
      }"
    />

    <v-line />

    <v-button
      class="payment-form-button"
      :primary="value > 0"
      :disabled="value <= 0"
      @click="onSubmit()"
    >
      Fazer o pagamento
    </v-button>
  </form>
</template>

<script>
import { sumOrders } from '@/services/Bill'
import VDetails from '@/components/VDetails.vue'
import VLine from '@/components/VLine.vue'
import BillCalcs from '@/components/Bill/BillCalcs.vue'
import VButton from '@/components/VButton.vue'
import PaymentValue from '@/components/Payment/PaymentValue.vue'
import OrderCheckboxes from '@/components/Order/OrderCheckboxes.vue'

export default {
  components: {
    VLine,
    VDetails,
    BillCalcs,
    PaymentValue,
    OrderCheckboxes,
    VButton
  },
  props: {
    orders: {
      type: Array,
      required: true
    },
    paid: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      value: 0,
      ordersToBePaid: []
    }
  },
  computed: {
    sum() {
      return sumOrders(this.ordersToBePaid)
    }
  },
  watch: {
    sum(sum) {
      this.value = sum
    }
  },
  methods: {
    onClear() {
      this.value = 0
      this.ordersToBePaid = []
    },
    onSubmit() {
      this.$emit('submit', this.value)
      this.onClear()
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.payment-form-button {
  @include block-center-vertical(flex);
}
</style>
