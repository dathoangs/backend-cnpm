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
router.post('/deleteMusic', asyncHandler(MusicController.deleteMusic))
router.post('/getMusicByUserId/:userId', asyncHandler(MusicController.getMusicByUserId))



module.exports = router