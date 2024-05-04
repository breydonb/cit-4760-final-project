import { mongoose } from 'mongoose';
import failedBanksSchema from '../Models/FailedBank.js';
import connectToDatabase, { db } from './connectToDatabase.js';

const getCollection = async () =>{
    if(db.readyState === 1){
        try{
            const model = mongoose.model('Bank', failedBanksSchema, 'banks');
            const bank = await model.find().exec();
            return bank;
        }
        catch(err){
            console.error(err);
        }
    }
    else{
        await connectToDatabase();
        return new Promise((resolve, reject) =>{
            db.once('open', async () => {
                try{
                    const model = mongoose.model('Bank', failedBanksSchema, 'Failed Banks');
                    const bank = await model.find().exec();
                    resolve(bank);
                }
                catch(err){
                    reject(err);
                }
            });
        })
    }
}

export default getCollection