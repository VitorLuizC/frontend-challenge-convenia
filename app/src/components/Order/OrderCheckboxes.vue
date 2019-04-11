<template>
  <field-checkboxes
    :value="value"
    :options="orders"
    :get-label="(order) => order && order.name"
    class="order-checkboxes"
    @input="$emit('input', $event)"
  >
    <template slot="label" slot-scope="{ option: order }">
      <span class="name">{{ order.name }}</span>
      <span class="value">{{ toBRL(order.value) }}</span>
    </template>
  </field-checkboxes>
</template>

<script>
import FieldCheckboxes from '@/components/Field/FieldCheckboxes.vue'
import { formatToBRL } from 'brazilian-values'

export default {
  components: { FieldCheckboxes },
  props: {
    value: {
      type: Array,
      required: true
    },
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

.order-checkboxes {
  box-sizing: border-box;

  & > .checkboxes {
    & > .checkbox > .label {
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
        min-width: 100px;
        flex-basis: 100px;
        margin-left: auto;
        padding: 3px 12px;
        border-radius: 16px;
        background-color: rgba(#000, 0.12);
        font-size: em(16px);
        font-weight: 500;
        text-align: center;
        white-space: nowrap;
      }
    }
  }
}
</style>
