const express = require('express')
const AccessController = require('../../controllers/access.controllers')
const asyncHandler = require('../../helpers/asyncHandle')
const { authenticationV2 } = require('../../auth/authUntil')

const router = express.Router()


router.post('/signup', asyncHandler(AccessController.SignUp))
router.post('/login', asyncHandler(AccessController.Login))

//check _id của users
router.use(authenticationV2)

router.post('/refreshToken', asyncHandler(AccessController.refreshToken))


module.exports = router