<template>
  <section :class="['v-details', { '-open': isOpen }]">
    <header class="summary" @click="isOpen = !isOpen">
      <h3 class="text">{{ summary }}</h3>
      <v-arrow class="arrow" :direction="isOpen ? 'up' : 'down'" />
    </header>
    <v-collapse class="content" :collapsed="!isOpen">
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
  & > .summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    box-shadow: 0px 13px 7px -8px rgba(37, 44, 97, 0.15);

    & > .text {
      margin: 0;
      font-size: em(22px);
    }

    & > .arrow {
      cursor: pointer;
    }
  }

  & > .content {
    box-sizing: border-box;
    margin-top: 18px;
    padding: 0 12px;
  }
}
</style>
