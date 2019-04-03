<template>
  <main class="bills-view">
    <h2 class="title">Mesas</h2>

    <div class="list">
      <router-link
        v-for="bill in bills"
        :to="'/bill/' + bill.id"
        :key="bill.id"
        class="item bill-list-item"
      >
        <h4 class="name">{{ bill.name }}</h4>
      </router-link>
    </div>
  </main>
</template>

<script>
import { getOpenBills } from '@/services/Bill'

export default {
  data() {
    return {
      bills: []
    }
  },
  async mounted() {
    this.bills = await getOpenBills()
  }
}
</script>

<style lang="scss">
@function no-unit($value) {
  @return $value / ($value * 0 + 1);
}

@function em($size, $base-font-size: 16px) {
  @return no-unit($size) / no-unit($base-font-size) * 1em;
}

@mixin flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}

%bills-view-list {
  & > .item {
    @include flex-center();
    width: 100%;
    height: 96px;
    background-color: rgba(#000, 20%);

    & > .name {
      margin: 0;
    }
  }

  & > .item + .item {
    margin-top: 25px;
  }
}

.bills-view {
  & > .title {
    text-align: center;
    font-size: em(24px);
    font-weight: 700;
  }

  & > .list {
    @extend %bills-view-list;
  }
}
</style>
