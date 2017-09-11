<template>
  <span>
    <span class="recall-badge warn"
      v-if="recalls.number !== 0"
      :title="getTitle(recalls)"
      @click="fetchDetails">{{recalls.number}}</span>
    <span class="recall-badge ok"
      :title="getTitle(recalls)" v-else>{{recalls.number}}</span>
      <modal v-if="currentDetails.length" @dismiss="clear">
        <div class="content">
          <table>
            <thead>
              <th>Class</th>
              <th>Reason For Recall</th>
              <th>Product Description</th>
            </thead>
            <tr v-for="(detail, index) in currentDetails" v-if="currentDetails.length" @click="">
              <td>
                {{detail.classification.replace('Class ', '')}}
              </td>
              <td>
                {{detail.reason_for_recall}}
              </td>
              <td>
                {{detail.product_description}}
              </td>
            </tr>
          </table>
          <a href="#" @click="fetchDetails" v-if="more">Load More ...</a>
        </div>
      </modal>
  </span>
</template>

<script>
import throwToBus from '../module/errorbus.js'
import modal from './modal.vue'
// TODO: break display table out into its own component

export default {
  props: ['recalls'],
  data () {
    return {
      currentDetails: [],
      page: 0,
      more: true
    }
  },
  methods: {
    clear () {
      this.currentDetails = [],
      this.page = 0
    },
    getTitle (recalls) {
      if (recalls.number === 0) {
        return `You're good to go!`
      } else if (recalls.number === '!'){
        return `We don't know if there are any recalls for this food right now.`
      } else if (recalls.number === 1){
        return `Watch out! there is an ongoing recall that might be related to this ingredient!`
      } else return `Watch out! there are ${recalls.number} ongoing recalls that might be related to this ingredient!`
    },
    fetchDetails (el) {
      // TODO: Scroll to bottom of container on fetch
      this.page += 1
      this.recalls.data.getDetails(this.page).then((details) => {
        details.results.forEach((line) => {
          this.currentDetails.push(line)
        })
        this.more = details.more
      }).catch((err) => {
        throwToBus(err, "Sorry, We're having some trouble contacting the FDA service right now. Please check your internet connection or try again later!")
      })
    },
  },
  components: {
    modal
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/variables';

.recall-badge {
  font-size: 60%;
  font-weight: bold;
  padding: 0 0.5em;
  border-radius: 0.5em;
  color: white;
}
.ok {
  background-color: green;
}
.warn {
  background-color: red;
}

tr {
  vertical-align: top;
  &:nth-child(even) {
    background-color: $secondary;
  }
}
td {
  padding: 0px;
  padding: 0 0.5em;
  &:nth-child(2) {
    width: 35%;
  }
}
</style>
