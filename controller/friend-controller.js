const { User, Thought } = require('../models');

const friendController = {
    async addFriend({ params }, res) {
        const addedFriend = await User.findByIdAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId } },
            { new: true }).populate({ path: 'friends' });
        if (!addedFriend) {
            res.status(404).json({ message: 'User Not Found.' })
        }
        res.json(addedFriend);
    },
    async deleteFriend({ params }, res) {
        const deletedFriend = await User.findByIdAndDelete(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        );
        if (!deletedFriend) {
            res.status(404).json({ message: 'User Not Found.' })
        }
        res.json(deletedFriend);

    }
}
module.exports = friendController;