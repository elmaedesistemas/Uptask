const express = require('express');
const router = express.Router();
const { body } = require('express-validator')

//import controller
const projectsController = require('../controllers/projectsController')

module.exports = function(){

    //route home
    router.get('/', projectsController.projectsHome)
    //route new-project
    router.get('/new-project', projectsController.newProject)
    router.post('/new-project', body('name').not().isEmpty().trim().escape(),
                projectsController.sendNewProject)
    //route show-projects
    router.get('/project/:url', projectsController.projectForUrl)

    //update projects
    router.get('/project/edit/:id', projectsController.formEdit)
    router.post('/new-project/:id', body('name').not().isEmpty().trim().escape(),
                projectsController.updateProject)

    //delete projects
    router.delete('/project/:url', projectsController.deleteProject)
  return router
}