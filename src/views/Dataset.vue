<template>
  <div class="mt-2">
    <b-alert variant="danger" :show="error">🤕 Oups, on n'a pas pu récupérer ce jeu de données, désolé !</b-alert>
    <div v-if="!error">
      <h2>{{ dataset.title }}</h2>
      <b-nav class="mt-2 mb-2" pills>
        <b-nav-item :to="`/dataset/${datasetId}`" active-class="active" :exact="true">Métadonnées</b-nav-item>
        <b-nav-item :to="`/dataset/${datasetId}/resources`" active-class="active" :exact="true">Ressources</b-nav-item>
      </b-nav>
      <router-view :dataset="dataset" v-if="dataset"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dataset',
  components: {},
  data () {
    return {
      dataset: '',
      error: false,
      datasetId: this.$route.params.id
    }
  },
  methods: {
    submit () {

    }
  },
  mounted () {
    this.$dgfApi.getDataset(this.datasetId).then(res => {
      this.dataset = res
    }).catch(err => {
      console.error(err)
      this.error = true
    })
  }
}
</script>
