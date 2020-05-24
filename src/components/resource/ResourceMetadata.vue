<template>
  <b-form @submit.prevent.stop="submit">
    <b-form-group
      label="Titre"
      label-for="title"
      label-size="sm"
    >
      <b-form-input
        size="sm"
        id="title"
        v-model="resource.title"
        type="text"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Type" label-for="type" label-size="sm">
      <b-form-select
        id="type"
        v-model="resource.type"
        :options="resourceTypes"
        required
        size="sm"
        value-field="id"
        text-field="label"
      ></b-form-select>
    </b-form-group>

    <b-form-group
      label="Description"
      label-for="description"
      label-size="sm"
      class="markdown-resource"
    >
      <vue-simplemde v-model="resource.description" :configs="{ spellChecker: false }" />
    </b-form-group>

    <b-form-group label="Date de publication" label-for="pub_date" label-size="sm">
      <b-form-datepicker reset-button label-reset-button="Effacer" size="sm" id="pub_date"
        v-model="resource.published" class="mb-2"></b-form-datepicker>
    </b-form-group>

    <b-button type="submit" variant="success">Sauvegarder</b-button>
  </b-form>
</template>

<script>
import VueSimplemde from 'vue-simplemde'

export default {
  components: { VueSimplemde },
  props: {
    dataset: Object,
    resource: Object,
    resourceTypes: Array
  },
  methods: {
    submit () {

    }
  }
}
</script>
