const { read } = require('fs/promises');
const { User, Thought } = require('../models');

const userController = {
    async getAllUsers(req, res) {
        const allUsers = await User.find({}).populate({ path: 'Thought' });
        res.json(allUsers);
    },

    async getUserById(req, res) {

    },
    async createNewUser({ body }, res) {
        const newUser = await User.create(body);
        res.json(newUser);
    }

}
module.exports = userController;