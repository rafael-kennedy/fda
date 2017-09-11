<template>
<div class="breadcrumb">
  <div v-if="step >= 1" @click="setStep(1)" class="crumb" :class="{active: step === 1}">1: Enter Your Birthday</div>
  <div v-if="step >= 2" @click="setStep(2)" class="crumb" :class="{active: step === 2}">2: Select a Recipe</div>
  <div v-if="step >= 3" @click="setStep(3)" class="crumb" :class="{active: step === 3}">3: Prepare the Recipe</div>
</div>
</template>

<script>
export default {
  props: ['step'],
  methods: {
    setStep (step) {
      this.$emit('setStep', step)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/variables';


.crumb {
  background-color: $secondary;
  font-weight: bold;
  padding: 0.5em 1em;
  text-decoration: none;
  border-radius: 0.25em;
  color: $primary;
  border: solid 2px darken($secondary, 0.25);
  margin-right: 1em;
  &.active {
    color: white;
    background-color: $primary;
    border: solid 2px darken($primary, 0.25);
  }
}
.breadcrumb {
  margin: 1em;
  display: flex;
  flex-wrap: wrap;
}
</style>
