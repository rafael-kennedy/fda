<template>
<div>
  <h2>{{recipe.label}}</h2>
  <loader v-if="loading"></loader>
  <img :src="recipe.image" class="recipe-image"/>
  <ul>
    <li v-for="ingredient in recipe.ingredients">
      {{ingredient.text}}
      <recallBadge :recalls="ingredient.recalls"></recallBadge>
    </li>
  </ul>
</div>
</template>

<script>
import {recallSearch, recipeDetails} from '../module/interface.js'
import loader from './loader.vue'
import recallBadge from './recall-badge.vue'
import throwToBus from '../module/errorbus.js'


export default {
  props: ['recipe'],
  data () {
    return {
      loading: false,
      ingredients: [],
      steps: []
    }
  },
  components: {
    loader,
    recallBadge
  },
  watch: {
    recipe () {
      if (this.recipe.ingredients) {
        this.loading = true
        this.ingredients = this.recipe.ingredients
        this.scanForRecalls()
      }
    }
  },
  methods: {
    scanForRecalls () {
      let termarray = this.ingredients
        .map(i => i.food.split(',')[0])
        .map(term => recallSearch({term: term}))
      termarray.forEach((v, i) => {
        v.then((data) => {
          this.$set(this.ingredients[i], 'recalls', {data, number: data.total})
        })
        .catch((err) => {
          throwToBus(err, `We're having some difficulty contacting the FDA Recalls service right now. This may be due to internet connectivity issues, or the service may be down. Please check your connection, and try again later!`)
          this.$set(this.ingredients[i], 'recalls', {number: "!"})
        })
      })
      Promise.all(termarray).then(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.loading = true
    this.ingredients = this.recipe.ingredients
    this.scanForRecalls()
  }
}
</script>

<style lang="scss">
@import '../sass/variables';

.recipe-prompt {
  &:hover {
    background-color: $secondary;
  }
}
.recipe-image {
  max-height: 12em;
  border-radius: 0.5em;
}
</style>
