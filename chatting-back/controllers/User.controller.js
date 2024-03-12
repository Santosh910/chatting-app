 import UserModel from "../models/User.model.js";

export const getUsersForSidebar = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await UserModel.find({_id:{$ne : loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers);
    } catch (error) {
        return res.status(404).json({ success: false, message: "user not found" })
    }
}

// export const getUsersForSidebar = async(req,res)=>{
//     try {
//         const users = await UserModel.find({})
//         if(users.length){
//             return res.status(200).json({success:true,message:"user found",users:users})
//         }
//         return res.status(404).json({ success: false, message: "users not found" })
//     } catch (error) {
//         return res.status(404).json({ success: false, message: "product not found" })
//     }
// }