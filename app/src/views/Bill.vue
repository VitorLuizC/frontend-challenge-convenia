<template>
  <bill-view :id="id" />
</template>

<script>
import BillView from '@/containers/Bill/BillView.vue'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    BillView
  }
}
</script>
