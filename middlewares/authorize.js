const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('Authorization')

    if (!token) res.status(401).send("Un Authorized User or Acces Denied")

    const myToken = token.split(" ")[1].trim()
    try {
        const decoded = jwt.verify(myToken, process.env.MY_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(400).send("Invalid Token")
    }

}