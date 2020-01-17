import Controller from '@ember/controller';
import { action } from '@ember/object'
import { or } from '@ember/object/computed'
import { task } from 'ember-concurrency'
import { inject as service } from '@ember/service'

export default Controller.extend({
  router: service(),
  store: service(),

  async init() {
    this._super(...arguments)
    this.set('showErrors', { name: false })
    this.set('bands', await this.store.findAll('band'))
    this.set('selectedBands', [])
  },

  

  isButtonDisabled: or('model.validations.isInvalid', 'createMusician.isRunning'),

  createMusician: task(function * (e) {
    e.preventDefault()
    this.model.set('bands', this.selectedBands)
    yield this.model.save()
    yield this.router.transitionTo('musicians.show', this.model.id)
  }),

  setShowErrors: action(function(property) {
    let showErrors = {...this.showErrors}
    showErrors[property] = true
    this.set('showErrors', showErrors)
  }),

  updateSelectedBands: action(function(bands) {
    this.set('selectedBands', bands)
  })
});
