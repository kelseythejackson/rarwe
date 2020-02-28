import Controller from '@ember/controller';
import { inject as service } from '@ember/service'
import { action } from '@ember/object'
import { buildValidations } from 'ember-cp-validations'
import emailFieldValidation from 'rarwe/validations/email-field'
import passwordFieldValidation from 'rarwe/validations/password-field'
import extractServerError from 'rarwe/utils/extract-server-error'
import { or } from '@ember/object/computed'

const Validations = buildValidations({
  email: emailFieldValidation,
  password: passwordFieldValidation
})

export default Controller.extend(Validations, {
  init() {
    this._super(...arguments)
    this.set('showErrors', { email: false, password: false })
    this.set('baseErrors', [])
  },

  router: service(),
  session: service(),
  offline: service(),

  signIn: action(async function(e) {
    e.preventDefault()
    try {
      let { email, password } = this
      await this.session.authenticate('authenticator:credentials', email, password)
      await this.router.transitionTo('bands')
    } catch (response) {
      let errorMessage = extractServerError(response.errors)
      this.baseErrors.pushObject(errorMessage)
    }
  }),

  setShowErrors: action(function(property) {
    let showErrors = { ...this.showErrors }
    showErrors[property] = true
    this.set('showErrors', showErrors)
  }),
  
  resetBaseErrors: action(function() {
    this.set('baseErrors', [])
  }),

  isButtonDisabled: or('validations.isInvalid', 'signIn.isRunning', 'offline.isDown'),
});
