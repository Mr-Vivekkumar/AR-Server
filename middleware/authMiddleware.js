const jwt = require("jsonwebtoken");

// const authenticateJWT = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.sendStatus(403);
  
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     if (user.userType !== 'admin') return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };


const authenticateJWT = (req, res, next) => {
  console.log("Received request to:", req.originalUrl); // Log the request URL
  const authHeader = req.header('Authorization');
  console.log("Authorization Header:", authHeader); // Log the Authorization header
  
  const token = authHeader?.split(' ')[1];
  console.log("Extracted Token:", token); // Log the extracted token
  
  if (!token) {
    console.log("No token provided. Sending 403.");
    return res.sendStatus(403); // No token, send 403
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("JWT verification failed:", err.message); // Log the error if verification fails
      return res.sendStatus(403); // JWT verification failed, send 403
    }

    console.log("JWT verification successful:", user);
    console.log("***********************"); // Log the verified user payload

    // if (user.userType !== 'admin') {
    //   console.log("User is not admin. Sending 403.");
    //   return res.sendStatus(403); // User is not an admin, send 403
    // }

    req.user = user;
    console.log("Admin verified. Proceeding to next middleware."); // Log if admin verified
    next(); // Proceed to the next middleware
  });
};




module.exports = authenticateJWT;
