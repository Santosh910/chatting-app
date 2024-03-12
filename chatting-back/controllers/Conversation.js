import ConversationModel from "../models/Conversation.model.js"

export const NewConv = async(req,res)=>{
    try {
        const newConversation = new ConversationModel({
            members: [req.body.senderId, req.body.receiverId]
        })
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    } catch (error) {
        return res.status(500).json({message:error,success:false}) 
    }
}

export const getUserConv = async (req,res)=>{
    try {
        const {userId} = req.body;
        const conversation = await ConversationModel.find({
            members: { userId },
          });
          res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json({message:error,success:false}) 
    }
}

export const getConvTwoId = async(req,res)=>{
    try {
        
        const conversation = await ConversationModel.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
          });
          res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({message:error,success:false}) 
    }
}

