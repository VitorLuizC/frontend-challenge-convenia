<template>
  <div v-on="$listeners" :class="['v-arrow', '-' + direction]">
    <figure class="arrow">
      <img src="~@/assets/icons/caret.svg" class="icon" />
    </figure>
  </div>
</template>

<script>
const directions = ['up', 'right', 'down', 'left']

export default {
  props: {
    direction: {
      type: String,
      default: 'left',
      validator: directions.includes.bind(directions)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

$v-arrow-directions: (
  left: 0,
  up: 90deg,
  right: 180deg,
  down: 270deg
);

.v-arrow {
  @include frame(30px, 30px, 8px, 14px);
  border-radius: 30px;
  transition: transform 0.5s ease-out, background-color 0.5s ease-in;

  > .arrow {
    @include rect(8px, 14px);
    transition: transform 0.5s ease-out;

    > .icon {
      @include rect(100%);
      transition: transform 0.5s ease-in;
    }
  }

  &:active {
    background-color: rgba(#000, 0.1);
    transform: scale(1.25);
    transition: transform 0.03s ease-in, background-color 0.03s ease-in;

    & > .arrow {
      transform: scale(0.75);
      transition: transform 0.03s ease-in;
    }
  }

  @each $direction, $degrees in $v-arrow-directions {
    &.-#{$direction} > .arrow > .icon {
      transform: rotate($degrees);
    }
  }
}
</style>
