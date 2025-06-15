import mongoose from 'mongoose';

const eventLogSchema = new mongoose.Schema({
    action: String,
    videoId: String,
    details: mongoose.Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('EventLog', eventLogSchema);
