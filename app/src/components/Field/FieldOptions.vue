<template>
  <field-container
    v-bind="{ id, label, error, message, isRequired }"
    class="field-options"
  >
    <div class="options">
      <fieldset
        v-for="(option, index) in options"
        :key="formatToId(index)"
        class="field-options-option"
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
