var pg = require('pg'),
    Q = require('q'),
    connectionString = process.env.DATABASE_URL,
    match = connectionString.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/),
    defaults = {
        user: match[1] || 'noSlouch',
        password: match[2] || 'brian',
        host: match[3] || 'localhost',
        port: match[4] || 5432,
        database: match[5] || 'streetink'
    }

for (var prop in defaults) {
    pg.defaults[prop] = defaults[prop]
}

module.exports = function(query, params) {
    var deferred = new Q.defer()

    pg.connect(function(err, client, done) {
        client.query(query, params, function(err, result) {
            done()
            if (err) {
                deferred.reject(err)
            } else {
                deferred.resolve(result)
            }
        })
    })

    return deferred.promise
}
