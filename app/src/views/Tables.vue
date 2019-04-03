<template>
  <main class="tables-view">
    <form class="filter">
      Contas abertas
      <input
        type="checkbox"
        :checked="status === 'OPEN'"
        @click="status = status !== 'OPEN' ? 'OPEN' : undefined"
      />
    </form>

    <section class="results">
      <router-link
        v-for="table in tablesFilteredByStatus"
        :to="'/table/' + table.id"
        :key="table.id"
        class="item"
      >
        <h4 class="name">{{ table.name }}</h4>
      </router-link>
    </section>
  </main>
</template>

<script>
const tables = [
  {
    id: 1,
    name: '1',
    status: 'OPEN'
  },
  {
    id: 2,
    name: '2',
    status: 'CLOSED'
  }
]

export default {
  data() {
    return {
      tables: [],
      status: undefined
    }
  },
  computed: {
    tablesFilteredByStatus() {
      if (!this.status) {
        return this.tables
      }
      return this.tables.filter((table) => table.status === this.status)
    }
  },
  mounted() {
    this.tables = tables
  }
}
</script>
