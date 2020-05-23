<template>
  <div>
    <b-table selectable small striped hover @row-selected="onSelect"
      :items="resources" :fields="fields" sort-by="Modifié" :sort-desc="true">
    </b-table>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'DatasetResources',
  props: {
    dataset: Object
  },
  data () {
    return {
      fields: [
        { key: 'Titre', sortable: true },
        { key: 'Type', sortable: true },
        { key: 'Format', sortable: true },
        { key: 'Taille', sortable: true },
        { key: 'Modifié', sortable: true }
      ]
    }
  },
  computed: {
    resources () {
      return this.dataset.resources.map(r => {
        return {
          id: r.id,
          Titre: r.title,
          Format: r.format,
          Type: r.type,
          Taille: this.fileSizeSI(r.filesize),
          Créé: this.formatDate(r.created_at),
          Modifié: this.formatDate(r.last_modified)
        }
      })
    }
  },
  methods: {
    onSelect (rows) {
      this.$router.push(`${this.$route.path}/${rows[0].id}`)
    },
    fileSizeSI (size) {
      const e = (Math.log(size) / Math.log(1e3)) | 0
      return +(size / Math.pow(1e3, e)).toFixed(2) + ' ' + ('kMGTPEZY'[e - 1] || '') + 'B'
    },
    lead0 (str) {
      return ('0' + str).slice(-2)
    },
    formatDate (date) {
      const dobj = new Date(date)
      return `${dobj.getFullYear()}-${this.lead0(dobj.getMonth())}-${this.lead0(dobj.getDate())} ${this.lead0(dobj.getHours())}:${this.lead0(dobj.getMinutes())}`
    }
  }
}
</script>
