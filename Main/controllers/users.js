const { ObjectId } = require('mongoose').Types;
const { User, Thought} = require('../models');
module.exports={
    
    getUsers(req, res){
        User.find()
        .then((users)=>res.json(users))
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        });
        
    },

    
    createUser(req, res){
        User.create(req.body)
        .then((user)=>{ res.json(user
            );
            
        })
        
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        });
    },

  
    getSingleUser(req, res){
        User.findOne({ _id: req.params.userId})
        .then((user)=>
        !user
            ?res.json({message:"no users found"})
            :res.json(user)
            )
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        });
        
    },
    updateUser(req, res){
        User.findOneAndUpdate({ _id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true })
        .then((user)=>
        !user
            ?res.json({message:"no users found"})
            :res.json(user)
            )
        
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        });
        
    },
    deleteUser(req, res){
        User.findOneAndDelete({ _id: req.params.userId})
        .then((user)=>
        !user
            ?res.json({message:"no users found"})
            :Thought.deleteMany({_id:{$in: user.thoughts}}).then(res.json({message:"user deleted!"}))
            )
        
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        });
        
    },
    addFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $addToSet: {friends : req.params.friendId}},
            {new :true}

        )
        .then(res.json({message:"friend added!"}))
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        });
    },
    removeFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: {friends : req.params.friendId}},

        )
        .then(res.json({message:"friend removed :("}))
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        });
    },
};