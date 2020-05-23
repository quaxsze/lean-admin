<template>
  <b-form @submit.prevent.stop="submit">
    <vue-simplemde v-model="dataset.description" :configs="config" />
    <b-button type="submit" variant="success">Sauvegarder</b-button>
  </b-form>
</template>

<script>
import VueSimplemde from 'vue-simplemde'

export default {
  name: 'DatasetDescription',
  components: { VueSimplemde },
  props: {
    dataset: Object
  },
  data () {
    return {
      config: {
        spellChecker: false
      }
    }
  },
  mounted () {
  },
  methods: {
    submit () {
      this.$emit('dataset-submit')
    }
  }
}
</script>

<style scoped>
  @import '~simplemde/dist/simplemde.min.css';
</style>
