var pg = require('pg'),
    Q = require('q'),
    env = require('./secrets.json'),
    defaults = {
        user: env.DATABASE_USER,
        password: env.DATABASE_PASSWORD,
        host: env.DATABASE_HOST,
        port: env.DATABASE_PORT,
        database: env.DATABASE_NAME,
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
