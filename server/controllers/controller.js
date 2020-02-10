'use strict'

const { User, Comic } = require('../models')
const jwt = require('../helpers/jwt')

class Controller {
    static login(req, res, next) {
        const email = req.body.email
        const password = req.body.password
        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if(user) {
                if(password === user.password) {
                    const token = jwt.generateToken(user.dataValues)
                    res.status(200).json({
                        access_token: token 
                    })
                } else {
                    next({ status: 400, message: 'email/password' })
                }
            } else {
                next({ status: 400, message: 'email/password' })
            }
        })
        .catch(err => {
            console.log('login error ',err)
            res.json(err)
        })
    }

    static comics(req, res, next) {
        Comic.findAll({})
        .then(comics => {
            res.status(200).json(comics)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getComic(req, res, next) {
        const id = Number(req.params.id)
        console.log(id)
        Comic.findByPk(id)
        .then(comic => {
            res.satus(200).json(comic)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateComic(req, res, next) {
        const id = req.params.id
        const { title, author } = req.body
        Comic.update(
            {
                title,
                author,
            },
            {
                where: {
                    id
                }
            }
        )
        .then(comic => {
            res.status(200).json(comic)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = Controller