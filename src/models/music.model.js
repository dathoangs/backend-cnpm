const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Music';
const COLLECTION_NAME = 'Musics';

const musicSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            maxLength: 150,
        },
        music_name: {
            type: String,
            maxLength: 150,
        },
        music_genre: {
            type: String,
        },
        author: {
            type: String,
        },
        music_status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        music_img: {
            type: String,
        },
        music_url: {
            type: String,
        },
        verify: {
            type: mongoose.Schema.Types.Boolean,
            default: false,
        },
        view: {
            type: Number, default: 0
        },
        share: {
            type: Array,
        },

    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, musicSchema);
