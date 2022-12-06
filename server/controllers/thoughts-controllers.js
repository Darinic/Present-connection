const {validationResult} = require('express-validator');

const Thought = require('../models/thought');
const Auth = require('../models/auth');

const getThoughts = async (req, res) => {
  let thoughts;
  
  try {
    thoughts = await Thought.find({});
    } catch (err) {
        res.status(500).json({message: 'Something went wrong, could not find thoughts.'});
        }
    res.json({thoughts: thoughts.map(thought => thought.toObject({getters: true}))});
};

const GetThoughtById = async (req, res) => {
    const thoughtId = req.params.tid;
    let thought;
    try {
        thought = await Thought.findById(thoughtId);
    } catch (err) {
        res.status(500).json({message: 'Something went wrong, could not find thought.'});
    }
    if (!thought) {
        res.status(404).json({message: 'Could not find thought for the provided id.'});
    }
    res.json({thought: thought.toObject({getters: true})});
};

const createThought = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({message: 'Invalid inputs passed, please check your data.'});      
    }

    const { thought, hashtag1, hashtag2} = req.body;
    const createdThought = new Thought({
        thought,
        hashtag1,
        hashtag2,
        creator: req.userData.userId
    });

    let user;

    try {
        user = await Auth.findById(req.userData.userId);
    } catch (err) {
        return res.status(500).json({message: 'Creating thought failed, please try again later.'});
    }

    if (!user) {
        return res.status(404).json({message: 'Could not find user for provided id.'});
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdThought.save({session: sess});
        user.thoughts.push(createdThought);
        await user.save({session: sess});
        await sess.commitTransaction();
    } catch (err) {
        return res.status(500).json({message: 'Creating thought failed, please try again later.'});
    }

    res.status(201).json({thought: createdThought});
};

exports.createThought = createThought;
exports.getThoughts = getThoughts;
exports.GetThoughtById = GetThoughtById;
