/**
* TODO:
* - move resource upload to $dgf-api
* - handle upload progress if possible
* - remove chunks stuff for now
* - when the API supports it, handle chunked upload https://github.com/opendatateam/udata/issues/2481
* - handle resource update correctly: don't modify the prop directly, use an event to handle it from parent
*/
<template>
  <b-form @submit.prevent.stop="submit">
    <div v-if="isLocal">
      <b-form-group label="Remplacer le fichier" label-for="upload"
        label-cols-lg="2" label-size="lg" description="Vous pouvez glisser déposer le fichier ci-dessus.">
        <b-input-group>
          <b-form-file id="upload" @input="select" v-model="file"></b-form-file>
        </b-input-group>
      </b-form-group>

      <b-overlay :show="processing" no-wrap>
        <template v-slot:overlay>
          <div class="text-center p-4 bg-primary text-light rounded">
            <b-icon icon="cloud-upload" font-scale="4"></b-icon>
            <div class="mb-3">Upload en cours...</div>
            <b-progress
              min="1"
              max="100"
              :value="counter"
              variant="success"
              height="3px"
              class="mx-n4 rounded-0"
            ></b-progress>
          </div>
        </template>
      </b-overlay>
    </div>

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
</template>

<script>
export default {
  props: {
    dataset: Object,
    resource: Object,
    resourceTypes: Array
  },
  data () {
    return {
      processing: false,
      file: null,
      chunks: [],
      uploaded: 0,
      chunksLength: 0
    }
  },
  methods: {
    createChunks () {
      const size = 2048
      const chunks = Math.ceil(this.file.size / size)
      this.chunksLength = chunks
      for (let i = 0; i < chunks; i++) {
        this.chunks.push(this.file.slice(
          i * size, Math.min(i * size + size, this.file.size), this.file.type
        ))
      }
      // push a last empty chunk that will complete the upload process on server side
      this.chunks.push(null)
    },
    select (file) {
      this.processing = true
      this.createChunks()
    },
    upload () {
      const formData = new FormData()
      formData.set('uuid', this.resource.id)
      formData.set('filename', this.file.name)
      formData.set('file', this.file, this.file.name)
      // TODO: move to $dgf-api
      const url = 'http://dev.local:7000/api/1/datasets/5937c5dec751df5a49c153a8/resources/ee3cd2b9-1216-4ddf-8102-557a0c960611/upload/'
      this.$http.post(url, formData).then(res => {
        this.resource = res.body
        this.$bvToast.toast('🎉 Modifications sauvegardées', {
          toaster: 'b-toaster-bottom-right',
          autoHideDelay: 5000,
          variant: 'success',
          noCloseButton: true
        })
        this.processing = false
      }).catch(err => { console.error(err) })
    },
    submit () {
    }
  },
  watch: {
    chunks (n, o) {
      if (n.length > 0) {
        this.upload()
      }
    }
  },
  computed: {
    formData () {
      const formData = new FormData()
      formData.set('uuid', this.resource.id)
      formData.set('totalparts', this.chunksLength)
      formData.set('filename', this.file.name)
      // no `file` for the last chunk (recap on server's end)
      if (this.chunks[0]) {
        // where we're at, minus the fake last chunk
        formData.set('partindex', this.chunksLength - this.chunks.length + 1)
        formData.set('chunksize', this.chunks[0].size)
        formData.set('file', this.chunks[0], this.file.name)
      }
      return formData
    },
    counter () {
      return Math.floor((this.uploaded * 100) / this.file.size)
    },
    isLocal () {
      return this.resource.filetype === 'file'
    }
  }
}
</script>
