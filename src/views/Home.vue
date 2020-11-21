<template>
  <div class="home">
    <button @click="fetchUsers">Load users table</button>
    <Promised :promise="usersFetchingPromise">
      <template #pending>
        <Loader />
      </template>
      <template>
        <div class="table__wrapper">
          <Table :rows="users" :headers="headers">
            <!-- if we wanna style specific col -->
            <template #col.email="{ row }">{{ row.email }}</template>
          </Table>
        </div>
      </template>
      <template #rejected="error">
        {{ error.message }}
      </template>
    </Promised>
  </div>
</template>

<script>
import Loader from '@/components/common/Loader'
import Table from '@/components/common/Table'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: { Loader, Table },
  data: () => ({
    usersFetchingPromise: null,
    headers: [
      {
        label: 'Id',
        field: 'id'
      },
      {
        label: 'Полное имя',
        field: 'fullname'
      },
      {
        label: 'Компания',
        field: 'company'
      },
      {
        label: 'Почта',
        field: 'email'
      },
      {
        label: 'Юзернейм',
        field: 'uname'
      }
    ]
  }),
  computed: {
    ...mapState({
      users: state => state.usersModule.users
    })
  },
  methods: {
    fetchUsers () {
      this.usersFetchingPromise = this.$store.dispatch('usersModule/fetchUsers')
    }
  }
}
</script>

<style scoped lang="scss">
.table__wrapper {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
