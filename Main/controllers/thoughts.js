const { ObjectId } = require('mongoose').Types;
const { User, Thought} = require('../models');
module.exports={
    
    getThoughts(req, res){
        Thought.find()
        .then((thoughts)=>res.json(thoughts))
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        });
        
    },

    
    createThought(req, res){
        Thought.create(req.body)
        .then( (thought)=> {
            // return User.findOneAndUpdate(
            //     { username: req.body.username },
            //     { $addToSet: { thoughts: thought._id } },
            //     { new: true }
            //   );
            res.json(thought);
        })
       
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        });
    },

  
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId})
        .then((thought)=>
        !thought
            ?res.json({message:"no thoughts found"})
            :res.json(thought)
            )
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        });
        
    },
    updateThought(req, res){
        Thought.findOneAndUpdate({ _id: req.params.thoughtId},
            { $set: req.body },
            { runValidators: true, new: true })
        .then((thought)=>
        !thought
            ?res.json({message:"no thoughts found"})
            :res.json(thought)
            )
        
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        });
        
    },
    deleteThought(req, res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought)=>
        !thought
            ?res.json({message:"no thoughts found"})
            :(res.json({message:"thought deleted!"}))
            )
        
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        });
        
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .json({ message: 'No thoughts found' })
              : res.json(thought)
          )
          .catch((err) => res.json(err));
      },
      
      removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .json({ message: 'No thoughts found' })
              : res.json(thought)
          )
          .catch((err) => res.json(err));
      },
};