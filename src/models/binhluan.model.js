const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'BinhLuan';
const COLLECTION_NAME = 'BinhLuans';

const binhluanSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            maxLength: 150,
        },
        user_name: {
            type: String,
            maxLength: 150,
        },
        music_id: {
            type: String,
            maxLength: 150,
        },
        conten: {
            type: String,
            maxLength: 150,
        },
        music_status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },


    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, binhluanSchema);
