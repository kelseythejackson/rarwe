import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin'
import ENV from 'rarwe/config/environment'

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.apiHost,
  authorize(xhr) {
    let { token } = this.session.data.authenticated
    if(token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    }
  }
});
