const express = require('express')
const shopModel = require('../models/shop.models')
const { BadRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair, verifyJWT } = require('../auth/authUntil')
const { getInfoData } = require('../utils')
const { findByEmail } = require('./shop.service')


const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITTOR: 'EDITTOR',
    ADMIN: 'ADMIN',
}

class AccessService {

    static handleRefreshTokenV2 = async ({ user, refreshToken, keyStore }) => {
        const { userId, email } = user

        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            await KeyTokenService.deleteKeyById(userId)
            throw new ForbiddenError('Something wrong happend !! Pls relogin')
        }

        if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError('Shop not register 1')

        const foundShop = await findByEmail({ email })

        if (!foundShop) throw new AuthFailureError('Shop not register 2')

        const tokens = await createTokenPair({ userId: foundShop._id, email }, keyStore.publicKey, keyStore.privateKey)

        await keyStore.update({
            $set: {
                refreshToken: tokens.refreshToken,
            },
            $addToSet: {
                refreshTokensUsed: refreshToken,
            },
        })

        return {
            user,
            tokens,
        }
    }

    static signup = async ({ name, email, password }) => {
        try {
            if (email == "" || password == "") {
                return {
                    code: '503',
                    message: 'Vui lòng nhập đủ thông tin',
                }
            }
            else {

                const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                if (!emailPattern.test(email)) {
                    // alert("Vui lòng nhập một địa chỉ email hợp lệ");

                    return {
                        code: '503',
                        message: 'Vui lòng nhập một địa chỉ email hợp lệ',
                    }
                }

                // Check if the password is at least 6 characters long
                if (password.length < 6) {
                    // alert("Mật khẩu phải chứa ít nhất 6 ký tự");

                    return {
                        code: '503',
                        message: 'Mật khẩu phải chứa ít nhất 6 ký tự!!',
                    }

                }
                // Check if the password is at least 6 characters long
                if (password.length > 20) {
                    // alert("Mật khẩu phải chứa ít nhất 6 ký tự");
                    return {
                        code: '503',
                        message: 'Mật khẩu quá 20 kí tự!!',
                    }
                }

                const checkShop = await shopModel.findOne({ email }).lean()

                if (checkShop) {
                    throw new BadRequestError('Tài khoản đã đc đăng ký!!!')
                }
                const passwordHash = await bcrypt.hash(password, 10)

                const newShop = await shopModel.create({
                    name,
                    email,
                    password: passwordHash,
                    roles: [RoleShop.SHOP],
                })

                if (newShop) {
                    const privateKey = crypto.randomBytes(64).toString('hex')
                    const publicKey = crypto.randomBytes(64).toString('hex')

                    const tokens = await createTokenPair({ userId: newShop.id }, privateKey, publicKey)

                    const publicKeyString = await KeyTokenService.createKeyToken({
                        userId: newShop._id,
                        publicKey,
                        privateKey,
                        refreshToken: tokens.refreshToken,
                    })

                    if (!publicKeyString) {
                        return {
                            code: 'xxxx',
                            message: 'publicKeyString error',
                        }
                    }
                    return {
                        shop: getInfoData(['_id', 'name', 'email'], newShop),
                        tokens,
                    }
                }
                return {
                    code: 200,
                    metadata: null,
                }
            }
        } catch (error) {
            return {
                code: 'xxx',
                msg: error.message,
                status: 'error',
            }
        }
    }

    static Login = async ({ email, password, refreshToken = null }) => {
        try {

            const foundShop = await findByEmail({ email })
            if (!foundShop) {
                throw BadRequestError('Invalid Email or Password')
            }


            // check passowrd and generate token
            const match = await bcrypt.compare(password, foundShop.password)


            if (!match) throw new AuthFailureError('Sai mật khẩu hoặc tài khoản!!')


            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            const tokens = await createTokenPair({ userId: foundShop._id, email }, publicKey, privateKey)


            await KeyTokenService.createKeyToken({
                userId: foundShop._id,
                refreshToken: tokens.refreshToken,
                publicKey,
                privateKey,
            })

            return {
                shop: getInfoData(['_id', 'name', 'email', 'img'], foundShop),
                tokens,
                status: 'success',
            }

        } catch (error) {
            return {
                code: 'xxx',
                msg: error.message,
                status: 'error',
            }
        }
    }

}

module.exports = AccessService