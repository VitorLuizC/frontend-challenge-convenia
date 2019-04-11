<template>
  <div class="bill-calcs">
    <p class="result">
      <span class="name">Valor à pagar</span>
      <span class="value">{{ toBRL(unpaid) }}</span>
    </p>
    <p class="result">
      <span class="name">Valor pago</span>
      <span class="value">{{ toBRL(paid) }}</span>
    </p>
    <p class="result">
      <span class="name">Total</span>
      <span class="value">{{ toBRL(total) }}</span>
    </p>
  </div>
</template>

<script>
import { formatToBRL } from 'brazilian-values'

export const BillCalcsProps = {
  unpaid: {
    type: Number,
    required: true
  },
  paid: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}

export default {
  props: BillCalcsProps,
  methods: {
    toBRL: formatToBRL
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.bill-calcs {
  box-sizing: border-box;
  display: block;
  padding: 0 12px;

  & > .result {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > .name {
      font-size: em(18px);
    }

    & > .value {
      font-size: em(18px);
      font-weight: 500;
    }
  }
}
</style>
