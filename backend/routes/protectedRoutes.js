// import express from 'express';
// import auth from '../middleware/auth.js';
// import authorizeRoles from '../middleware/authorizeRoles.js';

// const router = express.Router();

// router.get('/admin-data', auth, authorizeRoles('admin'), (req, res) => {
//   res.json({ message: 'Admin-only data' });
// });

// router.get('/client-data', auth, authorizeRoles('client'), (req, res) => {
//   res.json({ message: 'Client-only data' });
// });

// export default router;


import express from 'express';
import auth from '../middleware/auth.js';
import authorizeRoles from '../middleware/authorizeRoles.js';

const router = express.Router();

// Only accessible to admins
router.get('/admin-data', auth, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Admin-only data' });
});

// Only accessible to clients
router.get('/client-data', auth, authorizeRoles('client'), (req, res) => {
  res.json({ message: 'Client-only data' });
});

export default router;
