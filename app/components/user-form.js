import Component from '@ember/component';
import {
  inject as service
} from '@ember/service';
import {
  task
} from 'ember-concurrency';
import {
  action
} from '@ember/object';
export default Component.extend({
  router: service(),
  init() {
    this._super(...arguments);
    let dateFormats = [{
        value: 'YYYY-MM-DD',
        example: '2018-07-31'
      },
      {
        value: 'DD-MM-YYYY',
        example: '31-07-2018'
      },
      {
        value: 'MM-DD-YYYY',
        example: '07-31-2018'
      },
    ];
    this.set('dateFormats', dateFormats);
    this.set('units', ['metric', 'imperial']);
    let usersDateFormat = dateFormats.find((format) => {
      return format.value === this.user.dateFormat;
    });
    this.set('selectedFormat', usersDateFormat);
  },
  saveUser: task(function* (event) {
    event.preventDefault();
    yield this.user.save();
    yield this.router.transitionTo('index');
  }),
  discardChanges: task(function* () {
    this.user.rollbackAttributes();
    yield this.router.transitionTo('index');
  }),
  updateSelectedFormat: action(function (format) {
    this.set('selectedFormat', format);
    this.user.set('dateFormat', format.value);
  }),
  updateUnitPreference: action(function (unit) {
    this.user.set('unitPreference', unit);
  }),
});
