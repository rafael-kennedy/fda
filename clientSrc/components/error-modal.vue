<template>
  <modal v-if="errors.length">
    <div class="content">

    <a href="#" title="dismiss all errors" @click="errors = []">Dismiss all</a>
    <div v-for="(error, i) in errors">
      <a href="#" title="dismiss" class="dismiss" @click="errors.splice(i, 1)">x</a>
      <p>
        {{error}}
      </p>
    </div>
  </div>
  </modal>
</template>

<script>
import {errorBus} from '../module/errorbus.js'
import modal from './modal.vue'

export default {
  data () {
    return {
      errors: []
    }
  },
  created () {
    errorBus.$on('error', (msg, err) => {
      // debugger
      this.errors.push(msg)
    })
  },
  components: {
    modal
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/variables';

a {
  text-decoration: none;
  font-weight: bold;
  text-align: right;
  color: red;
}
p {
  font-weight: bold;
  color: darkred;
  border-bottom: 2px solid red;
}
.content {
  padding: 2em;
  border-radius: 1em;
  margin: 2em;
  background-color: white;
}
</style>
