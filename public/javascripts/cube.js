const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cubeSchema = new Schema({
  name: String,
  description: String,
  image_url: String,
  level: { type: String, required: true },
  accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessories'}]
});
const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;