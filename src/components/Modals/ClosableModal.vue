<template>
  <BaseModal #default="{ closeModal }" v-bind="$attrs" v-on="$listeners">
    <div class="header">
      <button @click="closeModal">&#10006;</button>
    </div>
    <slot />
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/Modals/BaseModal'

export default {
  name: 'ClosableModal',
  inheritAttrs: false,
  components: { BaseModal }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 12px 0;
}
</style>
