<template>
  <field-options
    v-if="!isLoading"
    :value="value"
    :options="options"
    is-required
    @input="$emit('input', $event)"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import FieldOptions from '@/components/Field/FieldOptions.vue'

export default {
  components: { FieldOptions },
  props: {
    value: String
  },
  computed: mapGetters('Gratuity', {
    options: 'OPTIONS',
    isLoading: 'LOADING'
  }),
  async mounted() {
    this.$store.dispatch('Gratuity/GET_GRATUITIES')
  }
}
</script>
