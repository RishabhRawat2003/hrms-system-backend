
import mongoose from 'mongoose';
import { NEW, ONGOING, REJECTED, SCHEDULED, SELECTED } from '../constants/enum';
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [NEW, SCHEDULED, ONGOING, SELECTED, REJECTED],
        default: NEW,
        required: true
    },
    resume_url: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

candidateSchema.set('versionKey', false);

export default mongoose.model('Candidate', candidateSchema);
