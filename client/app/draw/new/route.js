import Ember from 'ember';

const {
  set,
  get
} = Ember;

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('map')
  },
  afterModel: function(model) {
    const dc = this.controllerFor('draw')
    const drawModel = this.modelFor('draw')
    const {cities, colors} = drawModel

    set(dc, 'selectedCity', get(cities, 'firstObject'))
    set(dc, 'map', model)
    get(dc, 'selectedCity.streets').setEach('color', null)
    set(dc, 'currentColor', colors.get('firstObject'))
    set(model, 'city', get(cities, 'firstObject'))
  }
});
