import Model, { attr, hasMany } from '@ember-data/model';
import { buildValidations, validator } from 'ember-cp-validations'
import { computed } from '@ember/object'

const Validations = buildValidations({
  name: validator('presence', {
    presence: true,
    message: 'Name can\'t be empty'
  })
})

export default Model.extend(Validations, {
  name: attr(),
  bands: hasMany({ async: false }),
  yearOfBirth: attr(),
  age: computed('yearOfBirth', function() {
    return new Date().getFullYear() - this.yearOfBirth
  }),

  initials: computed('name', function() {
    return this.name.split(/\s+/)
    .map((namePart) => namePart.charAt(0))
    .join('')
  })
});
