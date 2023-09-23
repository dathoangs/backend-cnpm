const express = require('express')
const BinhLuanController = require('../../controllers/binhluan.controllers.js')
const asyncHandler = require('../../helpers/asyncHandle')
const { authenticationV2 } = require('../../auth/authUntil')

const router = express.Router()


router.post('/getByIdCommnet/:id', asyncHandler(BinhLuanController.getByIdCommnet))

//check _id của users
router.use(authenticationV2)

router.post('/createComment', asyncHandler(BinhLuanController.createComment))
router.post('/createComment', asyncHandler(BinhLuanController.createComment))
router.post('/deleteComment', asyncHandler(BinhLuanController.deleteComment))






module.exports = router