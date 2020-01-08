import Controller from '@ember/controller';
import { action } from '@ember/object';
import Song from 'rarwe/models/song';
import { empty } from '@ember/object/computed';

export default Controller.extend({
  isAddingSong: false,
  newSongTitle: '',

  isAddButtonDisabled: empty('newSongTitle'),

  addSong: action(function() {
    this.set('isAddingSong', true)
  }),

  cancelAddSong: action(function() {
    this.set('isAddingSong', false)
  }),

  saveSong: action(function(e) {
    e.preventDefault()
    let newSong = Song.create({ title: this.newSongTitle })
    this.model.songs.pushObject(newSong)
    this.set('newSongTitle', '')

  })
});
