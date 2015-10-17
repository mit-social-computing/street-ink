if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize'),
        sequelize = null,
        connectionString = process.env.DATABASE_URL,
        match = connectionString.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

    sequelize = new Sequelize(match[5], match[1], match[2], {
        dialect: 'postgres',
        protocol: 'postgres',
        port: match[4],
        host: match[3],
        logging: true
    })

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize,
        Map: sequelize.import(__dirname + '/map')
    }
}

module.exports = global.db
