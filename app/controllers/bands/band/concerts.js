import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly, equal } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import geolib from 'geolib'
import { computed } from '@ember/object'

const nearbyDistance = 500 * 1000;

export default Controller.extend({
  showConcerts: 'all',
  geolocation: service(),
  userLocation: readOnly('geolocation.currentLocation'),
  showingAll: equal('showConcerts', 'all'),
  showingNearby: equal('showConcerts', 'nearby'),
  concerts: computed('showingAll', 'model.[]', function() {
    if (this.showingAll) {
      return this.model;
    }
    return this.model.slice(0, -1)
  }),

  filterConcerts: task(function * () {
    if (!this.userLocation) {
      yield this.get('geolocation').getLocation();
    }
    this.set('showConcerts', this.showingAll ? 'nearby': 'all')
  })
});
