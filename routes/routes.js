'use strict'

const express = require('express')
const router = express.Router()

// import express validator
const { body } = require('express-validator')

// import controllers
const projectsController = require('../controllers/projectsController')

module.exports = () => {

//routes get
router.get('/', projectsController.projectsHome)
router.get('/new-project', projectsController.newProjects)

//routes post
router.post('/new-project', 
    body('name')
    .not()
    .isEmpty()
    .trim()
    .escape(),
    projectsController.sendNewProjects)

//List Projects
router.get('/projects/:url', projectsController.projectForURL)

//Update Project
router.get('/project/edit/:id', projectsController.formEdit)
router.post('/project/edit/:id', 
    body('name')
    .not()
    .isEmpty()
    .trim()
    .escape(),
    projectsController.updateProject)
return router

}