const { User, Thought } = require('../models');


const userController = {
    //Get all Users
    async getAllUsers(req, res) {
        console.log("inside all users");
        const allUsers = await User.find({})
            .populate({ path: 'thoughts', select: ('-__v') })
            .select('-__v');

        console.log(allUsers);
        res.json(allUsers);
    },
    // getAllUSers(req, res) {
    //     User.find({})
    //         .select('-__v')
    //         .then(dbUSerData => {
    //             res.json(dbUSerData);
    //         })
    //         .catch(e => {
    //             res.json(e);
    //         });
    // },

    //Get user by Id
    async getUserById({ params }, res) {
        console.log('Get user by id' + { params });
        const getUser = await User.findOne({ _id: params.id })
            .populate([
                { path: 'friends', select: "-__v" },
                { path: 'thoughts', select: '-__v' }
            ])
            .select('-__v');
        res.json(getUser);
    },
    //Create a new User
    async createNewUser({ body }, res) {
        const newUser = await User.create(body);
        res.json(newUser);
    },
    //Update an existing User
    async updateUser({ params, body }, res) {
        const updatedUser = await User.findByIdAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User Not Found !!' });
        }
        res.json(updatedUser);
    },
    //Delete an existing User
    async deleteUser({ params }, res) {
        const deletedUser = await User.findByIdAndDelete({ _id: params.id });
        if (!deletedUser) {
            res.status(404).json({ message: 'User Not Found !!' });
        }
        res.json(deletedUser);
    }

}
module.exports = userController;