<template>
  <div class="home">
    <button @click="fetchUsers">Load users table</button>
    <ClosableModal v-model="isModalOpen">
      <template v-if="modalPayload">
        <p>Имя: {{ modalPayload.fullname }}</p>
        <p>Адрес: {{ modalPayload.address }}</p>
      </template>
    </ClosableModal>

    <Promised :promise="usersFetchingPromise">
      <template #pending>
        <Loader />
      </template>

      <template #rejected="error">
        {{ error.message }}
      </template>

      <template #default>
        <div class="table__wrapper">
          <Table
            :rows="users"
            :headers="headers"
            :per-page="10"
            @click-row="handleRowClick"
          >
            <template #col.email="{ row }">{{ row.email }}</template> <!-- if we wanna style specific col -->
          </Table>
        </div>
      </template>
    </Promised>
  </div>
</template>

<script>
import Loader from '@/components/common/Loader'
import Table from '@/components/common/Table'
import ClosableModal from '@/components/Modals/ClosableModal'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: { Loader, Table, ClosableModal },
  data: () => ({
    isModalOpen: false,
    modalPayload: null,

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
    },
    handleRowClick (row) {
      this.isModalOpen = true
      this.modalPayload = row
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
