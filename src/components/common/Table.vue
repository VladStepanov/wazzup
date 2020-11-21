<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <td
            class="table__head"
            v-for="(head, i) in headers"
            :key="head.label + i"
            @click="sortBy(head.field)">
            {{ head.label }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in sortedRows" :key="i" @click="$emit('click:row', row)">
          <td v-for="(el, key) in row" :key="key">
            <slot :name="`col.${key}`" :row="row">
              {{ el }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    sortColumn: '',
    sortDirection: 'asc'
  }),
  computed: {
    filteredRows () {
      // Include only described in headers row fields
      return this.rows.map(row => {
        return Object.fromEntries(Object.entries(row).filter(([key, value]) => {
          return this.headers.some(head => head.field === key)
        }))
      })
    },
    sortedRows () {
      return [...this.filteredRows].sort((a, b) => {
        let modifier = 1
        if (this.sortDirection === 'desc') modifier = -1
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier
        return 0
      })
    }
  },
  methods: {
    sortBy (field) {
      if (this.sortColumn === field) {
        this.sortDirection = this.sortDirection === 'asc'
          ? 'desc'
          : 'asc'
        return
      }

      this.sortColumn = field
      this.sortDirection = 'asc'
    }
  }
}
</script>

<style scoped lang="scss">
.table {
  &__head {
    cursor: pointer;
  }
}
</style>
