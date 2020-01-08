import Controller from '@ember/controller';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import Band from 'rarwe/models/band';
import { empty } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
  isAddingBand: false,
  newBandName: '',

  isAddButtonDisabled: empty('newBandName'),

  router: service(),

  addBand: action(function() {
    this.set('isAddingBand', true)
  }),

  cancelAddBand: action(function() {
    this.set('isAddingBand', false);
  }),

  saveBand: action(function(e) {
    e.preventDefault()
    let newBand = Band.create({ name: this.newBandName })
    this.model.pushObject(newBand)
    this.setProperties({
      newBandName: '',
      isAddingBand: false
    });
    newBand.set('slug', dasherize(newBand.name));
    this.router.transitionTo('bands.band.songs', newBand.slug)
  })

});
