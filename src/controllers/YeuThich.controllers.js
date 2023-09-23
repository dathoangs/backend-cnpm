const YeuThichService = require('../services/YeuThich.service')
const { CREATED, SuccessResponse, } = require('../core/success.response')


class YeuThichController {


    getMusic = async (req, res, next) => {
        new SuccessResponse({
            metadata: await YeuThichService.getMusic(req.params),
        }).send(res)
    }

    UserYeuThich = async (req, res, next) => {
        new SuccessResponse({
            metadata: await YeuThichService.UserYeuThich(req.params),
        }).send(res)
    }

    getSearchName = async (req, res, next) => {
        console.log("abc")
        new SuccessResponse({
            metadata: await YeuThichService.getSearchName(req.params),
        }).send(res)
    }

    createYeuThich = async (req, res, next) => {
        console.log(req.body)
        new CREATED({
            message: 'Register OK',
            metadata: await YeuThichService.createYeuThich(req.body),
        }).send(res)
    }

    deleteFriend = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await YeuThichService.deleteFriend(req.body),
        }).send(res)
    }

    addGroup = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await YeuThichService.addGroup(req.body),
        }).send(res)
    }

    addImg = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await YeuThichService.addImg(req.body),
        }).send(res)
    }
}

module.exports = new YeuThichController()