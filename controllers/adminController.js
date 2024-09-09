// controllers/adminController.js
const Plan = require('../models/Plan');
const User = require('../models/User');

// Get all users controller
exports.getAllUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.send(users);
   } catch (err) {
      res.status(400).send(err);
   }
};

// Get pending plans controller
exports.getPendingPlans = async (req, res) => {
   const pendingPlans = await Plan.find({ approved: false });
   res.send(pendingPlans);
};

// Approve a plan controller
exports.approvePlan = async (req, res) => {
   const { planId } = req.body;

   try {
      const plan = await Plan.findById(planId);
      if (!plan) return res.status(404).send('Plan not found');

      plan.approved = true;
      plan.planStartDate = new Date();
      plan.planEndDate = new Date(Date.now() + plan.planDuration * 24 * 60 * 60 * 1000);

      await plan.save();
      res.send('Plan Approved');
   } catch (err) {
      res.status(400).send(err);
   }
};

// Withdraw interest controller
exports.withdrawInterest = async (req, res) => {
   const { planId } = req.body;

   try {
      const plan = await Plan.findById(planId);
      if (plan.withdrawalOfInterest) {
         plan.totalAmountWithdrawn += plan.amountToWithdraw;
         plan.amountToWithdraw = 0;
         plan.withdrawalOfInterest = false;

         await plan.save();
         res.send('Interest Credited');
      } else {
         res.status(400).send('No interest withdrawal request found');
      }
   } catch (err) {
      res.status(400).send(err);
   }
};
