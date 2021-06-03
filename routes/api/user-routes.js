const router = require('express').Router();

const {
    getAllUsers, createNewUser, getUserById, updateUser, deleteUser
} = require('../../controller/user-controller');

const {
    addFriend, deleteFriend
} = require('../../controller/friend-controller');

// /api/users/
router.route('/')
    .get(getAllUsers)
    .post(createNewUser)

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:id/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend)

module.exports = router;