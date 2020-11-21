<template>
  <div class="pagination">
    <ul class="pagination__range">
      <li class="pagination__item">
        <slot name="first">
          <button @click="changePage(1)">&#60;&#60;</button>
        </slot>
      </li>
      <li class="pagination__item">
        <slot name="prev" :disabled="!hasPrev" :changePage="changePage">
          <button :disabled="!hasPrev" @click="changePage(current - 1)">
            &#60;
          </button>
        </slot>
      </li>
      <li
        v-for="page in pages"
        :key="page"
        class="pagination__item"
        :class="{ '--active': page === current }"
      >
        <slot name="page" :page="page" :active="page === current" :changePage="changePage">
          <button @click="changePage(page)">
            {{ page }}
          </button>
        </slot>
      </li>
      <li class="pagination__item">
        <slot name="next" :disabled="!hasNext" :changePage="changePage">
          <button :disabled="!hasNext" @click="changePage(current + 1)">&#62;</button>
        </slot>
      </li>
      <li class="pagination__item">
        <slot name="last" :totalPages="totalPages" :changePage="changePage">
          <button @click="changePage(totalPages)">&#62;&#62;</button>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    pageRange: {
      type: Number,
      default: 2
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.total / this.perPage)
    },
    rangeStart () {
      const start = this.current - this.pageRange

      return start > 0
        ? start
        : 1
    },
    rangeEnd () {
      const end = this.current + this.pageRange

      return end < this.totalPages
        ? end
        : this.totalPages
    },
    pages () {
      const range = []
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        range.push(i)
      }

      return range
    },
    hasNext () {
      return this.current < this.totalPages
    },
    hasPrev () {
      return this.current > 1
    }
  },
  watch: {
    totalPages (newTotal) {
      if (newTotal < this.current) {
        this.changePage(this.totalPages)
      }
    }
  },
  methods: {
    changePage (page) {
      if (page > 1 || page < this.totalPages) {
        this.$emit('page-change', page)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  &__range {
    display: flex;
    list-style-type: none;
  }
  &__item {
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #ccc;
      width: 30px;
      height: 30px;
      padding: 0;
      background-color: inherit;
      &:not(:disabled) {
        cursor: pointer;
      }
      &:disabled {
        opacity: .5;
      }
    }
    .--active {
      background-color: red;
    }
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
</style>
