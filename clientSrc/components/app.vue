<template>
  <div>
    <errorModal></errorModal>
    <div class="top-bar">
      <breadcrumb :step="step" @setStep="setStep"></breadcrumb>
      <div>
        <logIn @logIn="setUser" :loggedIn="!!user.email" @logOut="setUser(null)"></logIn>
        <p class="timeleft">
          {{timeleft}}
        </p>
      </div>
    </div>
    <div v-if="step === 0">
      <h1>Welcome to the birthday recipe minder!</h1>
      <p>
        Log In above to get started!
      </p>
    </div>
    <div class="main-content">
      <div class="step-1 panel" v-if="step === 1">
        <h2>Step 1: Select Birthday</h2>
        <birthday :user="user" v-if="user.email" @done="setBirthday"></birthday>
      </div>
      <div class="step-2 panel" v-if="step === 2">
        <h2>Step 2: Find a Recipe</h2>
        <p>
          Search for the recipe that you want to make for your birthday party in the box below!
        </p>
        <recipeSearch @done="setRecipe"></recipeSearch>
      </div>
      <div class="step-3 panel"  v-if="step === 3">
        <h2>Step 3: Make Recipe</h2>
        <p>
          Great! Now it's time to prepare your recipe! This link will open the recipe in a new tab.
        </p>
        <a :href="recipe.url" target="_blank">Click here for the original Recipe!</a>
      </div>
    </div>
  </div>
</template>
<script>
import logIn from './log-in.vue'
import birthday from './birthday.vue'
import recipeSearch from './recipe-search.vue'
import breadcrumb from './breadcrumb.vue'
import errorModal from './error-modal.vue'

export default {
  data () {
    return {
      user: {},
      recipe: {},
      step: 0,
      timeleft: ''
    }
  },
  methods: {
    // debug () {
    //   debugger
    // },
    setStep (step) {
      this.step = step
    },
    setUser (user) {
      if (user) {
        this.user = user
        this.step = 1
      } else {
        this.user = {}
        this.step = 0
      }
    },
    setBirthday(timeleft) {
      this.step = 2
      this.timeleft = timeleft
    },
    setRecipe (recipe) {
      this.step = 3
      this.recipe = recipe
    }
  },
  components: {
    logIn,
    birthday,
    recipeSearch,
    breadcrumb,
    errorModal
  }
}
</script>
<style lang="scss">
@import '../sass/variables';

.main-content {
  @media (max-width: 800px) {
    width: 90%;
  }
  width: 60%;
  margin: auto;
  margin-bottom: 12em;
}
.panel {
  box-shadow: $shadow;
  border-radius: $br;
  margin: 1em;
  padding: 1.5em;
  padding-bottom: 2em;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  border-bottom: solid $primary;
  min-height: 3em;
}
* {
  font-family: $font-stack;
}
button {
  padding: 0.5em 1em;
  background-color: $primary;
  color: white;
  border-radius: calc($br * 0.5);
  border: none;
  &:hover {
    background-color: darken($primary, 10%);
  }
}
.timeleft {
  font-size: smaller;
  color: $primary;
  box-sizing: border-box;
  margin: 0;
}
</style>
