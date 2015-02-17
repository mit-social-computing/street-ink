import DS from 'ember-data';

var attr = DS.attr

export default DS.Model.extend({
    title: attr(),
    author: attr(),
    location: attr(),
    thumbnail: attr(),
    pathData: attr(),
    createdAt: attr('date')
})
