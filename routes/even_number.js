const express = require('express');
const router = express.Router();

// Route to get first n even numbers
router.get('/even/:n', (req, res) => {
    const n = parseInt(req.params.n);
    if (isNaN(n) || n <= 0) {
        return res.status(400).send('Please provide a valid positive number.');
    }

    const evenNumbers = [];
    for (let i = 0; evenNumbers.length < n; i++) {
        if (i % 2 === 0) {
            evenNumbers.push(i);
        }
    }

    res.json({ evenNumbers });
});

module.exports=router;
