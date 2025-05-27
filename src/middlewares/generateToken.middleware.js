import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const token = jwt.sign({ user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d',
    });

    return token;
};