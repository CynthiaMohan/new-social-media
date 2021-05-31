const { User, Thoughts } = require('../models');


const thoughtController = {
    async getAllThoughts(req, res) {
        const getAll = await Thoughts.find({}).sort({ _id: -1 });
        res.json(getAll)
    }


};

module.exports = thoughtController;