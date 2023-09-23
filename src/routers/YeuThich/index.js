const express = require('express')
const YeuThichController = require('../../controllers/YeuThich.controllers')
const asyncHandler = require('../../helpers/asyncHandle')
const { authenticationV2 } = require('../../auth/authUntil')

const router = express.Router()



//check _id của users
router.use(authenticationV2)

router.post('/createYeuThich', asyncHandler(YeuThichController.createYeuThich))
router.post('/UserYeuThich/:id', asyncHandler(YeuThichController.UserYeuThich))
router.post('/createComment', asyncHandler(YeuThichController.createComment))
router.post('/deleteComment', asyncHandler(YeuThichController.deleteComment))






module.exports = router