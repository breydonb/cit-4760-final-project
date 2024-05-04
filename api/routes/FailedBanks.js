import express from 'express';
import getCollection from '../Services/getCollection.js';
import sortBy from '../Services/sortBy.js';
import sortByState from '../Services/sortByState.js';

const { Router } = express;
const router = Router();

router.get("/", (req, res) => {
    try{
        getCollection().then(banks =>{
            const data = banks.map(bank => bank.toJSON());
            res.json(data);
        })
        .catch(err =>{
            console.error(err);
            res.status(500).send("Internal Server Error");
        })
    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/count-by-year/", async (req, res) => {
    try{
        const response = await sortBy();
        res.json(response);
}
    catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/us-graph/", async (req, res) => {
    try{
        const response = await sortByState();
        res.json(response);
    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

export default router;