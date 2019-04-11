<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :type="to ? undefined : 'button'"
    :class="['v-button', '-' + size, { '-primary': primary }]"
  >
    <span class="text">
      <slot />
    </span>
  </component>
</template>

<script>
const sizes = ['small', 'large']

export default {
  props: {
    to: [String, Object],
    size: {
      type: String,
      default: 'large',
      validator: sizes.includes.bind(sizes)
    },
    primary: Boolean
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.v-button {
  @include rect(256px, 48px);
  display: flex;
  align-items: center;
  border-radius: 48px;
  justify-content: center;
  transition: transform 0.8s ease-out;
  background-color: #989898;
  background-image: linear-gradient(30deg, transparent, #c1c1c1);
  box-shadow: 0 4px 11px 0 rgba(37, 44, 97, 0.15),
    0 1px 3px 0 rgba(93, 100, 148, 0.2);
  outline: none;
  cursor: pointer;

  &.-primary {
    background-color: #6c5ce7;
    background-image: linear-gradient(30deg, transparent, #a29bfe);
  }

  &.-large {
    @include rect(256px, 48px);
    border-radius: 48px;
  }

  &.-small {
    @include rect(96px, 34px);
    border-radius: 34px;
  }

  & > .text {
    color: #ffffff;
    font-weight: 700;
    font-size: em(14px);
    text-transform: uppercase;
    transition: transform 0.8s ease-out;
  }

  &:active {
    transition: transform 0.05s ease-in;
    transform: scale(1.1);

    & > .text {
      transition: transform 0.05s ease-in;
      transform: scale(0.9);
    }
  }
}
</style>
