import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    normalize: function(type, hash, property) {
        var json = {}

        for (var prop in hash) {
          json[prop.camelize()] = hash[prop]
        }
        json.createdAt = new Date(json.createdAt)
        return this._super(type, json, property)
    }
})
