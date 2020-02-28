export function initialize(appInstance ) {
  let session = appInstance.lookup('service:session')
  let currentUser = appInstance.lookup('service:current-user')
  session.on('authenticationSucceeded', function() {
    currentUser.load()
  })
  session.on('invalidationSucceeded', function() {
    currentUser.unload()
  })
}

export default {
  initialize
};
