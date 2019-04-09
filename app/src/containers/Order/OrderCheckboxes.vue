<template>
  <field-checkboxes
    :value="value"
    :options="orders"
    :get-label="(order) => order && order.name"
    @input="$emit('input', $event)"
  />
</template>

<script>
import FieldCheckboxes from '@/components/Field/FieldCheckboxes.vue'

export default {
  components: { FieldCheckboxes },
  props: {
    value: {
      type: Array,
      required: true
    },
    orders: {
      type: Array,
      required: true
    }
  }
}
</script>
