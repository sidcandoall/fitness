import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_in_production";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.error("No auth header");
      return res.status(401).json({ message: "No token provided" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      console.error("Invalid auth header format:", authHeader.substring(0, 20));
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = authHeader.substring(7).trim(); // Remove "Bearer " and trim whitespace
    
    if (!token) {
      console.error("Empty token after extraction");
      return res.status(401).json({ message: "Empty token" });
    }
    console.log("Token to verify:", token.substring(0, 30) + "...");
    
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      console.error("JWT Verification Error:", jwtError.message);
      return res.status(401).json({ message: "Invalid token: " + jwtError.message });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      console.error("User not found for id:", decoded.id);
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Unauthorized: " + error.message });
  }
};

export default authMiddleware;