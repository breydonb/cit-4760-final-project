import failedBanksSchema from '../Models/FailedBank.js';
import connectToDatabase, { db } from './connectToDatabase.js';

const sortBy = async () =>{
    try{
        await connectToDatabase();
        const Model = db.model('Bank', failedBanksSchema, 'banks');
        const result = await Model.aggregate([
            {
                $project: {
                    year: { $year: { $toDate: "$Closing Date" } }, // Extract year from the "Closing Date" field
                    name: { $substrCP:["$Bank Name", 0, { $strLenCP: "$Bank Name" }] }
                }
            },
            {
                $group: {
                    _id: { year: "$year"}, // Group by year
                    names: { $push: "$name" }, // pushes array of names to result
                    count: { $sum: 1 }, // Count the number of documents in each group
                }
            },
            {
                $sort: { 
                    "_id.year": 1 ,
                    "count": -1
                } 
            }
        ]).exec();
        return result;
    }
    catch(err){
        console.error(err);
    }
}

export default sortBy;