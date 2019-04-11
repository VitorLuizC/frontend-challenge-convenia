<template>
  <field-container
    v-bind="{ id, label, error, message, isRequired }"
    class="field-options"
  >
    <div class="options">
      <fieldset
        v-for="(option, index) in options"
        :key="formatToId(index)"
        class="option"
      >
        <input
          type="radio"
          class="field"
          :id="formatToId(index)"
          :value="option.value"
          :checked="value === option.value"
          @click.prevent="onClick(option.value)"
        />

        <label class="label" :for="formatToId(index)">{{ option.label }}</label>
      </fieldset>
    </div>
  </field-container>
</template>

<script>
import FieldContainer, {
  FieldContainerProps
} from '@/components/Field/FieldContainer.vue'

export default {
  components: { FieldContainer },
  props: {
    ...FieldContainerProps,
    value: [Number, String, Boolean],
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatToId(index) {
      return `${this.id}-option-${index}`
    },
    onClick(option) {
      // Some browsers don't let `checked` change in default prevented event
      // handlers and I can't let browser decide to set `checked` state, because
      // it would break single source of thuth principe. So Evan You propose
      // this fix on the comment bellow.
      // https://github.com/vuejs/vue/issues/5650#issuecomment-300701271
      setTimeout(() => this.$emit('input', option), 0)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

%field-options-option {
  & > .field {
    display: none;
  }

  & > .label {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 1.1;
    text-align: center;
    font-size: em(18px);

    &::before {
      @include rect(16px);
      min-width: 16px;
      flex-basis: 16px;
      box-sizing: border-box;
      margin-right: 8px;
      border: 2px solid #3f3f3f;
      border-radius: 50%;
      content: '';
    }

    &::after {
      @include rect(8px);
      position: absolute;
      left: 4px;
      border-radius: 50%;
      background-color: #3f3f3f;
    }
  }

  & > .field:checked + .label::after {
    content: '';
  }
}

.field-options {
  & > .options {
    & > .option {
      @extend %field-options-option;
    }

    & > .option + .option {
      margin-top: 18px;
    }
  }
}
</style>
