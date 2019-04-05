<template>
  <fieldset :class="classes">
    <label class="label" v-if="label" :for="id">
      {{ label }} <span class="asterisk" v-if="isRequired">*</span>
    </label>

    <slot />

    <p class="message">{{ isFocused ? message : error }}</p>
  </fieldset>
</template>

<script>
import uuid from 'uuid/v1'

export const FieldContainerProps = {
  id: {
    type: String,
    default: uuid
  },
  label: String,
  error: String,
  message: String,
  isRequired: Boolean
}
export default {
  props: {
    ...FieldContainerProps,
    isFocused: Boolean
  },
  computed: {
    classes() {
      return [
        'field-container',
        {
          '-error': !this.isFocused && this.error,
          '-focus': this.isFocused
        }
      ]
    }
  }
}
</script>
