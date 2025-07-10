
import jwt from "jsonwebtoken";

// Middleware to verify JWT and attach user to req
export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("🔍 Authorization header:", authHeader); 

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("✅ Token decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ JWT error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Alias if needed (same as auth)
export const verifyToken = auth;

// Admin check
export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied: Admins only" });
  }
  next();
};
