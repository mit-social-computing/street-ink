module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Map', {
        title: DataTypes.TEXT,
        author: DataTypes.TEXT,
        location: DataTypes.TEXT,
        thumbnail: DataTypes.TEXT,
        path_data: DataTypes.TEXT
    })
}
