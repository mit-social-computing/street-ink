import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render('draw')
    },
    model: function(params) {
        return Ember.$.getJSON('/maps/' + params.map_id)
    }
});
