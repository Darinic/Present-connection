const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, minlength: 7},
    thoughts: [{type: mongoose.Types.ObjectId, required: true, ref: 'Thought'}],
    // followers: [{type: mongoose.Types.ObjectId, required: true, ref: 'User'}],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Auth', userSchema);