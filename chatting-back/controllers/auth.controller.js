import UserModel from "../models/User.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from 'bcryptjs';


export const Signup = async (req, res) => {
    try {
        const {
            fullName,
            username,
            password,
            confirmPassword,
            gender
        } = req.body;
        if (password !== confirmPassword) return res.status(401).json({
            message: "password dont match",
            success: false
        })

        const user = await UserModel.findOne({
            username
        });

        if (user) {
            return res.status(400).json({
                message: "username already exists",
                success: false
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new UserModel({
            fullName,
            username,
            password: hashedPass,
            gender,
            profilPic: gender === "male" ? boyProfilePic : girlProfilePic,
        })

        if (newUser) {
            generateTokenAndSetCookie({userId:newUser._id}, res);
            await newUser.save();

            res.status(201).json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    name: newUser.username,
                    profilePic: newUser.profilPic
            });
        } else {
            return res.status(400).json({
                message: "invalid user data",success:false
            });
        }


    } catch (error) {
        return res.status(500).json({
            message: error,
            success: false
        })
    }
}

export const Login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        const user = await UserModel.findOne({username})
        const isPass = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPass) return res.status(401).json({
            message: "all fields are mandotory",
            success: false
        })

       
        // if (!user) return res.status(401).json({
        //     message: "username not correct",
        //     success: false
        // })


        
        // if (!isPass) {
        //     return res.status(401).json({
        //         message: "password is wrong",
        //         success: false
        //     })
        // }

        // const token = await Jwt.sign({id:user._id},process.env.JWT_SEC)
        generateTokenAndSetCookie({userId:user._id}, res)

         res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                name: user.username,
                profilePic: user.profilPic
            
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
            success: false
        })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        });
        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};