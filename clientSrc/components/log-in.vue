<template>
  <div :class="{error}" v-if="!loggedIn">
    {{error}}
    <input v-model="user.email" placeholder="email" @keyup.enter="login"/>
    <input v-model="user.password" placeholder="password" @keyup.enter="login" type="password"/>
    <button @click="login">Log-in</button>
  </div>
  <div v-else class="logout">
    {{user.email}} <button @click="logOut">Log Out</button>
  </div>

</template>
<script>
import errorBus from '../module/errorbus.js'

export default {
  props: ['loggedIn'],
  data () {
    return {
      user: {},
      error: ''
    }
  },
  methods: {
    login () {
      this.authenticate({
        email: this.user.email,
        strategy: 'local',
        password: this.user.password
      }).then((user) => {
        this.$emit('logIn', user.user)
      }).catch((e) => {
        this.error = e.message
      })
    },
    logOut () {
      this.logout()
      this.$emit('logOut')
    }
  }
}
</script>
<style lang="scss">
@import '../sass/variables';

.logout {
  font-weight: bold;
  color: $primary;
  text-align: right;
}
</style>
