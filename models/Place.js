const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  idUser: { type: String, required: true },
  description: String,
  location: {
    lat: { type: String },
    lng: { type: String },
  },
  changingRoom: { type: Boolean, default: false },
  babyChair: { type: Boolean, default: false },
  childrenMenu: { type: Boolean, default: false },
  gameZone: { type: Boolean, default: false },
  imgName: String,
  url: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;
