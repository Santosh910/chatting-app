import mongoose, { Schema } from "mongoose";

const conversation = new Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
    
},{
    timestamps:true
})
export default mongoose.model("Conversation",conversation)