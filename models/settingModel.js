const settingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Nullable for global settings
    key: { type: String, required: true },
    value: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false });

// Export schema
module.exports = mongoose.model('Settings', settingsSchema, 'Settings');
