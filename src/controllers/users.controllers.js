const UsersPostService = require('../services/users.service')
const { CREATED, SuccessResponse, } = require('../core/success.response')


class AccessController {


    getUserName = async (req, res, next) => {
        new SuccessResponse({
            metadata: await UsersPostService.getUserNames(req.params),
        }).send(res)
    }

    getNameById = async (req, res, next) => {
        new SuccessResponse({
            metadata: await UsersPostService.getNameById(req.params),
        }).send(res)
    }

    getFullUser = async (req, res, next) => {
        console.log("abc")
        new SuccessResponse({
            metadata: await UsersPostService.getFullUser(req.params),
        }).send(res)
    }

    addFriend = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await UsersPostService.addFriend(req.body),
        }).send(res)
    }

    deleteFriend = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await UsersPostService.deleteFriend(req.body),
        }).send(res)
    }

    addGroup = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await UsersPostService.addGroup(req.body),
        }).send(res)
    }

    addImg = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await UsersPostService.addImg(req.body),
        }).send(res)
    }
}

module.exports = new AccessController()