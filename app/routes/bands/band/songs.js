import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    sortBy: {
      as: 's',
      refreshModel: true
    },
    searchTerm: {
      as: 'q',
      refreshModel: true
    },
    pageNumber: {
      as: 'page',
      refreshModel: true
    }
  },
  model(params) {
    let { pageNumber, sortBy, searchTerm } = params
    let band = this.modelFor('bands.band')
    return this.store.query('song', {
      filter: {
        'band_id': band.id,
        title: searchTerm
      },
      'page[number]': pageNumber,
      sort: sortBy
    })
  },
  setupController(controller) {
    this._super(...arguments)
    controller.set('band', this.modelFor('bands.band'))
  },
  resetController(controller) {
    controller.setProperties({
      isAddingSong: false,
      newSongTitle: ''
    })
  }
});
