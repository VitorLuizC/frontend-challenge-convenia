<template>
  <router-link :to="link" class="table-card">
    <img
      class="icon"
      src="~@/assets/icons/table.svg"
      alt="Ícone de mesa"
      title="Ícone de mesa"
    />

    <h4 class="name">{{ name }}</h4>

    <span :class="['status', '-status-' + status]">
      {{ toReadable(status) }}
    </span>
  </router-link>
</template>

<script>
const statuses = [1, 2, 3]

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      required: true,
      validator: statuses.includes.bind(statuses)
    }
  },
  methods: {
    toReadable(status) {
      return {
        1: 'Em uso',
        2: 'Disponível',
        3: 'Indisponível'
      }[status]
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/helpers.scss';

.table-card {
  @include rect(154px, 192px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 11px 0 rgba(37, 44, 97, 0.15),
    0 1px 3px 0 rgba(93, 100, 148, 0.2);
  cursor: pointer;

  & > .icon {
    @include rect(96px);
    margin-top: 20px;
  }

  & > .name {
    margin: 0;
    margin-top: 10px;
    font-size: em(18px);
  }

  & > .status {
    margin-top: 5px;
    font-size: em(12px);

    &.-status-1::before,
    &.-status-2::before,
    &.-status-3::before {
      @include rect(6px);
      background-color: currentColor;
      border-radius: 50%;
      position: absolute;
      transform: translateX(-10px) translateY(5px);
      box-shadow: 0 0 6px;
      content: '';
    }

    &.-status-1::before {
      color: #ffde03;
    }

    &.-status-2::before {
      color: #03dac5;
    }

    &.-status-3::before {
      color: #999999;
    }
  }
}
</style>
