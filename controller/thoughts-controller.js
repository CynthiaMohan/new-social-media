const { Thought, User } = require('../models');
const { updateUser } = require('./user-controller');


const thoughtController = {
    //Get all thoughts
    async getAllThoughts(req, res) {
        const getAll = await Thought.find({}).select('-__v').sort({ _id: -1 });
        res.json(getAll)
    },
    //Get thought by Id
    async getThoughtsById({ params }, res) {
        const getthought = await Thought.findById({ _id: params.id }).select('-__v');
        if (!getthought) {
            res.status(404).json({ message: 'No Thought Found' });
        }
        res.json(getthought);
    },
    // Create a new thought and push the created thought's _id to the associated user's thoughts array field
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
            })
    },
    //Update a thought by Id
    async updateThought({ params, body }, res) {
        const updatedThought = await Thought.findByIdAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });
        if (!updatedThought) {
            res.status(404).json({ message: 'Thought Not Found!' });
            return;
        }
        res.json(updatedThought);
    },
    //Delete a thought by Id
    async deleteThought({ params }, res) {
        const deletedThought = await Thought.findByIdAndDelete({ _id: params.thoughtId });
        if (!deletedThought) {
            res.status(404).json({ message: 'No thought Found with this Id' });
            return;
        }
        res.json(deletedThought);
    },
    // create a reaction stored in a single thought's reactions array field
    async addReaction({ params, body }, res) {
        console.log(`Add REACTION ${params} and Body is  ${body}`);
        const newReaction = await Thought.findByIdAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true });
        res.json(newReaction);
    },
    //  pull and remove a reaction by the reaction's reactionId value
    async deleteReaction({ params }, res) {
        console.log('deleting reaction...');
        const deletedReaction = await Thought.findByIdAndDelete({ _id: params.id }, { $pull: { reactions: { reactionsId: params.reactionsId } } }, { new: true });
        if (!deletedReaction) {
            res.status(404).json({ message: 'Reaction to be deleted Not Found!' });
            return;
        }
        res.json(deletedReaction);
    }
};

module.exports = thoughtController;