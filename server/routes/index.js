'use strict'

const router = require('express').Router()
const { authentication } = require('../helpers/auth')
const Controller = require('../controllers/controller')

router.post('/login', Controller.login)

router.get('/comics', Controller.comics)
router.get('/comics/:id', Controller.getComic)

module.exports = router