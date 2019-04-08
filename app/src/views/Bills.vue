<template>
  <main class="bills-view">
    <h2 class="title">Mesas</h2>

    <bill-list class="list" />
  </main>
</template>

<script>
import BillList from '@/containers/Bill/BillList.vue'

export default {
  components: { BillList }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.bills-view {
  & > .title {
    text-align: center;
    font-size: em(24px);
    font-weight: 700;
  }
}
</style>
