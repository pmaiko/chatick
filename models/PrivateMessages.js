const {Schema, model} = require('mongoose');
//const autoIncrement = require('mongoose-auto-increment');

const schema = new Schema({
    id : {
        type : Schema.Types.ObjectId,
    },

    message: {
        type: String,
        unique: false,
    },

    userFromId: {
        type: String,
        unique: false,
    },

    userToId: {
        type: String,
        unique: false,
    },

    time: {
        type: String,
        unique: false,
    },

    read: {
        type: Boolean,
        unique: false,
    }

});

//schema.plugin(autoIncrement.plugin, 'id');

module.exports = model('PrivateMessages', schema);
