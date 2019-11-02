const Sequelize = require('sequelize')
const slug = require('slug')
const shortid = require('shortid')

const db = require('../config/db')

const Projects = db.define('projects', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(60),

    url: Sequelize.STRING
}, {
    hooks: {
        beforeCreate(Projects) {
            console.log('Before to Insert')

            const url = slug(Projects.name).toLowerCase()

            Projects.url = `${url}-${shortid.generate()}`
        }
    }
})

module.exports = Projects