// models/Plan.js
const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
   fullName: { type: String, required: true },
   phone: { type: Number, required: true },
   queryDate: { type: Date, default: Date.now },
   planTitle: { type: String, required: true },
   planStartDate: Date,
   planEndDate: Date,
   amountInvested: { type: Number, required: true },
   planInterestRate: { type: Number, default: 5 },
   planDuration: { type: Number, default: 700 },
   withdrawal: { type: Boolean, default: false },
   withdrawalDone: { type: Boolean, default: false },
   approved: { type: Boolean, default: false },
   withdrawalOfInterest: { type: Boolean, default: false },
   amountToWithdraw: Number,
   totalAmountWithdrawn: { type: Number, default: 0 }
});

module.exports = mongoose.model('Plan', planSchema);
