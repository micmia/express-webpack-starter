const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  title: {
    type: String,
    index: true,
    required: true
  },
  description: String
});

StorySchema.statics.fillable = ['title', 'description'];

module.exports = mongoose.model('Story', StorySchema);
