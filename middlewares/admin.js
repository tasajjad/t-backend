module.exports = function (req, res, next) {
    if (req.user.role != "admin") {
        res.status(403).send("Forbidded")
        next()
    }
}
