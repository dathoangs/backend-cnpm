const express = require('express')
const UserController = require('../../controllers/users.controllers')
const asyncHandler = require('../../helpers/asyncHandle')
const { authenticationV2 } = require('../../auth/authUntil')

const router = express.Router()


//check _id của users
router.use(authenticationV2)

router.post('/getFullUser', asyncHandler(UserController.getFullUser))
router.post('/getUserName/:keySearch', asyncHandler(UserController.getUserName))
router.post('/getNameById/:keyId', asyncHandler(UserController.getNameById))
router.post('/addFriend', asyncHandler(UserController.addFriend))
router.post('/deleteFriend', asyncHandler(UserController.deleteFriend))
router.post('/addImg', asyncHandler(UserController.addImg))


router.post('/addGroup', asyncHandler(UserController.addGroup))





module.exports = router