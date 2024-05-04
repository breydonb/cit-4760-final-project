import { Schema } from 'mongoose';

const failedBanksSchema = new Schema({
    name : String,
    city: String,
    state: String,
    cert: Number,
    aquiredInstution: String,
    closingDate: Date,
    fund: Number
});

export default failedBanksSchema;
