'use strict'

const Projects = require('../models/Projects')

exports.projectsHome =  async (req, res) => {
    const PROJECTS = await Projects.findAll()
    
    res.render('index', {
        namePage: 'Projects ' + res.locals.year,
        PROJECTS
    })
}

exports.newProjects = async (req, res) => {
    const PROJECTS = await Projects.findAll()
    
    res.render('newProject', {
        namePage: 'New Project',
        PROJECTS
    })
}

exports.sendNewProjects = async (req, res) => {
    //send to console data of the user
    console.log(req.body)

    // validate input
    const { name } = req.body

    let errors = []

    if(!name) {
        errors.push({'texto': 'Put a name to project! :('})
    }

    // if got fails
    if(errors.length > 0) {
        res.render('newProject', {
            namePage: 'New Project',
            errors
        })
    } else {
        // without errors
        // insert a db
        
        const PROJECTS = await Projects.create({ name })
        res.redirect('/new-project')
        
    }
}

exports.projectForURL = async (req, res, next) => {
    const PROJECTS = await Projects.findAll()

    const PROJECT = await Projects.findOne({
        where: {
            url: req.params.url
        }
    })

    if(!PROJECT) return next()

    console.log(PROJECT)

    res.render('works', {
        namePage: 'Works of Projects',
        PROJECTS,
        PROJECT
    })
}

exports.formEdit = async (req, res) => {
    const PROJECTS = await Projects.findAll()

    res.render('newProject', {
        namePage: 'Edit Project',
        PROJECTS
    })
}

exports.updateProject = async (req, res) => {

    const PROJECTS = await Projects.findAll()

    const name = req.body.name
    let errors = []

    if(!name) {
        errors.push({'texto': 'Add a name to Project. :('})
    }

    if(errors.length > 0) {
        res.render('newProject', {
            namePage: 'Edit Project',
            errors,
            PROJECTS
        })
    } else {
        await Projects.update(
            { name: name },
            { where: { id: req.params.id }}
        )
        res.redirect('/')
    }
    
    
}