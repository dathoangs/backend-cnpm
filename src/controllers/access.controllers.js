const AccessService = require('../services/access.service')
const { CREATED, SuccessResponse } = require('../core/success.response')


class AccessController {

    SingUp = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await AccessService.singup(req.body),
        }).send(res)
    }

    Login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.Login(req.body),
        }).send(res)
    }

    refreshToken = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get token success!!',
            metadata: await AccessService.handleRefreshTokenV2({
                user: req.user,
                refreshToken: req.refreshToken,
                keyStore: req.keyStore,
            }),
        })
    }


}

module.exports = new AccessController()