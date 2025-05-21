const express = require('express');
const router = express.Router();

// GET /api/fourth/nth-largest?nums=5,1,8,4&n=2
router.get('/nth-largest', (req, res) => {
  const nums = req.query.nums?.split(',').map(Number).filter(n => !isNaN(n)) || [];
  const n = parseInt(req.query.n);

  if (nums.length === 0 || isNaN(n) || n <= 0 || n > nums.length) {
    return res.status(400).json({ error: "Invalid input" });
  }

  nums.sort((a, b) => b - a);
  res.json({ nth_largest: nums[n - 1] });
});

module.exports = router;
