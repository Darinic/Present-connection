const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const thoughtSchema = new Schema({
    author: { type: String, required: true },
    thought: { type: String, required: true },
    hashtag1: { type: String, required: true },
    hashtag2: { type: String, required: true },
});

thoughtSchema.set('timestamps', true);

module.exports = mongoose.model('Thought', thoughtSchema);