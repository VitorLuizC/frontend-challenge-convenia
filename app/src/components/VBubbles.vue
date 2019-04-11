<template>
  <div class="v-bubbles">
    <div v-for="index in 5" :key="index" class="bubble" />
  </div>
</template>

<style lang="scss">
.v-bubbles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & > .bubble {
    width: 24px;
    height: 24px;
    background: #6c5ce7;
    border-radius: 100%;
    display: inline-block;
    animation: v-bubbles-slide 1s infinite;

    @for $number from 1 through 5 {
      &:nth-child(#{$number}) {
        animation-delay: (0.1s * $number);
        background: change-color(#6c5ce7, $red: (red(#6c5ce7) + 20 * $number));
      }
    }
  }
}

@keyframes v-bubbles-slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
