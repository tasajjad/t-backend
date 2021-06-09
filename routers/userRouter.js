const express = require('express');
const bcrypt = require('bcrypt')
const { User } = require('../models/users');
const authorize = require('../middlewares/authorize');
const router = express.Router();

// Check User by Email
async function newUser(req, res) {

	let user = await User.findOne({ email: req.body.email })
	if (user) return res.status(400).send("User Already Exist")


	user = new User({


		name: req.body.name,
		email: req.body.email,
		password: req.body.password

	})


	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)


	try {
		const result = await user.save()
		const token = user.generateJWT()
		res.send({

			token: token,
			data: {
				name: result.name,
				email: result.email

			}

		})
	} catch (err) {
		const errMsg = []
		for (field in err.errors) {
			errMsg.push(err.errors[field].message)

		}
		return res.status(400).send(errMsg)
	}

}

router.route('/')
	.post(newUser);

router.route('/me')
	.get(authorize, (req, res) => {
		res.send(req.user)
	})

module.exports = router;



