const BinhLuanService = require('../services/binhluan.service')
const { CREATED, SuccessResponse, } = require('../core/success.response')


class BinhLuanController {


    getMusic = async (req, res, next) => {
        new SuccessResponse({
            metadata: await BinhLuanService.getMusic(req.params),
        }).send(res)
    }

    getByIdCommnet = async (req, res, next) => {
        new SuccessResponse({
            metadata: await BinhLuanService.getByIdCommnet(req.params),
        }).send(res)
    }

    getSearchName = async (req, res, next) => {
        console.log("abc")
        new SuccessResponse({
            metadata: await BinhLuanService.getSearchName(req.params),
        }).send(res)
    }

    createComment = async (req, res, next) => {
        console.log(req.body)
        new CREATED({
            message: 'Register OK',
            metadata: await BinhLuanService.createComment(req.body),
        }).send(res)
    }

    deleteFriend = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await BinhLuanService.deleteFriend(req.body),
        }).send(res)
    }

    addGroup = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await BinhLuanService.addGroup(req.body),
        }).send(res)
    }

    addImg = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await BinhLuanService.addImg(req.body),
        }).send(res)
    }
}

module.exports = new BinhLuanController()