// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   fullName: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   phone: { type: Number, required: true },
   amount: { type: Number, default: 0 },
   kycRequested: { type: Boolean, default: false },
   kycStatus: { type: Boolean, default: false },
   adhaarNo: String,
   panNo: String,
   accDetails: { accNo: String, ifscCode: String }
});

module.exports = mongoose.model('User', userSchema);
