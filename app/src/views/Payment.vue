<template>
  <main>
    <gratuity-options v-model="gratuity" />
  </main>
</template>

<script>
import GratuityOptions from '@/containers/Gratuity/GratuityOptions'

export default {
  components: { GratuityOptions },
  data() {
    return {
      gratuity: '4'
    }
  }
}
</script>
