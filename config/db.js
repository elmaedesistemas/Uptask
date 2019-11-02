const Sequelize = require('sequelize')

const db = new Sequelize('uptask_node', 'dmr1204', 'admin1204', {
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

module.exports = db