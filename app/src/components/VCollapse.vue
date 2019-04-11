<template>
  <div
    v-on="$listeners"
    v-bind="$attrs"
    :style="{
      overflow: 'hidden',
      opacity: collapsed ? 0 : 1,
      maxHeight: collapsed ? '0' : maxHeight,
      willChange: 'max-height',
      transitionProperty: 'max-height, opacity',
      transitionDuration: '0.8s',
      transitionTimingFunction: `cubic-bezier(${
        collapsed ? '0, 1, 0, 1' : '1, 0, 1, 0'
      }), ease-in-out`
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
