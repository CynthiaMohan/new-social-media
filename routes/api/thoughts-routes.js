const router = require('express').Router();

const { getAllThoughts } = require('../../controller/thoughts-controller');

///api/thoughts
router.route('/')
    .get(getAllThoughts)

module.exports = router;