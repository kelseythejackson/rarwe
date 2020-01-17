import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { empty, gt } from '@ember/object/computed';
import { capitalize } from 'rarwe/helpers/capitalize'
import { inject as service } from '@ember/service'
import { task, timeout } from 'ember-concurrency'

export default Controller.extend({
  router: service(),
  pageNumber: 1,
  isAddingSong: false,
  newSongTitle: '',

  isAddButtonDisabled: empty('newSongTitle'),

  sortBy: '-rating,title',

  newSongPlaceholder: computed('band.name', function() {
    let bandName = this.band.name;
    return `New ${capitalize(bandName)} song`
  }),

  addSong: action(function() {
    this.set('isAddingSong', true)
  }),

  cancelAddSong: action(function() {
    this.set('isAddingSong', false)
  }),

  saveSong: action(async function(e) {
    e.preventDefault()
    let newSong = this.store.createRecord('song', {
      title: this.get('newSongTitle'),
      band: this.band
    });
    await newSong.save()
    this.model.update()
    this.set('newSongTitle', '')
    this.flashMessages.success('The new song has been created')

  }),

  updateRating: action(function(song, rating) {
    song.set('rating', song.rating === rating ? 0 : rating)
    song.save()
  }),

  updateSortBy: action(function(e) {
    this.router.transitionTo({
      queryParams: {
        s: e.target.value,
        page: 1
      }
    })
  }),

  updateSearchTerm: task(function * (e) {
    if (e) {
      yield timeout(250)
      this.set('searchTerm', e.target.value)
    }
    yield this.router.transitionTo({
      queryParams: {
        q: this.searchTerm,
        page: 1
      }
    })
  }).restartable(),

  hasPrevPage: gt('pageNumber', 1),
  hasNextPage: computed('pageNumber', 'model.meta.page-count', function() {
    return this.pageNumber < this.model.meta['page-count']
  })
});
