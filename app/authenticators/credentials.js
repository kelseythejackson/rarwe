import Base from 'ember-simple-auth/authenticators/base';
import fetch from 'fetch'
import ENV from 'rarwe/config/environment'

export default Base.extend({
  async authenticate(username, password) {
    let tokenUrl = ENV.apiHost ? `${ENV.apiHost}/token` : '/token'
    let response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    if (!response.ok) {
      let error = await response.json();
      throw error;
    }
    let { user_email: userEmail, token } = await response.json();
    return { userEmail, token }
  },
  
  async restore(data) {
    return data;
  },

  // authenticate(/*args*/) {
  // },

  // invalidate(data) {
  // }
});
