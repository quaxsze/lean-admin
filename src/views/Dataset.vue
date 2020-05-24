<template>
  <div class="mt-2">
    <b-alert variant="danger" :show="error">🤕 Oups, on n'a pas pu récupérer ce jeu de données, désolé !</b-alert>
    <div v-if="!error">
      <h2 class="d-inline">{{ dataset.title }}</h2>
      <h5 class="text-muted d-inline"> — {{ producer }}</h5>
      <b-nav class="mt-3 mb-2" pills>
        <b-nav-item :to="`/dataset/${datasetId}`" active-class="active" :exact="true">Métadonnées</b-nav-item>
        <b-nav-item :to="`/dataset/${datasetId}/description`" active-class="active" :exact="true">Description</b-nav-item>
        <b-nav-item :to="`/dataset/${datasetId}/advanced`" active-class="active" :exact="true">Avancé</b-nav-item>
        <b-nav-item :to="`/dataset/${datasetId}/resources`" active-class="active" :exact="true">Fichiers et ressources</b-nav-item>
      </b-nav>
      <router-view :dataset="dataset" v-if="dataset" @dataset-submit="submit"></router-view>
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
      this.$dgfApi.updateDataset(this.dataset).then(() => {
        this.$bvToast.toast('🎉 Modifications sauvegardées', {
          toaster: 'b-toaster-bottom-right',
          autoHideDelay: 5000,
          variant: 'success',
          noCloseButton: true
        })
      }).catch(err => {
        console.error(err)
      })
    }
  },
  computed: {
    producer () {
      if (!this.dataset) return ''
      if (this.dataset.owner) {
        return `${this.dataset.owner.first_name} ${this.dataset.owner.last_name}`
      } else if (this.dataset.organization) {
        return this.dataset.organization.name
      } else {
        return '-'
      }
    }
  },
  mounted () {
    this.$dgfApi.getDataset(this.datasetId).then(dataset => {
      // allows the form to operate when value is empty
      if (!dataset.temporal_coverage) {
        dataset.temporal_coverage = {}
      }
      // fallback to id instead of slug
      if (this.datasetId !== dataset.id) {
        this.$router.replace({ path: this.$route.path.replace(this.datasetId, dataset.id) })
        this.datasetId = dataset.id
      }
      this.dataset = dataset
    }).catch(err => {
      console.error(err)
      this.error = true
    })
  }
}
</script>
