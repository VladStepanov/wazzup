<template>
  <portal v-if="value" to="root">
    <div class="modal__overlay" @click.self="closeModal">
      <div class="modal">
        <slot :closeModal="closeModal" />
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    document.addEventListener('keydown', this.handleKeyPress)
  },
  destroyed () {
    document.removeEventListener('keydown', this.handleKeyPress)
  },
  methods: {
    closeModal () {
      this.$emit('input', false)
    },
    handleKeyPress (e) {
      if (e.key === 'Escape') {
        this.closeModal()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: absolute;
  background-color: #fff;
  min-width: 400px;
  max-width: 80%;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #ccccccbb;
  }
}
</style>
