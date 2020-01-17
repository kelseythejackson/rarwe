import Controller from '@ember/controller';
import { action } from '@ember/object';
import { empty, or } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({
  isAddingBand: false,
  newBandName: '',
  
  hasEmptyName: empty('newBandName'),
  isAddButtonDisabled: or('hasEmptyName', 'saveBand.isRunning'),

  router: service(),

  addBand: action(function() {
    this.set('isAddingBand', true)
  }),

  cancelAddBand: action(function() {
    this.set('isAddingBand', false);
  }),

  saveBand: task(function * (e) {
    e.preventDefault()
    let newBand = this.store.createRecord('band', {
      name: this.newBandName
    })
    yield newBand.save()
    this.setProperties({
      newBandName: '',
      isAddingBand: false
    });
    this.router.transitionTo('bands.band.songs', newBand.id)
  })

});
