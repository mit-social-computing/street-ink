import Ember from 'ember';

const {
  set,
  get
} = Ember;

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('map', params.map_id)
  },
  afterModel(model) {
    const dc = this.controllerFor('draw')
    const drawModel = this.modelFor('draw')
    const {cities, colors} = drawModel
    const selectedCity = cities.findBy('id', get(model, 'city.id'))

    set(dc, 'selectedCity', selectedCity)
    set(dc, 'map', model)
    //get(dc, 'selectedCity.streets').setEach('color', null)
    set(dc, 'currentColor', colors.get('firstObject'))
    set(model, 'city', get(cities, 'firstObject'))
  },
  //   setupController: function(controller, model) {
  //       var dc = this.controllerFor('draw')

  //       this._super(controller, model)
  //       dc.set('selectedCity', dc.get('cities').findBy('id', model.get('city').id))
  //   }
});
