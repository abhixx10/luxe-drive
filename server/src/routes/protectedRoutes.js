import { Router } from 'express';

import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/garage', protect, (req, res) => {
  res.status(200).json({
    message: `Welcome to your private garage, ${req.user.name}`,
    savedCars: [],
    upcomingBookings: []
  });
});

export default router;
