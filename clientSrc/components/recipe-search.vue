<template>
<div>
  <div>
    <div class="search-box">
      <input v-model="search" placeholder="Search for recipes"/>
      <loader v-if="loading"></loader>
    </div>
    <ul v-if="!selected.label && recipes.length" class="results">
      <li class="recipe-prompt"
        @click="selected = recipe"
        v-for="recipe in recipes">
        {{recipe.label.replace(/[Rr]ecipe/,'')}}
      </li>
      <li @mouseover="loadMore" v-if="more" class="load-more">... load more</li>
    </ul>
  </div>
  <div v-if="selected.uri">
    <recipe :recipe="selected"></recipe>
    <h2>Select This Recipe?</h2>
    <button @click="done">Yes</button>
    <button @click="selected = {}">No</button>
  </div>
</div>
</template>

<script>
import {debounce} from 'lodash'
import {recipeSearch} from '../module/interface.js'
import recipe from './recipe.vue'
import loader from './loader.vue'
import throwToBus from '../module/errorbus.js'

export default {
  data () {
    return {
      loading: false,
      search: '',
      recipes: {},
      selected: {},
      page: 1,
      more: false
    }
  },
  watch: {
    search (val) {
      this.debSearch(val)
      this.selected = {}
      this.page = 1
    }
  },
  components: {
    recipe,
    loader
  },
  methods: {
    // TODO dry up debsearch and loadMore
    debSearch: debounce(function(val) {
      this.loading = true
      recipeSearch({term: val})
        .then((data) => {
          this.recipes = data.results.map(v => v.recipe)
          this.more = data.more
          this.loading = false
        }).catch(err => {
          throwToBus(err, `We're having some trouble contacting the Recipe Provider. Please Verify that you have internet access, and try again later.`)
        })
    }, 250),
    loadMore () {
      this.page += 1
      this.loading = true
      recipeSearch({term: this.search, page: this.page})
        .then((data) => {
          this.loading = false
          this.recipes = this.recipes.concat(data.data.hits.map(v => v.recipe))
          this.more = data.data.more
        }).catch((err) => {
          throwToBus(err, `We're having some trouble contacting the Recipe Provider. Please Verify that you have internet access, and try again later.`)
        })
    },
    done () {
      this.$emit('done', this.selected)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/variables';

.results {
  border: 1px solid darkgrey;
  padding-left: 0px;
}
.search-box {
  display: flex;
}
.recipe-prompt, .load-more {
  list-style-type: none;
  padding-top: 0.12em;
  padding-bottom: 0.12em;
  &:hover {
    background-color: $secondary;
  }
}
input {
  width: 100%;
  padding: 0.5em 1em;
  color: white;
  font-weight: bold;
  font-size: larger;
  background-color: $primary;
  border: none;
  box-shadow: inset 2px 2px black;
  border-radius: $br;
}
</style>
