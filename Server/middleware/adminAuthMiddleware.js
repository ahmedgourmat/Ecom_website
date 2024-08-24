const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
require('dotenv').config()

const adminAuthMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;



        if (!authorization) {
            throw new Error('Authorization header is missing');
        }

        const token = authorization.split(' ')[1];




        if (!token) {
            throw new Error('Token is missing');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);



        if (!decoded || !decoded.id) {
            throw new Error('Invalid token');

            
        }
    
        
        const admin = await Admin.findById(decoded.id).select('-password')




        if (!admin) {
            throw new Error('Admin not found');
        }

        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = adminAuthMiddleware;