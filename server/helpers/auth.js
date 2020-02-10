'use strict'
const { verifyToken } = require('./jwt')

function authentication(req, res, next) {
    if(req.headers.hasOwnProperty('token')) {
        try {
            req.useLoggedIn = verifyToken(req.headers.token)
            return User.findByPk(req.userLoggedIn.id)
            .then(user => {
                if(user) {
                    next()
                } else {
                    next({ status: 400, message: 'invalid access'})
                }
            })
            .catch(next)
        }
        catch(err) {
            next(err)
        }
    } else {
        next({status: 400, message: 'You must login first' })
    }
}

module.exports = {
    authentication,

}