import mongoose,{Schema} from "mongoose"

const user = new Schema({
    fullName:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    gender:{
        type:String,
        require:true,
        enum:["male","female"]
    },
    profilPic:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

export default mongoose.model("User",user)