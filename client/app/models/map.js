import DS from 'ember-data';

var attr = DS.attr

export default DS.Model.extend({
    title: attr(),
    author: attr(),
    location: attr(),
    thumbnail: function() {
        return 'https://s3.amazonaws.com/media.streetink/maps/thumbs/' + this.get('id') + '.png'
    }.property('id'),
    pathData: attr(),
    imageData: attr('String'),
    city: DS.belongsTo('city')
})
