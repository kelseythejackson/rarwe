import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'
import fetch from 'fetch'
import ENV from 'rarwe/config/environment'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  async module() {
    let { token } = this.session.data.authenticated
    let currentUserURL = '/users/me'
    if (ENV.apiHost) {
      currentUserURL = `${ENV.apiHost}/${currentUserURL}`
    }

    let response = await fetch(currentUserURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    let payload = await response.json()
    let store = this.store
    let User = store.modelFor('user')
    let serializer = store.serializerFor('user')

    let jsonApiPayload = serializer.normalizeResponse(store, User, payload, null, 'query')

    return this.store.push(jsonApiPayload)
  }
});
