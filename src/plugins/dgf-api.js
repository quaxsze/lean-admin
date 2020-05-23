class APILib {
  constructor (options, http) {
    this.options = options
    this.http = http
    const protocol = this.options.protocol || 'https'
    this.serverURL = `${protocol}://${this.options.domain}`
  }

  _get (path, params) {
    params = params || {}
    // TODO: handle errors
    return this.http.get(`${this.serverURL}/api/1/${path}`, { params: params }).then(res => {
      return res.body
    })
  }

  getDataset (id) {
    return this._get(`datasets/${id}/`)
  }

  getLicenses () {
    return this._get('datasets/licenses/')
  }

  getFrequencies () {
    return this._get('datasets/frequencies/')
  }

  getSpatialGranularities () {
    return this._get('spatial/granularities')
  }

  suggestTags (query) {
    console.log(query)
    return this._get('tags/suggest', { q: query })
  }

  suggestSpatialZones (query) {
    console.log(query)
    return this._get('spatial/zones/suggest', { q: query })
  }
}

const DGFApi = {
  install (Vue, options) {
    if (!Vue.http) {
      return console.error('dgf-api requires vue-resource')
    }
    Vue.prototype.$dgfApi = new APILib(options, Vue.http)
  }
}

export default DGFApi

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(DGFApi)
}
