import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import geolib from 'geolib'
import { computed } from '@ember/object'

const nearbyDistance = 500 * 1000;

export default Controller.extend({
  showConcerts: 'all',
  geolocation: service(),
  userLocation: readOnly('geolocation.currentLocation'),
  concerts: computed('s')

  filterConcerts: task(function * () {
    if (!this.userLocation) {
      yield this.get('geolocation').getLocation();
    }
    this.set('showConcerts', 'nearby')
  })
});
