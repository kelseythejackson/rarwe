import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  router: service(),

  model({ id }) {
    return this.store.findRecord('band', id)
  },

  redirect(band) {
    if (band.description) {
      this.router.transitionTo('bands.band.details')
    } else {
      this.router.transitionTo('bands.band.songs')
    }
  }
});
