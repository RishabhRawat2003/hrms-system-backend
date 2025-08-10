
import mongoose from 'mongoose';
import { ABSENT, MEDICAL_LEAVE, PRESENT, WORK_FROM_HOME } from '../constants/enum';
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    task: {
        type: String,
    },
    status: {
        type: String,
        enum: [ABSENT, PRESENT, WORK_FROM_HOME, MEDICAL_LEAVE],
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

attendanceSchema.set('versionKey', false);

export default mongoose.model('Attendance', attendanceSchema);
