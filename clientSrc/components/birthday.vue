<template>
<div class="birthday-form">
  <h1>Welcome!</h1>
  <div v-if="user.birthday">
    <p>
      We have your birthday listed as: {{humanized}}. Is that correct?
    </p>
    <button @click="done">Yes</button>
    <button @click="user.birthday = null">No</button>
  </div>
  <div v-else>
    Please Enter your birthday!
    <select class="y" v-model="y" placeholder="Year">
      <option v-for="yearOption in yearOptions" :value="yearOption">
        {{yearOption}}
      </option>
    </select>
    <select class="m" v-model="m" placeholder="Month">
      <option v-for="monthOption in monthOptions" :value="monthOption">
        {{monthOption}}
      </option>
    </select>
    <select class="d" v-model="d" placeholder="Day">
      <option v-for="dayOption in dayOptions" :value="dayOption">
        {{dayOption}}
      </option>
    </select>
    <button @click="setBirthday">OK</button>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import throwToBus from '../module/errorbus.js'

export default {
  props: ['user'],
  data () {
    return {
      birthday: this.user.birthday || moment()
    }
  },
  methods: {
    done () {
      this.$emit('done', this.timeleft)
    },
    setBirthday() {
      this.services.users.patch(this.user._id, {birthday: this.birthday}).then((res) => {
        this.done()
      }).catch((err) => {
        throwToBus(err, `We're having trouble contacting our services right now. Please check the internet connection and try again later.`)
      })
    }
  },
  computed: {
    humanized () {
      return moment(this.birthday).format('MMMM DD YYYY')
    },
    m: {
      set (val) {
        this.birthday = moment(this.birthday).month(val)
      },
      get () {
        return  moment(this.birthday).format('MMMM')
      }
    },
    monthOptions () {
      return moment.months()
    },
    d: {
      set (val) {
        this.birthday = moment(this.birthday).date(val)
      },
      get () {
        return moment(this.birthday).date()
      }
    },
    dayOptions () {
      return moment(this.birthday).daysInMonth()
    },
    y: {
      set (val) {
        this.birthday = moment(this.birthday).year(val)
      },
      get () {
        return moment(this.birthday).format('YYYY')
      }
    },
    yearOptions () {
      let cYear = Number(moment().format('YYYY'))
      return Array.from(new Array(100),(v,i) => cYear - i);
    },
    timeleft () {
      let nextBDay = moment().date(this.d).month(this.m)
      if (nextBDay.isBefore(moment())) {
        nextBDay.add(1, 'year')
      }
      let duration = moment().diff(nextBDay)
      return `There's only ${moment.duration(duration).humanize()} until your birthday!`
    }
  }
}
</script>
