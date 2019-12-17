const Sequelize = require('sequelize')

const sequelizedb = new Sequelize('uptask', 'dmr1204', 'admin1204', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: '3306',
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    //sqlite only
    //storage: 'path/to/database.sqlite'
})

module.exports = sequelizedb
