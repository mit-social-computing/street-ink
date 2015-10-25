import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

const { dasherize } = Ember.String;

export default Component.extend({
  classNames: ['upload-indicator'],
  classNameBindings: ['phase'],
  phase: computed('status', function() {
    const status = get(this, 'status')
    if ( !status ) {
      return
    }
    return dasherize(status)
  })
})
