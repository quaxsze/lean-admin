<template>
  <b-form @submit.prevent.stop="submit">
    <b-form-group
      label="Nom"
      label-for="title"
      label-size="sm"
    >
      <b-form-input
        size="sm"
        id="title"
        v-model="dataset.title"
        type="text"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Acronyme"
      label-for="acronym"
      label-size="sm"
    >
      <b-form-input
        size="sm"
        id="acronym"
        v-model="dataset.acronym"
        type="text"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Licence" label-for="license" label-size="sm">
      <b-form-select
        id="license"
        v-model="dataset.license"
        :options="licenses"
        required
        size="sm"
        value-field="id"
        text-field="title"
      ></b-form-select>
    </b-form-group>

    <b-form-group
      label="Tags"
      label-for="tags"
      label-size="sm"
    >
      <TagsInput :tags.sync="dataset.tags"></TagsInput>
    </b-form-group>

    <b-form-group>
      <b-form-checkbox
        id="private"
        v-model="dataset.private"
        name="private"
        :value="true"
        :unchecked-value="false"
        size="sm"
      >
        Jeu de données privé
      </b-form-checkbox>
    </b-form-group>

    <b-button type="submit" variant="success">Sauvegarder</b-button>
  </b-form>
</template>

<script>
import TagsInput from '@/components/TagsInput.vue'

export default {
  name: 'DatasetMetadata',
  components: { TagsInput },
  props: {
    dataset: Object
  },
  data () {
    return {
      licenses: []
    }
  },
  mounted () {
    this.$dgfApi.getLicenses().then(res => {
      this.licenses = res
    })
  },
  methods: {
    submit () {
      this.$emit('dataset-submit')
    }
  }
}
</script>
