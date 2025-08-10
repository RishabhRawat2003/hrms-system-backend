
import mongoose from 'mongoose';
import { APPROVED, PENDING, REJECTED } from '../constants/enum';
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    leave_date: {
        type: String,
        required: true
    },
    doc: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [PENDING, APPROVED, REJECTED],
        default: PENDING
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

leaveSchema.set('versionKey', false);

export default mongoose.model('Leave', leaveSchema);
