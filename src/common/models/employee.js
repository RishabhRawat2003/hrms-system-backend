
import mongoose from 'mongoose';
import { FULL_TIME, INTERN, JUNIOR, SENIOR, TEAM_LEAD } from '../constants/enum';
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    full_name:{
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
    position:{
        type: String,
        required: true
    },
    department:{
        type: String,
    },
    employement_type:{
        type: String,
        enum: [INTERN,FULL_TIME,JUNIOR,SENIOR,TEAM_LEAD],
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

employeeSchema.set('versionKey', false);

export default mongoose.model('Employee', employeeSchema);
