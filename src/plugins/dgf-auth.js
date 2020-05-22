class AuthLib {
  constructor (options, http) {
    this.options = options
    this.http = http
    const protocol = this.options.protocol || 'https'
    this.serverURL = `${protocol}://${this.options.domain}`
  }

  _getBaseUrl () {
    const port = window.location.port
    return window.location.protocol + '//' + window.location.hostname + (port ? ':' + port : '')
  }

  isAuthenticated () {
    // TODO: handle expiration
    return !!localStorage.dgfToken
  }

  /**
   * Handle the response from the login workflow
   */
  receive () {
    return new Promise((resolve, reject) => {
      const hash = new URLSearchParams(window.location.hash.replace('#', ''))
      if (!hash.has('access_token')) {
        return reject(new Error('No token found'))
      }
      localStorage.dgfToken = hash.get('access_token')
      if (hash.has('expires_in')) {
        localStorage.dgfTokenExpires = (new Date()).getTime() + parseInt(hash.get('expires_in')) * 1000
      }
      return this.http.get(`${this.serverURL}/api/1/me/`).then(resolve, reject)
    })
  }

  /**
   * Launches the login workflow
   */
  login (state) {
    state = state ? JSON.stringify(state) : JSON.stringify({})
    state = encodeURIComponent(state)
    const redirectURI = encodeURIComponent(`${this._getBaseUrl()}${this.options.redirect}`)
    const serverURL = `${this.serverURL}/fr/oauth/authorize`
    const clientId = this.options.clientId
    window.location = `${serverURL}?redirect_uri=${redirectURI}&response_type=token&client_id=${clientId}&scope=default&grant_type=implicit&state=${state}`
  }

  /**
   * Deletes the local token and revoke it from the server
   * FIXME: does not work on server side (probably because missing @csrf.exempt)
   */
  logout () {
    return new Promise((resolve, reject) => {
      const serverURL = `${this.serverURL}/oauth/revoke/`
      this.http.post(serverURL, { token: localStorage.dgfToken }, { emulateJSON: true })
        .then(resolve, reject)
        .finally(() => {
          delete localStorage.dgfToken
          delete localStorage.dgfTokenExpires
        })
    })
  }
}

const DGFAuth = {
  install (Vue, options) {
    if (!Vue.http) {
      return console.error('dgf-auth requires vue-resource')
    }
    Vue.prototype.$dgfAuth = new AuthLib(options, Vue.http)
    Vue.http.interceptors.push(function (request) {
      const token = localStorage.dgfToken
      const isApiCall = (
        request.url.indexOf(`${options.domain}/api/1`) !== -1 ||
        request.url.indexOf(`${options.domain}/oauth/revoke`) !== -1
      )
      if (isApiCall && token) {
        request.headers.set('Authorization', `Bearer ${token}`)
      }
    })
  }
}

export default DGFAuth

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(DGFAuth)
}
