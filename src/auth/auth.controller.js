import authService from "../services/auth.service.js";
import userModel from "../models/user.model.js";
import { SuccessResponse } from "../middlewares/response.middleware.js";
const authServiceInstance = new authService(userModel);

class authController {
    constructor(authServiceInstance) {
        this.authServiceInstance = authServiceInstance;
    }
    login = async (req, res) => {
        const {email, password} = req.body;
        const result = await authServiceInstance.login({email, password});
        new SuccessResponse({code : result.code, message : result.message, data : result.accessToken}).send(res);
    }
    signup = async (req, res) => {
        const {username, email, password, photo, gender, birthday} = req.body;
        const result = await authServiceInstance.signup({username, email, password, photo, gender, birthday});
        new SuccessResponse({code : result.code, message : result.message, data : result.data}).send(res);
    }
    changePassword = async (req, res) => {
        const id = req.user?.id;
        const {password, newPassword, confirmPassword} = req.body;
        const result = await authServiceInstance.changePassword({id, password, newPassword, confirmPassword});
        new SuccessResponse({code : result.code, message : result.message, data : result.data}).send(res);
    }
    forgotPassword = async (req, res) => {
        const {email} = req.body;
        const result = await authServiceInstance.forgotPassword({email});
        new SuccessResponse({code : result.code, message : result.message, data : result.data}).send(res);
    }
    verifyOTP = async (req, res) => {
        const {email, otp} = req.body;
        const result = await authServiceInstance.verifyOTP({email, otp});
        new SuccessResponse({code : result.code, message : result.message, data : result.data}).send(res);
    }
    resetPassword = async (req, res) => {
        const {email, newPassword, confirmPassword} = req.body;
        const result = await authServiceInstance.resetPassword({email, newPassword, confirmPassword});
        new SuccessResponse({code : result.code, message : result.message, data : result.data}).send(res);
    }
}

export default new authController(authServiceInstance);