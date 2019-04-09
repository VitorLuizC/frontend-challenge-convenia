<template>
  <main>
    <gratuity-options v-model="gratuity" />

    <field-checkboxes v-model="ordersToBePaid" :options="orders" />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import GratuityOptions from '@/containers/Gratuity/GratuityOptions.vue'
import FieldCheckboxes from '@/components/Field/FieldCheckboxes.vue'

export default {
  components: { GratuityOptions, FieldCheckboxes },
  data() {
    return {
      gratuity: '4',
      ordersToBePaid: []
    }
  },
  computed: mapGetters('Bill', {
    orders: 'UNPAID_OPTIONS'
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
