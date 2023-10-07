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
const musicModels = require('../models/music.model.js')



class MusicService {


    static getSearchName = async ({ keySearch }) => {
        try {
            const regexSearch = new RegExp(keySearch, 'i')
            const result = await musicModels.find({ music_name: { $regex: regexSearch } }).lean();

            return result

        } catch (error) {
            throw error
        }
    }

    static getMusic = async ({ keyId }) => {
        try {
            const result = musicModels.find({});
            return result

        } catch (error) {
            throw error
        }
    }

    static getMusicByUserId = async ({ userId }) => {
        try {
            const result = musicModels.find({
                user_id: userId
            });
            return result

        } catch (error) {
            throw error
        }
    }

    static createMusic = async (payload) => {
        console.log(payload)
        try {

            if (payload.music_name == "" || payload.music_genre == "" ||
                payload.img == "" || payload.tacgia == "" || payload.url == ""
            ) {
                return {
                    code: '401',
                    message: 'Vui lòng nhập đủ thông tin',
                }
            }

            const newPost = musicModels.create({
                music_name: payload.music_name,
                music_genre: payload.music_genre,
                music_img: payload.img,
                music_url: payload.url,
                author: payload.tacgia,
                user_id: payload.user_id

            })
            return newPost;

        } catch (error) {
            throw error;
        }
    }

    static getFullUser = async () => {
        try {
            const result = await shopModels.find({});

            if (!result || result.length === 0) {
                // Respond with a 404 Not Found status if no data found
                return res.status(404).json({ error: 'No data found' });
            }

            console.log(result);
            // Respond with the retrieved data
            return result
        } catch (error) {
            console.error('Error:', error);
            // Respond with a 500 Internal Server Error status if an error occurs
        }
    };

    static getMusicById = async (payload) => {
        const checkPost = await musicModels.findById(payload.id);

        console.log({ checkPost })
        if (checkPost == "") {
            return {
                code: '503',
                message: 'Không tìm thấy thông tin bài hát',
            }
        }

        return checkPost;
    }

    static deleteMusic = async (payload) => {
        try {
            const checkPost = await musicModels.findById(payload.userId);

            if (!checkPost) {
                throw new AuthFailureError('Authentication error');
            }

            const newFriend = checkPost.friends.filter((element) => element.youId !== payload.youId);

            checkPost.friends = newFriend
            // console.log(removeFromArray)

            const result = await checkPost.save();
            return result;

        } catch (error) {
            throw error
        }
    }


};



module.exports = MusicService