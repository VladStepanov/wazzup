<template>
  <div class="table">
    <input
      type="text"
      v-model.trim="searchValue"
      placeholder="Найти"
    >
    <table>
      <thead>
        <tr>
          <td
            class="table__head"
            v-for="(head, i) in headers"
            :key="head.label + i"
            @click="sortBy(head.field)"
          >
            {{ head.label }}
            <span v-if="sortColumn === head.field && sortDirection">
              <template v-if="sortDirection === 'asc'">&#9650;</template>
              <template v-else-if="sortDirection === 'desc'">&#9660;</template>
            </span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in paginatedRows" :key="i" @click="$emit('click:row', row)">
          <td v-for="(el, key) in row" :key="key">
            <slot :name="`col.${key}`" :row="row">
              {{ el }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination__wrapper">
      <Pagination
        :current="currentPage"
        :page-range="0"
        :per-page="perPage"
        :total="searchedRows.length"
        @page-change="page => currentPage = page"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/common/Pagination'

export default {
  name: 'Table',
  components: { Pagination },
  props: {
    headers: {
      type: Array,
      validator: (headers) => headers.every(head => head.field && head.label),
      default: () => ([])
    },
    rows: {
      type: Array,
      default: () => []
    },

    // pagination
    perPage: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      // sort
      sortColumn: '',
      sortDirection: 'asc',

      // pagination
      currentPage: 1,

      // search
      searchValue: ''
    }
  },
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
    },
    searchedRows () {
      return this.sortedRows.filter(row => {
        return Object.values(row)
          .some(rowValue => String(rowValue).toLowerCase().includes(this.searchValue.toLowerCase()))
      })
    },
    paginatedRows () {
      return this.searchedRows.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
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
.pagination__wrapper {
  display: flex;
  justify-content: center;
}
</style>
