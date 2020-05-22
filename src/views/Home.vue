<template>
  <div class="home">
    <button @click="login" v-if="!isAuthenticated">Login</button>
    <button @click="logout" v-if="isAuthenticated">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isAuthenticated: false
    }
  },
  mounted () {
    this.isAuthenticated = this.$dgfAuth.isAuthenticated()
  },
  methods: {
    login () {
      this.$dgfAuth.login()
    },
    logout () {
      this.$dgfAuth.logout()
      this.isAuthenticated = false
    }
  }
}
</script>
