import Model, { attr } from '@ember-data/model';
import { buildValidations } from 'ember-cp-validations'
import emailFieldValidation from 'rarwe/validations/email-field'
import passwordFieldValidation from 'rarwe/validations/password-field'
import { equal, not } from '@ember/object/computed'

const Validations = buildValidations({
  email: emailFieldValidation,
  password: passwordFieldValidation
})

export default Model.extend(Validations, {
  email: attr('string'),
  password: attr('string'),
  unitPreference: attr(),
  dateFormat: attr(),
  prefersImperial: equal('unitPreference', 'imperial'),
  prefersMetric: not('prefersImperial')
});
