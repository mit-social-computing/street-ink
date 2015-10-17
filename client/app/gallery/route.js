import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
      return Ember.RSVP.hash({
        cities: this.store.find('city'),
        maps: this.store.find('map').then(maps => maps.filterBy('id'))
      })
    }
});
