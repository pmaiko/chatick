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

    userId: {
        type: String,
        unique: false,
    },

});

//schema.plugin(autoIncrement.plugin, 'id');

module.exports = model('GeneralMessage', schema);
