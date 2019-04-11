<template>
  <v-screen title="Pagamento" :back-to="'/bill/' + id">
    <gratuity-form :current="bill && bill.gratuity.id" @submit="setGratuity" />
    <payment-form
      v-if="!isLoading"
      :paid="paid"
      :total="total"
      :orders="bill.orders"
      @submit="setPayment"
    />
  </v-screen>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import GratuityForm from '@/components/Gratuity/GratuityForm.vue'
import PaymentForm from '@/components/Payment/PaymentForm.vue'
import VScreen from '@/components/VScreen.vue'

export default {
  components: { PaymentForm, GratuityForm, VScreen },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('Bill', {
      bill: 'BILL',
      paid: 'PAID_TOTAL',
      total: 'TOTAL',
      unpaid: 'UNPAID_TOTAL',
      isLoadingBill: 'LOADING_BILL'
    }),
    ...mapGetters('Gratuity', {
      isLoadingGratuities: 'LOADING'
    }),
    isLoading() {
      return this.isLoadingBill || this.isLoadingGratuities
    }
  },
  methods: mapActions('Bill', {
    setPayment: 'SET_PAYMENT',
    setGratuity: 'SET_GRATUITY'
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
