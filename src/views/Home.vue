<template>
  <div class="home">
    <button>Load users table</button>
    <Table />
  </div>
</template>

<script>
import Table from '@/components/common/Table'

export default {
  name: 'Home',
  components: { Table }
}
</script>
