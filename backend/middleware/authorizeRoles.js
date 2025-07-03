// export default function authorizeRoles(...allowedRoles) {
//   return (req, res, next) => {
//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     next();
//   };
// }


const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: Unauthorized role' });
    }
    next();
  };
};

export default authorizeRoles;
