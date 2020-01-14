import { click, fillIn } from '@ember/test-helpers'
import { authenticateSession } from 'ember-simple-auth/test-support'

export async function createBand(name) {
  await click('[data-test-rr=new-band-label]')
  await fillIn('[data-test-rr=new-band-input]', name)
  return click('[data-test-rr=new-band-button]')
}

export async function LoginAs(email) {
  return authenticateSession({ token: 'a.sign.jwt', userEmail: email})
}