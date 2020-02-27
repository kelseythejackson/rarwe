import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly, equal } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import geolib from 'geolib'
import { computed, action } from '@ember/object'

const milesToKilometers = 1.61

export default Controller.extend({
  init() {
    this._super(...arguments)
    this.set('nearbyDistances', [200, 500, 1000, 2000])
  },
  currentUser: service(),
  useMiles:  readOnly('currentUser.user.prefersImperial'),
  selectedDistance: 500,
  showConcerts: 'all',
  geolocation: service(),
  userLocation: readOnly('geolocation.currentLocation'),
  showingAll: equal('showConcerts', 'all'),
  showingNearby: equal('showConcerts', 'nearby'),
  concerts: computed('showingAll', 'model.[]', 'userLocation', 'maxDistance', function() {
    // If showing all is true, return the whole model
    if (this.showingAll) {
      return this.model;
    }
    // grab the users current location (lattitude & longitude)
    let [userLat, userLng] = this.userLocation
    // return the filtered model
    return this.model.filter((concert) => {
      let { lat, lng } = concert.location
      let distanceToConcert = geolib.getDistance({ lat: userLat, lng: userLng }, {lat, lng})
      return distanceToConcert < this.maxDistance
    })
    
  }),

  maxDistance: computed('selectedDistance', 'useMiles', function() {
    return this.selectedDistance * 1000 * (this.useMiles ? milesToKilometers: 1)
  }),

  filterConcerts: task(function * () {
    if (!this.userLocation) {
      yield this.get('geolocation').getLocation();
    }
    this.set('showConcerts', this.showingAll ? 'nearby': 'all')
  }),

  updateSelectedDistance: action(function(distance) {
    this.set('selectedDistance', distance)
  })
});
