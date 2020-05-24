<template>
  <div>
    <b-nav class="mt-3 mb-2" pills>
      <b-nav-item disabled>Ressources > {{ resource.title }}</b-nav-item>
      <b-nav-item :to="`/dataset/${this.dataset.id}/resources/${this.resource.id}`" active-class="active" :exact="true">Métadonnées</b-nav-item>
      <b-nav-item :to="`/dataset/${this.dataset.id}/resources/${this.resource.id}/file`" active-class="active" :exact="true">Fichier ou ressource distante</b-nav-item>
    </b-nav>
    <router-view :dataset="dataset" :resource="resource" :resource-types="resourceTypes"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Resource',
  props: {
    dataset: Object,
    resourceTypes: Array
  },
  data () {
    return {
      resource: this.dataset.resources.find(r => r.id === this.$route.params.rid)
    }
  }
}
</script>

<style>
.markdown-resource .CodeMirror, .markdown-resource .CodeMirror-scroll {
  min-height: 100px;
}
</style>
