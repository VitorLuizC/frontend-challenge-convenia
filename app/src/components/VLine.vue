<template>
  <hr class="v-line" />
</template>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.v-line {
  @include rect(100%, 1px);
  box-sizing: border-box;
  margin: 18px 0;
  border: 0;
  padding: 0 12px;
  background-clip: content-box;
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(#222, 0.4) 5% 95%,
    transparent 100%
  );
}
</style>
