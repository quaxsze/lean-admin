// TODO: mutualize with TagsInput.vue

<template>
  <div>
    <vue-tags-input :validation="validation" :placeholder="placeholder"
      v-model="query" :tags="localTags" :autocomplete-items="items"
      @tags-changed="update">
    </vue-tags-input>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  name: 'TagsInput',
  components: {
    VueTagsInput
  },
  props: {
    tags: Array,
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      query: '',
      items: [],
      localTags: this.tags.map(i => { return { id: i, text: i } }),
      debounce: null,
      validation: [{
        classes: 'min-length',
        rule: tag => tag.text.length < 3
      }]
    }
  },
  watch: {
    query: 'autocomplete'
  },
  methods: {
    update (newTags) {
      this.items = []
      this.localTags = newTags
      const validTags = this.localTags.filter(i => i.tiClasses.indexOf('ti-valid') !== -1)
      this.$emit('update:tags', validTags.map(i => i.id))
    },
    autocomplete () {
      if (this.query.length < 3) return
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        return this.$dgfApi.suggestSpatialZones(this.query).then(res => {
          this.items = res.map(i => {
            return {
              text: i.name,
              ...i
            }
          })
        })
      }, 300)
    }
  }
}
</script>

<style scoped>
.vue-tags-input {
  max-width: none;
}
</style>
