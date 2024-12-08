const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const secretKey = 'yourSecretKey'; // Replace with your own secret key
    const options = {
      expiresIn: '1h', // Token expiration time
    };

  
    const payload = {
        userId: user.dataValues.id,
        username: user.dataValues.user_name,
        email: user.dataValues.email,
      };

  
    const token = jwt.sign(payload, secretKey, options);
    return token;
  };

  const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      
      jwt.verify(token, 'yourSecretKey', (err, decodedToken) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: 'Invalid token',
          });
        } else {
          req.user = decodedToken;  // Attach the entire decoded token to req.user
          next();
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Token is not provided',
      });
    }
  };

module.exports = {
  generateToken,
  validateToken
};