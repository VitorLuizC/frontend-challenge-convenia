<template>
  <v-screen title="Mesas" content-class="bills-view">
    <bill-list class="list" />
  </v-screen>
</template>

<script>
import BillList from '@/containers/Bill/BillList.vue'
import VScreen from '@/components/VScreen.vue'

export default {
  components: { BillList, VScreen }
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
