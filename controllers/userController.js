// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Plan = require('../models/Plan');

// Signup controller
exports.signup = async (req, res) => {
   const { fullName, email, password, phone } = req.body;

   const emailExists = await User.findOne({ email });
   if (emailExists) return res.status(400).send('Email already exists');

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const user = new User({ fullName, email, password: hashedPassword, phone });

   try {
      const savedUser = await user.save();
      res.send({ userId: savedUser._id });
   } catch (err) {
      res.status(400).send(err);
   }
};

// Login controller
exports.login = async (req, res) => {
   const user = await User.findOne({ email: req.body.email });
   if (!user) return res.status(400).send('Email not found');

   const validPass = await bcrypt.compare(req.body.password, user.password);
   if (!validPass) return res.status(400).send('Invalid password');

   const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
   res.header('auth-token', token).send(token);
};

// Post new plan controller
exports.postNewPlan = async (req, res) => {
   const { amount, queryDate } = req.body;
   const user = await User.findById(req.user._id);

   const planCount = await Plan.countDocuments({ fullName: user.fullName });
   const planTitle = `Investment${planCount + 1}`;

   const plan = new Plan({
      fullName: user.fullName,
      phone: user.phone,
      amountInvested: amount,
      queryDate: queryDate,
      planTitle
   });

   try {
      const savedPlan = await plan.save();
      res.status(201).send(savedPlan);
   } catch (err) {
      res.status(400).send(err);
   }
};

// Get all plans by user controller
exports.getAllPlans = async (req, res) => {
   const plans = await Plan.find({ email: req.user.email });
   res.send(plans);
};

// Request KYC controller
exports.requestKyc = async (req, res) => {
   const user = await User.findById(req.user._id);
   user.kycRequested = true;

   try {
      await user.save();
      res.send('Request for KYC initiated.');
   } catch (err) {
      res.status(400).send(err);
   }
};
