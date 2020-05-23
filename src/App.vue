<template>
  <div id="app" class="container">
    <b-navbar toggleable="lg" variant="dark" type="dark">
      <b-navbar-brand href="#">lean-admin</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item @click="logout">Déconnexion</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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

<style>
</style>
