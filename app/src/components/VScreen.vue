<template>
  <section :class="['v-screen', containerClass]">
    <nav class="navigation">
      <v-arrow
        v-if="backTo"
        class="arrow"
        direction="left"
        @click="$router.push(backTo)"
      />
      <h1 class="title">{{ title }}</h1>
    </nav>

    <main :class="['content', contentClass]">
      <slot />
    </main>
  </section>
</template>

<script>
import VArrow from '@/components/VArrow.vue'

export default {
  components: { VArrow },
  props: {
    title: String,
    backTo: [String, Object, Number],
    contentClass: String,
    containerClass: String
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.v-screen {
  & > .navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;

    @media screen and (min-width: 768px) {
      @include block-center-vertical(flex);
      width: 768px;
    }

    & > .arrow {
      cursor: pointer;
    }

    & > .title {
      width: 100%;
      font-size: em(24px);
      text-align: center;
    }

    & > .arrow + .title {
      width: calc(100% - 30px);
    }
  }

  & > .content {
    @media screen and (min-width: 768px) {
      @include block-center-vertical();
      width: 768px;
    }
  }
}
</style>
