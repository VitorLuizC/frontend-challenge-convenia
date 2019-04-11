<template>
  <v-screen title="Mesas">
    <v-bubbles v-if="isLoading" />

    <div v-else class="bill-list">
      <table-card
        v-for="bill in [...bills, ...bills, ...bills]"
        :key="bill.id"
        :link="'/bill/' + bill.id"
        :name="bill.name"
        :status="1"
        class="item"
      />
    </div>
  </v-screen>
</template>

<script>
import { mapGetters } from 'vuex'
import TableCard from '@/components/Table/TableCard.vue'
import VBubbles from '@/components/VBubbles.vue'
import VScreen from '@/components/VScreen.vue'

export default {
  components: { TableCard, VBubbles, VScreen },
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  & > .item {
    margin: (25px / 2);
  }

  & > .item:last-child:nth-child(odd) {
    margin-right: auto;
  }
}
</style>
