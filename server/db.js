var pg = require('pg'),
    Q = require('q'),
    connectionString = process.env.DATABASE_URL || 'postgres://noSlouch:brian@localhost:5432/streetink',
    match = connectionString.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/),
    defaults = {
        user: match[1],
        password: match[2],
        host: match[3],
        port: match[4],
        database: match[5]
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
