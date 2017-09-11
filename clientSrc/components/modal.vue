<template>
  <div class="modal-dismiss" @click.self="dismiss">
    <div class="modal-content">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    dismiss () {
      this.$emit('dismiss')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/variables';

.modal-dismiss {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: transparentize(lightgrey, 0.6);
}
.modal-content {
  overflow-y: scroll;
  background-color: white;
  box-shadow: 2px 2px 2px darkgrey;
  z-index: 1000;
  width: 90%;
  margin: 1em auto;
  padding: 1em;
  max-height: calc(100% - 4em);
}

</style>
