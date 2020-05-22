<template>
  <div>
    <h1></h1>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
  },
  mounted () {
    this.$dgfAuth.receive().then(res => {
      console.log('logged in')
    }).catch(err => {
      console.log('error', err)
    }).finally(() => {
      this.$router.push('/')
    })
  }
}
</script>
