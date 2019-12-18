'use strict'

const slug = require('slug')

//model
const Project = require('../models/Projects')

exports.projectsHome = async (req,res) => {
  const allProjects = await Project.findAll()


  res.render('index', {
      namePage: 'Projects',
      allProjects
  })
}

exports.newProject = async (req,res) => {
  const allProjects = Project.findAll()

  res.render('newProject', {
      namePage: 'New Project',
      allProjects
  })
}

exports.sendNewProject = async (req,res) => {
  const allProjects = await Project.findAll()
  //validate input
  const { name } = req.body

  let errors = []

  if(!name) {
      errors.push({'text': 'Add a name to the project'})
  }

  //if we have errors
  if(errors.length > 0) {
      res.render('newProject', {
          namePage: 'New Project',
          allProjects,
          errors
      })
  } else {
      //insert in database
      await Project.create({ name })
      res.redirect('/')
        
  }

}

exports.projectForUrl = async (req,res,next) => {
  const allProjectsPromise = Project.findAll()
  const  projectUrlPromise = Project.findOne({
    where: {
      url: req.params.url
    }
  })

  const [allProjects, projectUrl] = await Promise.all([allProjectsPromise, projectUrlPromise])

  if(!projectUrl) return next()

  res.render('works', {
      namePage: 'Works',
      allProjects,
      projectUrl
  })
}

exports.formEdit = async (req,res,next) => {
  const allProjectsPromise =  Project.findAll()
  const projectIdPromise = Project.findOne({
    where: {
      id: req.params.id
    }
  })

  const [allProjects, projectId] = await Promise.all([allProjectsPromise, projectIdPromise])

  console.log(projectId.id)

  res.render('newProject', {
      namePage: 'Edit Project',
      allProjects,
      projectId
  })
}

exports.updateProject = async (req,res) => {
    const allProjects = await Project.findAll()
    //validate input
    const { name } = req.body
  
    let errors = []
  
    if(!name) {
        errors.push({'text': 'Add a name to the project'})
    }
  
    //if we have errors
    if(errors.length > 0) {
        res.render('newProject', {
            namePage: 'New Project',
            allProjects,
            errors
        })
    } else {
        //insert in database
        await Project.update(
            { name },
            { where: {id: req.params.id}}
            )
        res.redirect('/')
          
    }
  }

exports.deleteProject = async () => {
  const {urlProject} = req.params

  const result = await Project.destroy({where: {url: urlProject}})

  if(!result){
    return next()
  }

  res.status(200).send('Project Deleted Successfully')
}