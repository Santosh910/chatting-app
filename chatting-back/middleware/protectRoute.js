import UserModel from "../models/User.model.js";
import jwt from 'jsonwebtoken'

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                message: "unauthorized-no token provided",
                success: false
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SEC);

        if (!decoded) {
            return res.status(401).json({
                message: "unauthorized-invalid token",
                success: false
            })
        }

        const user = await UserModel.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "user not found",
                success: false
            })
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({message:error,success:false})
    }

}

export default protectRoute;