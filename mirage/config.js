export default function() {
  this.get('/bands', function(schema, request) {
    if (!request.requestHeaders['Authorization']) {
      return new Response(401)
    }
    return schema.bands.all()
  });
  this.get('/bands/:id');
  this.post('/bands')
  this.get('/bands/:id/songs', function(schema, request) {
    let id = request.params.id;
    return schema.songs.where({ bandId: id })
  })
  this.post('/users')
  this.post('/token', function(schema, request) {
    let { username: email, password } = JSON.parse(request.requestBody)
    let users = schema.users.where({ email, password })
    if (users.length === 1) {
      return {
        token: 'a.signed.jwt',
        user_email: email
      }
    }
  })
}
