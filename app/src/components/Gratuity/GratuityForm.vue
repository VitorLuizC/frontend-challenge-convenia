<template>
  <form @submit.prevent>
    <v-details summary="Gorjeta">
      <gratuity-options v-model="gratuity" />

      <v-button
        class="gratuity-form-button"
        :primary="current !== gratuity"
        :disabled="current === gratuity"
        @click="onSubmit"
      >
        Alterar
      </v-button>
    </v-details>

    <v-line />
  </form>
</template>

<script>
import GratuityOptions from '@/containers/Gratuity/GratuityOptions.vue'
import VLine from '@/components/VLine.vue'
import VButton from '@/components/VButton.vue'
import VDetails from '@/components/VDetails.vue'

export default {
  components: { GratuityOptions, VLine, VButton, VDetails },
  props: {
    current: String
  },
  data() {
    return {
      gratuity: undefined
    }
  },
  watch: {
    current(currentGratuity) {
      this.gratuity = currentGratuity
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.gratuity)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.gratuity-form-button {
  @include block-center-vertical(flex);
}
</style>
