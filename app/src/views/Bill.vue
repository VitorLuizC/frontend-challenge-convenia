<template>
  <p :key="id">Bill</p>
</template>

<script>
import { getBillById } from '@/services/Bill'

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
