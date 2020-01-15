import Controller from '@ember/controller';
import { inject as service } from '@ember/service'
import { action } from '@ember/object'

export default Controller.extend({
  init() {
    this._super(...arguments)
    this.set('showErrors', { email: false, password: false })
  },
  router: service(),

  signUp: action(async function(e) {
    e.preventDefault()
    await this.model.save()
    await this.router.transitionTo('login')
  }),

  setShowErrors: action(function(property) {
    let showErrors = { ...this.showErrors }
    showErrors[property] = true;
    this.set('showErrors', showErrors)
  })
});
