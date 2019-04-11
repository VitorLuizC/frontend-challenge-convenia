<template>
  <section :class="['v-details', { '-open': isOpen }]">
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
@import '~@/assets/sass/helpers.scss';

.v-details {
  & > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
    padding: 8px 12px;
    box-shadow: 0px 6px 12px -4px rgba(37, 44, 97, 0.15);

    & > .summary {
      margin: 0;
      font-size: em(22px);
    }
  }
}
</style>
