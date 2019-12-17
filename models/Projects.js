const Sequelize = require('sequelize')
const slug = require('slug')
const shortid = require('shortid')

//config of database
const db = require('../config/db')

const Project = db.define('projects', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  url: Sequelize.STRING
}, {
  hooks: {
      beforeCreate(project) {
        console.log('before to insert in db')
        const url = slug(project.name).toLowerCase()

        project.url = `${url}-${shortid.generate()}`
      }
  }
})

module.exports = Project

