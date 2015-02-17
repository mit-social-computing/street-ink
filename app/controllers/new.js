/*global $*/
import Ember from 'ember';

export default Ember.Controller.extend({
    init: function() {
        $(window).resize(this.resizeStreetlist)
    },
    willDestroy: function() {
        $(window).off('resize', this.resizeStreetlist)
    },
    resizeStreetlist: function() {
        var dd = $('.dropdown').outerHeight(true),
            city = $('#city').outerHeight(true),
            header = $('#tableHeader').outerHeight(true),
            sidebar = $('#sidebar').outerHeight(true),
            newHeight = sidebar - (dd + city + header)

        $('#streetlist').height(newHeight)
    },
    actions: {
        setCity: function(city) {
            this.set('selectedCity', city)
            Ember.run.scheduleOnce('afterRender', this.resizeStreetlist)
        },
        saveMap: function(pathData) {
            this.set('pathData', pathData)
            var map = this.store.createRecord('map', {
                path_data: JSON.stringify(pathData)
            })
            map.save()
        }
    }
})
