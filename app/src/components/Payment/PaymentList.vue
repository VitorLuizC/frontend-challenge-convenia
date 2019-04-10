<template>
  <ul class="payment-list">
    <li v-for="payment in payments" :key="payment.id" class="item">
      <span class="value">{{ toBRL(payment.value) }}</span>
      <span class="time">{{ toDateTime(new Date(payment.paidAt)) }}</span>
    </li>
  </ul>
</template>

<script>
import { formatToBRL } from 'brazilian-values'
import formatToDate from 'tiny-date-format'

export default {
  props: {
    payments: {
      type: Array,
      required: true
    }
  },
  methods: {
    toBRL: formatToBRL,
    toDateTime(date) {
      return formatToDate(date, '[em] DD/MM [às] HH:mm:ss')
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.payment-list {
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

    & > .time {
      font-size: em(14px);
    }

    & > .value {
      font-size: em(20px);
      font-weight: 500;
    }
  }

  & > .item + .item {
    margin-top: 18px;
  }
}
</style>
