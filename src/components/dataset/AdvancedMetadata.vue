<template>
  <b-form @submit.prevent.stop="submit">
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
      <b-form-datepicker reset-button label-reset-button="Effacer" size="sm" id="frequency_date"
        v-model="dataset.frequency_date" class="mb-2"></b-form-datepicker>
    </b-form-group>

    <b-form-group label="Couverture temporelle" label-size="sm">
      <b-form-group label="De" label-cols-sm="1" label-for="temporal_coverage_start" label-size="sm">
        <b-form-datepicker reset-button label-reset-button="Effacer" size="sm" id="temporal_coverage_start"
          v-model="dataset.temporal_coverage.start"></b-form-datepicker>
      </b-form-group>
      <b-form-group class="mb-0" label="À" label-cols-sm="1" label-for="temporal_coverage_end" label-size="sm">
        <b-form-datepicker reset-button label-reset-button="Effacer" size="sm" id="temporal_coverage_end"
          v-model="dataset.temporal_coverage.end"></b-form-datepicker>
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

    <b-button type="submit" variant="success">Sauvegarder</b-button>
  </b-form>
</template>

<script>
import GeozoneInput from '@/components/GeozoneInput.vue'

export default {
  name: 'DatasetAdvancedMetadata',
  components: { GeozoneInput },
  props: {
    dataset: Object
  },
  data () {
    return {
      frequencies: [],
      granularities: []
    }
  },
  mounted () {
    this.$dgfApi.getFrequencies().then(res => {
      this.frequencies = res
    })
    this.$dgfApi.getSpatialGranularities().then(res => {
      this.granularities = res
    })
  },
  methods: {
    submit () {
      this.$emit('dataset-submit')
    }
  }
}
</script>
