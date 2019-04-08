<template>
  <router-link :to="link" class="bill-card">
    <h4 class="name">{{ name }}</h4>
  </router-link>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.bill-card {
  @include flex-center();
  width: 100%;
  height: 96px;
  background-color: rgba(#000, 20%);

  & > .name {
    margin: 0;
  }
}
</style>
