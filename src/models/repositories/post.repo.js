
// const postModel = require('../post.model')
const { getSelectData, unGetSelectData, convertToObjectIdMongodb } = require('../../utils')

const findAllPost = async ({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? { _id: -1 } : { id: 1 }
    const products = postModel.find(filter).sort(sortBy).skip(skip).limit(limit).select(getSelectData(select)).lean()

    return products
}

const getAllByIds = async ({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? { _id: -1 } : { id: 1 }
    const products = postModel.find(filter).sort(sortBy).skip(skip).limit(limit).select(getSelectData(select)).lean()

    return products
}

module.exports = {
    findAllPost,
    getAllByIds
}