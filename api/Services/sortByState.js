import failedBanksSchema from '../Models/FailedBank.js';
import connectToDatabase, { db } from './connectToDatabase.js';

const sortByState = async () =>{
    try{
        await connectToDatabase();
        const Model = db.model('Bank', failedBanksSchema, 'banks');
        const result = await Model.aggregate([
            {
                $project: {
                    _id: 0,
                    state: { $substrCP:["$State", 0, { $strLenCP: "$State" }] }
                }
            },
            {
                $group: {
                    _id: '$state',
                    count: { $sum: 1}
                }
            }
        ]).exec();
        return result;
    }
    catch(err){
        console.error(err);
    }
}

export default sortByState;