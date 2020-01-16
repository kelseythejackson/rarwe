import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    sortBy: {
      as: 's',
      refreshModel: true
    },
    searchTermQP: {
      as: 'q',
      refreshModel: true
    },
    pageNumber: {
      as: 'page',
      refreshModel: true
    }
  },
  model(params) {
    let { pageNumber, sortBy, searchTermQP } = params
    let band = this.modelFor('bands.band')
    return this.store.query('song', {
      filter: {
        'band_id': band.id,
        title: searchTermQP
      },
      'page[number]': pageNumber,
      sort: sortBy
    })
  },
  setupController(controller) {
    this._super(...arguments)
    controller.set('band', this.modelFor('bands.band'))
    controller.set('searchTerm', controller.searchTermQP)
  },
  resetController(controller) {
    controller.setProperties({
      isAddingSong: false,
      newSongTitle: ''
    })
  }
});
