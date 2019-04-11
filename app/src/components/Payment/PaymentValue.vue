<template>
  <div class="payment-value">
    <field-container class="container">
      <input
        class="field"
        type="number"
        :value="value"
        @input="$emit('input', +$event.target.value)"
      />
    </field-container>

    <v-button class="clear" size="small" @click="$emit('clear')">
      Limpar
    </v-button>
  </div>
</template>

<script>
import FieldContainer from '@/components/Field/FieldContainer.vue'
import VButton from '@/components/VButton.vue'

export default {
  components: { FieldContainer, VButton },
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.payment-value {
  display: flex;
  align-items: center;
  justify-content: center;

  & > .container {
    box-sizing: border-box;
    position: relative;
    padding: 3px;
    background-clip: content-box;
    background-color: #fff;
    box-shadow: 0 4px 11px 0 rgba(37, 44, 97, 0.15),
      0 1px 3px 0 rgba(93, 100, 148, 0.2);

    &,
    &::before {
      @include rect(164px, 48px);
      border-radius: 48px;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      background-color: #6c5ce7;
      background-image: linear-gradient(30deg, transparent, #a29bfe);
      content: '';
    }

    & > .field {
      @include rect(164px - 6px, 48px - 6px);
      box-sizing: border-box;
      border: 0;
      padding: 0 12px;
      background-color: transparent;
      outline: none;
      font: inherit;
      font-size: em(18px);
      font-weight: 500;
    }
  }

  & > .clear {
    margin-left: 12px;
  }
}
</style>
