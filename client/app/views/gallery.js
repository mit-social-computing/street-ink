/*global $*/
import Ember from 'ember';

export default Ember.View.extend({
    didInsertElement: function() {
        $(window).resize(this.resizeGallery)
        this.resizeGallery()
    },
    willDestroyElement: function() {
        $(window).off('resize', this.resizeGallery)
    },
    resizeGallery: Ember.run.bind(this, function() {
        var availableHeight = $('#main').height() - $('#filterBar').outerHeight(true)
        $('#galleryGrid').css('height', availableHeight)
    })
})
