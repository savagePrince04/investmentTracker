// routes/admin.js
const express = require('express');
const { getAllUsers, getPendingPlans, approvePlan, withdrawInterest } = require('../controllers/adminController');
const router = express.Router();

router.get('/users', getAllUsers);
router.get('/pending-plans', getPendingPlans);
router.post('/approve-plan', approvePlan);
router.post('/withdraw-interest', withdrawInterest);

module.exports = router;
