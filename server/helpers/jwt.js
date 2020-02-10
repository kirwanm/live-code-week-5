const jwt = require('jsonwebtoken')

module.exports = {
    generateToken(payload) {
        return jwt.sign(payload, 'success')
    },
    verifyToken(token) {
        return jwt.verify(token, 'success')
    }
}