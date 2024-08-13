const express = require('express');
const router = express.Router();
const Person= require('./../models/person');

router.post('/', async (req, res) => {
    try {
        const data = req.body; //assuming the request body contains the person data
  
        //create a new person document usingthe mongoose model
        const newPerson = new Person(data);

         //save the new person to the database
        const response = await newPerson.save();
        console.log('Data saved');
        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// get method to get the person
router.get('/',async (req, res)=>{
    try{
        const data = await Person.find();
        console.log('Data fetched');
        res.status(201).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/:workType', async(req, res) => {
    try {
        const workType = req.params.workType; // extract the work type from the URL parameter
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            // Handle valid workType
            const response = await Person.find({work: workType});
            console.log('responce is fetched');
            res.status(200).json({response});
        } else {
            // Handle invalid workType
            res.status(400).json({error:'Invalid work type'});
        }
    } catch (err) {
        // Handle errors
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
});


router.put('/:id',async (req, res)=>{
    try{
        const personId = req.params.id; //extract the id fro the URL parameter
        const updatedPersonData = req.body; //update data for person

        const responce = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true,  //Return the updated document
            runValidators: true,  //run mongoose validation
        })
        if (!responce) {
            return res.status(404).json({ error: 'person not found' });
        }

        console.log('person data updated');
        res.status(200).json(responce);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // extract the ID from the URL parameter
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Person deleted successfully');
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;