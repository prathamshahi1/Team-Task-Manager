import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader); // DEBUG

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ Split Bearer token
    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token); // DEBUG

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded); // DEBUG

    // ✅ IMPORTANT
    req.user = decoded;

    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};