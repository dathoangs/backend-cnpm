const express = require('express')
// const postModel = require('../models/post.model.js')
const { BadRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair, verifyJWT } = require('../auth/authUntil')
const { getInfoData } = require('../utils')
const { findByEmail } = require('./shop.service')
const { findAllPost, getAllByIds } = require('../models/repositories/post.repo.js')
const mongoose = require('mongoose');
const binhluanModels = require('../models/binhluan.model.js')



class YeuThichService {


    static getSearchName = async ({ keySearch }) => {
        try {
            const regexSearch = new RegExp(keySearch, 'i')
            const result = await musicModels.find({ music_name: { $regex: regexSearch } }).lean();

            return result

        } catch (error) {
            throw error
        }
    }

    static getByIdCommnet = async (payload) => {
        try {
            const result = binhluanModels.find({
                music_id: payload.id
            })
            return result

        } catch (error) {
            throw error
        }
    }

    static createComment = async (payload) => {
        console.log(payload)
        try {
            const newPost = binhluanModels.create({
                user_id: payload.user_id,
                music_id: payload.music_id,
                conten: payload.conten,
                user_name: payload.user_name

            })
            return newPost;

        } catch (error) {
            throw error;
        }
    }


    static deleteComment = async (payload) => {
        try {
            const deleteComment = binhluanModels.deleteMany({
                $and: [
                    { user_id: payload.user_id },
                    { conten: payload.conten },
                    {
                        createdAt: payload.createdAt
                    }

                ]
            });

            return deleteComment;

        } catch (error) {
            throw error
        }
    }


};



module.exports = YeuThichService