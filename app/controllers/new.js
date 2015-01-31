/*global $*/
import Ember from 'ember';

export default Ember.Controller.extend({
    init: function() {
        $(window).resize(this.resizeStreetlist)
    },
    willDestroy: function() {
        $(window).off('resize', this.resizeStreetlist)
    },
    selectedCity: function() {
        return this.get('cities').findBy('id', this.get('city'))
    }.property('city'),
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
            this.set('city', city.id)
            Ember.run.scheduleOnce('afterRender', this.resizeStreetlist)
        }
    }
})
