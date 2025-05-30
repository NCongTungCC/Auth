import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const token = jwt.sign({ id : user._id, role : user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d',
    });

    return token;
};