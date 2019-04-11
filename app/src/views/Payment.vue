<template>
  <payment-view :id="id" />
</template>

<script>
import PaymentView from '@/containers/Payment/PaymentView.vue'

export default {
  components: { PaymentView },
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>
