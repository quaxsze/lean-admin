<template>
  <b-form @submit="submit">

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
      label="Description du jeu de données"
      label-for="description"
      label-size="sm"
      description="En syntaxe Markdown"
    >
      <b-form-textarea
        size="sm"
        id="description"
        v-model="dataset.description"
        rows="5"
        required
      ></b-form-textarea>
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

    <hr>

    <b-form-group label="Fréquence de mise à jour" label-for="frequency" label-size="sm">
      <b-form-select
        id="frequency"
        v-model="dataset.frequency"
        :options="frequencies"
        required
        size="sm"
        value-field="id"
        text-field="label"
      ></b-form-select>
    </b-form-group>

    <b-form-group label="Date de dernière mise à jour" label-for="frequency_date" label-size="sm">
      <b-form-datepicker reset-button label-reset-button="Effacer" size="sm" id="frequency_date" v-model="dataset.frequency_date" class="mb-2"></b-form-datepicker>
    </b-form-group>

    <b-form-group label="Couverture temporelle" label-size="sm">
      <b-form-group label="De" label-cols-sm="1" label-for="temporal_coverage_start" label-size="sm">
        <b-form-datepicker reset-button label-reset-button="Effacer" size="sm" id="temporal_coverage_start" v-model="dataset.temporal_coverage.start"></b-form-datepicker>
      </b-form-group>
      <b-form-group class="mb-0" label="À" label-cols-sm="1" label-for="temporal_coverage_end" label-size="sm">
        <b-form-datepicker reset-button label-reset-button="Effacer" size="sm" id="temporal_coverage_end" v-model="dataset.temporal_coverage.end"></b-form-datepicker>
      </b-form-group>
    </b-form-group>

    <b-form-group
      label="Couverture spatiale"
      label-for="spatial-zones"
      label-size="sm"
    >
      <GeozoneInput :tags.sync="dataset.spatial.zones"></GeozoneInput>
    </b-form-group>

    <b-form-group label="Granularité spatiale" label-for="granularity" label-size="sm">
      <b-form-select
        id="granularity"
        v-model="dataset.spatial.granularity"
        :options="granularities"
        required
        size="sm"
        value-field="id"
        text-field="name"
      ></b-form-select>
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
import GeozoneInput from '@/components/GeozoneInput.vue'

export default {
  name: 'DatasetMeta',
  components: { TagsInput, GeozoneInput },
  props: {
    dataset: Object
  },
  data () {
    return {
      licenses: [],
      frequencies: [],
      granularities: []
    }
  },
  mounted () {
    this.$dgfApi.getLicenses().then(res => {
      this.licenses = res
    })
    this.$dgfApi.getFrequencies().then(res => {
      this.frequencies = res
    })
    this.$dgfApi.getSpatialGranularities().then(res => {
      this.granularities = res
    })
  },
  methods: {
    submit () {

    }
  }
}
</script>
