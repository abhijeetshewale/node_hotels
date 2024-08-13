const express = require('express');
const router = express.Router();
const MenuItem= require('../models/MenuItem');




router.post('/', async (req, res) => {
    try {
        const data = req.body; //assuming the request body contains the person data
  
        //create a new person document usingthe mongoose model
        const newMenuItem = new MenuItem(data);

         //save the new person to the database
        const response = await newMenuItem.save();
        console.log('Menu Data saved');
        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/',async (req, res)=>{
    try{
        const data = await MenuItem.find();
        console.log('Menu items fetched');
        res.status(201).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType; // extract the taste type from the URL parameter
        if (tasteType === 'sweet' || tasteType === 'spicy' || tasteType === 'sour') {
            // Handle valid tasteType
            const response = await MenuItem.find({ taste: tasteType });
            console.log('Response fetched');
            res.status(200).json(response);
        } else {
            // Handle invalid tasteType
            res.status(400).json({ error: 'Invalid taste type' });
        }
    } catch (err) {
        // Handle errors
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id; // extract the ID from the URL parameter
        const updatedMenuItemData = req.body; // data to update for menu item

        const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
            new: true,  // Return the updated document
            runValidators: true,  // Run Mongoose validation
        });

        if (!response) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        console.log('Menu item data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id; // extract the ID from the URL parameter
        const response = await MenuItem.findByIdAndDelete(menuItemId);

        if (!response) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        console.log('Menu item deleted successfully');
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Export the router
module.exports = router;