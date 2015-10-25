import Ember from 'ember';
const {
  computed,
  get
} = Ember;

export default Ember.Controller.extend({
  actions: {
    setCity: function(city) {
      this.set('selectedCity', city)
      this.get('model').set('city', city.id)
    }
  },
  isDisabled: computed('status', function() {
    const status = get(this, 'status')
    return status === 'isUploading' || status === 'isDone'
  })
});
