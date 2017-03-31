const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  description: String
});

module.exports = mongoose.model('Story', StorySchema);