<template>
  <v-screen
    :title="(bill && bill.table.name) || ''"
    back-to="/"
    content-class="bill-view"
  >
    <v-bubbles v-if="!bill" />

    <bill-view
      v-else
      :orders="bill.orders"
      :payments="bill.payments"
      :paid="paid"
      :total="total"
      :unpaid="unpaid"
      :payment-link="'/payment/' + id"
    />
  </v-screen>
</template>

<script>
import { mapGetters } from 'vuex'
import VScreen from '@/components/VScreen.vue'
import VBubbles from '@/components/VBubbles.vue'
import BillView from '@/components/Bill/BillView.vue'

export default {
  components: {
    BillView,
    VScreen,
    VBubbles
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: mapGetters('Bill', {
    bill: 'BILL',
    paid: 'PAID_TOTAL',
    total: 'TOTAL',
    unpaid: 'UNPAID_TOTAL'
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
