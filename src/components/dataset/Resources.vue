<template>
  <div v-if="dataset">
    <h1>Ressources</h1>
    {{ dataset.title }}
  </div>
</template>

<script>

export default {
  name: 'DatasetResources',
  props: {
    dataset: Object
  }
}
</script>
