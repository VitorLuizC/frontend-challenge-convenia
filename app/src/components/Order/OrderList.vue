<template>
  <ul class="order-list">
    <li v-for="order in orders" :key="order.id" class="item">
      <span class="name">{{ order.name }}</span>
      <span class="value">{{ toBRL(order.value) }}</span>
    </li>
  </ul>
</template>

<script>
import { formatToBRL } from 'brazilian-values'

export default {
  props: {
    orders: {
      type: Array,
      required: true
    }
  },
  methods: {
    toBRL: formatToBRL
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.order-list {
  display: block;
  list-style: none;

  & > .item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > .name,
    & > .value {
      display: block;
    }

    & > .name {
      text-align: center;
      font-size: em(18px);
      line-height: 1.1;
    }

    & > .value {
      box-sizing: border-box;
      width: 100px;
      flex-basis: 100px;
      padding: 3px 12px;
      border-radius: 16px;
      background-color: rgba(#000, 0.12);
      font-size: em(16px);
      font-weight: 500;
      text-align: center;
      white-space: nowrap;
    }
  }

  & > .item + .item {
    margin-top: 18px;
  }
}
</style>
