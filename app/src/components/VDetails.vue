<template>
  <section class="v-details">
    <header class="header" @click="isOpen = !isOpen">
      <h3 class="summary">{{ summary }}</h3>
      <v-arrow class="arrow" :direction="isOpen ? 'up' : 'down'" />
    </header>
    <v-collapse :collapsed="!isOpen">
      <slot />
    </v-collapse>
  </section>
</template>

<script>
import VArrow from '@/components/VArrow.vue'
import VCollapse from '@/components/VCollapse.vue'

export default {
  components: { VArrow, VCollapse },
  props: {
    open: Boolean,
    summary: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: Boolean(this.open)
    }
  }
}
</script>

<style lang="scss">
.v-details {
  & > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
