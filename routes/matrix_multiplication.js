const express = require('express');
const router = express.Router();

// POST route to multiply two matrices
router.post('/multiply', (req, res) => {
  const A = req.body.A;
  const B = req.body.B;

  if (!Array.isArray(A) || !Array.isArray(B)) {
    return res.status(400).json({ error: "Both A and B must be matrices (2D arrays)" });
  }

  // Check if matrices are valid
  if (!A.length || !B.length || !A[0].length || !B[0].length) {
    return res.status(400).json({ error: "Matrices must be non-empty 2D arrays" });
  }

  // Check if multiplication is possible
  if (A[0].length !== B.length) {
    return res.status(400).json({ error: "Number of columns in A must equal number of rows in B" });
  }

  // Perform multiplication
  const result = A.map(row =>
    B[0].map((_, i) =>
      row.reduce((sum, val, j) => sum + val * B[j][i], 0)
    )
  );

  res.json({ result });
});

module.exports = router;
