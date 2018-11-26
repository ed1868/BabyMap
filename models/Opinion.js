const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opinionSchema = new Schema({
  idUser: { type: String, required: true },
  idPlace: { type: String, required: true },
  description: { type: String, required: true },
  rate: {
    type: Number, enum: [0, 1, 2, 3, 4, 5], default: 0, required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Opinion = mongoose.model('Opinion', opinionSchema);
module.exports = Opinion;
