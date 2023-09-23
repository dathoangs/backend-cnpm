const MusicPostService = require('../services/music.service')
const { CREATED, SuccessResponse, } = require('../core/success.response')


class AccessController {


    getMusic = async (req, res, next) => {
        new SuccessResponse({
            metadata: await MusicPostService.getMusic(req.params),
        }).send(res)
    }

    getMusicById = async (req, res, next) => {
        new SuccessResponse({
            metadata: await MusicPostService.getMusicById(req.params),
        }).send(res)
    }

    getSearchName = async (req, res, next) => {
        console.log("abc")
        new SuccessResponse({
            metadata: await MusicPostService.getSearchName(req.params),
        }).send(res)
    }

    createMusic = async (req, res, next) => {
        console.log(req.body)
        new CREATED({
            message: 'Register OK',
            metadata: await MusicPostService.createMusic(req.body),
        }).send(res)
    }

    deleteFriend = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await MusicPostService.deleteFriend(req.body),
        }).send(res)
    }

    addGroup = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await MusicPostService.addGroup(req.body),
        }).send(res)
    }

    addImg = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await MusicPostService.addImg(req.body),
        }).send(res)
    }
}

module.exports = new AccessController()