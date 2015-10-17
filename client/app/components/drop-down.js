/*global $*/
import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement: function() {
        $(document).click(function toggleActive() {
            try {
                this.get('element').classList.remove('active')
            } catch (e) {
                console.log('removing handler')
                $(document).off('click', toggleActive)
            }
        }.bind(this))
        $(window).resize(this.resizeStreetlist)
    },
    willDestroyElement: function() {
        $(window).off('resize', this.resizeStreetlist)
    },
    resizeStreetlist: function() {
        var dd = $('.dropdown').outerHeight(true),
            city = $('#city').outerHeight(true),
            header = $('#tableHeader').outerHeight(true),
            sidebar = $('#sidebar').outerHeight(true),
            newHeight = sidebar - (dd + city + header)

        $('#streetlist').height(newHeight)
    }.observes('selectedCity').on('didInsertElement'),
    classNames: ['dropdown'],
    click: function() {
        this.get('element').classList.toggle('active')
        return false
    },
    actions: {
        selectCity: function(city) {
            this.sendAction('action', city)
        }
    }
})
