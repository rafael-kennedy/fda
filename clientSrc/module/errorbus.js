import Vue from 'vue'

export const errorBus = new Vue()

export default function(err, msg) {
  errorBus.$emit('error', msg, err)
}
