<template>
  <p v-if="isLoading">Carregando as opções de gorjeta.</p>
  <field-options
    v-else
    label="Opção de gorjeta"
    :value="value"
    :options="options"
    is-required
    @input="$emit('input', $event)"
  />
</template>

<script>
import FieldOptions from '@/components/Field/FieldOptions.vue'
import { mapGetters } from 'vuex'

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
