const mongoose = require('mongoose');

const userRewardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rewardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward', required: true },
    redeemedAt: { type: Date, default: Date.now },
    pointsDeducted: { type: Number, required: true }
}, { versionKey: false });

// Export schema
module.exports = mongoose.model('UserReward', userRewardSchema, 'UserReward');
