<template>
  <p v-if="isLoading">Carregando contas.</p>
  <div v-else class="bill-list">
    <bill-card
      v-for="bill in bills"
      :key="bill.id"
      :link="'/bill/' + bill.id"
      :name="bill.name"
      class="item"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BillCard from '@/components/Bill/BillCard.vue'

export default {
  components: { BillCard },
  computed: mapGetters('Bill', {
    bills: 'BILLS',
    isLoading: 'LOADING_BILLS'
  }),
  async mounted() {
    this.$store.dispatch('Bill/GET_BILLS')
  }
}
</script>

<style lang="scss">
.bill-list {
  & > .item + .item {
    margin-top: 25px;
  }
}
</style>
