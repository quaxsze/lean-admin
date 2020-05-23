<template>
  <div>
    <h3>{{this.resource.title}}</h3>
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

      <b-form-group
        label="URL"
        label-for="url"
        label-size="sm"
      >
        <b-form-input
          size="sm"
          id="url"
          v-model="resource.url"
          type="text"
          required
          :readonly="isLocal"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Taille"
        label-for="size"
        label-size="sm"
      >
        <b-form-input
          size="sm"
          id="size"
          v-model="resource.filesize"
          type="text"
          :readonly="isLocal"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Format"
        label-for="format"
        label-size="sm"
      >
        <b-form-input
          size="sm"
          id="format"
          v-model="resource.format"
          type="text"
          required
          :readonly="isLocal"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Type mime"
        label-for="title"
        label-size="sm"
      >
        <b-form-input
          size="sm"
          id="title"
          v-model="resource.mime"
          type="text"
          :readonly="isLocal"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="`Somme de contrôle (${resource.checksum.type})`"
        label-for="checksum"
        label-size="sm"
      >
        <b-form-input
          size="sm"
          id="checksum"
          v-model="resource.checksum.value"
          type="text"
          :readonly="isLocal"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success">Sauvegarder</b-button>
    </b-form>
  </div>
</template>

<script>
import VueSimplemde from 'vue-simplemde'

export default {
  name: 'Resource',
  components: { VueSimplemde },
  props: {
    dataset: Object,
    resourceTypes: Array
  },
  data () {
    return {
      resource: this.dataset.resources.find(r => r.id === this.$route.params.rid)
    }
  },
  computed: {
    isLocal () {
      return this.resource.filetype === 'file'
    }
  },
  methods: {
    submit () {

    }
  }
}
</script>

<style>
.markdown-resource .CodeMirror, .markdown-resource .CodeMirror-scroll {
  min-height: 100px;
}
</style>
