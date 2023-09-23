const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth')
const router = express.Router()

router.use(apiKey)

// check permission
router.use(permission('0000'))


router.use('/v1/api/shop', require('./access'))
router.use('/v1/api/user', require('./ussers'))
router.use('/v1/api/music', require('./Music'))
router.use('/v1/api/yeuthich', require('./YeuThich'))
router.use('/v1/api/comment', require('./BinhLuan'))










module.exports = router
