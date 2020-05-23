<template>
  <router-view :dataset="dataset" :resource-types="resourceTypes"></router-view>
</template>

<script>
export default {
  props: {
    dataset: Object
  },
  data () {
    return {
      resourceTypes: []
    }
  },
  mounted () {
    this.$dgfApi.getResourceTypes().then(res => {
      this.resourceTypes = res
    })
  }
}
</script>
