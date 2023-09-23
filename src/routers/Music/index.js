const express = require('express')
const MusicController = require('../../controllers/music.controllers')
const asyncHandler = require('../../helpers/asyncHandle')
const { authenticationV2 } = require('../../auth/authUntil')

const router = express.Router()


router.post('/getMusic', asyncHandler(MusicController.getMusic))
router.post('/getMusicById/:id', asyncHandler(MusicController.getMusicById))
router.post('/getSearchName/:keySearch', asyncHandler(MusicController.getSearchName))

//check _id của users
router.use(authenticationV2)

router.post('/createMusic', asyncHandler(MusicController.createMusic))
router.post('/postHaha', asyncHandler(MusicController.postHaha))
router.post('/createComment', asyncHandler(MusicController.createComment))
router.post('/deleteComment', asyncHandler(MusicController.deleteComment))






module.exports = router