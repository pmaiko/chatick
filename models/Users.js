const {Schema, model} = require('mongoose');
//const autoIncrement = require('mongoose-auto-increment');

const schema = new Schema({
    id : {
        type : Schema.Types.ObjectId,
    },

    firstName: {
        type: String,
        unique: false,
    },

    lastName: {
        type: String,
        unique: false,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        index: true,

    },

    password: {
        type: String,
        required: true,
        unique: true,
    }

});

//schema.plugin(autoIncrement.plugin, 'id');

module.exports = model('Users', schema);
