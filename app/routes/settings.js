import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),


  async model() {
    await this.currentUser.load()
    return this.currentUser.user
  }
});
