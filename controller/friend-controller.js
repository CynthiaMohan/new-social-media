const User = require('../models/User');
const Thought = require('../models/Thought');

const friendController = {
    async addFriend({ params }, res) {
        // console.log({ params });
        const addedFriend = await User.findByIdAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId } },
            { new: true }).populate({ path: 'friends' }).populate({ path: 'thoughts' });


        if (!addedFriend) {
            res.status(404).json({ message: 'add friend:User Not Found.' })
        }
        res.json(addedFriend);
    },
    async deleteFriend({ params }, res) {
        const deletedFriend = await User.findByIdAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        );
        if (!deletedFriend) {
            res.status(404).json({ message: 'Delete friend:User Not Found.' })
        }
        res.json(deletedFriend);

    }
}
module.exports = friendController;