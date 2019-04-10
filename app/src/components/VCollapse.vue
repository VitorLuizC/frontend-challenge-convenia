<template>
  <div
    v-on="$listeners"
    v-bind="$attrs"
    :style="{
      overflow: 'hidden',
      maxHeight: collapsed ? maxHeight : '0',
      willChange: 'max-height',
      transitionProperty: 'max-height',
      transitionDuration: '0.8s',
      transitionTimingFunction: `cubic-bezier(${
        collapsed ? '1, 0, 1, 0' : '0, 1, 0, 1'
      })`
    }"
  >
    <slot />
  </div>
</template>

<script>
import isCSSLength from 'is-css-length'

export default {
  props: {
    collapsed: Boolean,
    maxHeight: {
      type: String,
      default: '99999px',
      validator: isCSSLength
    }
  }
}
</script>
