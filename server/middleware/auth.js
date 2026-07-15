const jwt = require('jsonwebtoken');

// Verify JWT Token
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Normalize the decoded payload to a small user object
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error && error.message ? error.message : error);
    const msg = error && error.name === 'TokenExpiredError' ? 'Token expired' : 'Not authorized to access this route';
    return res.status(401).json({
      success: false,
      message: msg,
    });
  }
};

// Restrict to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'User role is not authorized to access this route',
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
