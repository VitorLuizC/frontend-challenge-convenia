<template>
  <field-container
    v-bind="{ id, label, error, message, isRequired }"
    class="field-checkboxes"
  >
    <div class="checkboxes">
      <fieldset
        v-for="(option, index) in options"
        :key="id + '-checkbox-' + index"
        class="checkbox"
      >
        <input
          type="checkbox"
          class="field"
          :id="id + '-option-' + index"
          :value="option"
          :checked="value.includes(option)"
          @click.prevent="onClick(option)"
        />

        <label class="label" :for="formatToId(index)">
          <slot name="label" :index="index" :option="option">
            {{ option }}
          </slot>
        </label>
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
    value: Array,
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
      const value = this.value.includes(option)
        ? this.value.filter((value) => value !== option)
        : [...this.value, option]
      // Some browsers don't let `checked` change in default prevented event
      // handlers and I can't let browser decide to set `checked` state, because
      // it would break single source of thuth principe. So Evan You propose
      // this fix on the comment bellow.
      // https://github.com/vuejs/vue/issues/5650#issuecomment-300701271
      setTimeout(() => this.$emit('input', value), 0)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

%field-checkboxes-checkbox {
  & > .field {
    display: none;
  }

  & > .label {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &::before {
      @include rect(16px);
      min-width: 16px;
      flex-basis: 16px;
      box-sizing: border-box;
      margin-right: 8px;
      border: 2px solid #3f3f3f;
      border-radius: 4px;
      content: '';
    }

    &::after {
      @include rect(8px);
      position: absolute;
      left: 4px;
      border-radius: 2px;
      background-color: #3f3f3f;
    }
  }

  & > .field:checked + .label::after {
    content: '';
  }
}

.field-checkboxes {
  & > .checkboxes {
    & > .checkbox {
      @extend %field-checkboxes-checkbox;
    }

    & > .checkbox + .checkbox {
      margin-top: 18px;
    }
  }
}
</style>
