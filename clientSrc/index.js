import Vue from 'vue'
import feathers from 'feathers-client'
import io from 'socket.io-client'

import app from './components/app.vue'

const socket = io();
const client = feathers();
client.configure(feathers.hooks());
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication({
  storage: window.localStorage
}));


const users = client.service('users');

Vue.mixin({
  data () {
    return {services: {users}}
  },
  methods: {authenticate: client.authenticate, logout: client.logout}
})

new Vue(app).$mount('#main-content')
