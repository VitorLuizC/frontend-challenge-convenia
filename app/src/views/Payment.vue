<template>
  <v-screen title="Pagamento" :back-to="'/bill/' + id">
    <v-details summary="Opção de gorjeta">
      <gratuity-options v-model="gratuity" />
    </v-details>

    <v-line />

    <template v-if="!isLoading">
      <v-details summary="Selecionar pedidos" open>
        <order-checkboxes :orders="bill.orders" v-model="ordersToBePaid" />
      </v-details>

      <v-line />

      <payment-value
        :value="value || sum"
        @input="value !== sum && (value = $event)"
        @clear="
          () => {
            value = 0
            ordersToBePaid = []
          }
        "
      />

      <v-line />

      <bill-calcs
        v-bind="{
          paid,
          total: totalFor(gratuity),
          unpaid: unpaidFor(gratuity)
        }"
      />

      <v-line />

      <v-button primary>Fazer o pagamento</v-button>
    </template>
  </v-screen>
</template>

<script>
import { mapGetters } from 'vuex'
import GratuityOptions from '@/containers/Gratuity/GratuityOptions.vue'
import OrderCheckboxes from '@/components/Order/OrderCheckboxes.vue'
import { sumOrders } from '@/services/Bill'
import VScreen from '@/components/VScreen.vue'
import VDetails from '@/components/VDetails.vue'
import VLine from '@/components/VLine.vue'
import BillCalcs from '@/components/Bill/BillCalcs.vue'
import VButton from '@/components/VButton.vue'
import PaymentValue from '@/components/Payment/PaymentValue.vue'

export default {
  components: {
    GratuityOptions,
    OrderCheckboxes,
    VScreen,
    VLine,
    VDetails,
    BillCalcs,
    PaymentValue,
    VButton
  },
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
      paid: 'PAID_TOTAL',
      totalFor: 'TOTAL_WITH_GRATUITY',
      unpaidFor: 'UNPAID_TOTAL_WITH_GRATUITY',
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
