// const { Schema, model, Types } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

// const ReactionSchema = new Schema(
//     {
//         reactionId: {
//             type: Types.ObjectId,
//             default: new Types.ObjectId(),
//         },
//         reactionBody: {
//             type: String,
//             required: [true, 'Please enter a Reaction.'],
//             maxlength: 280,
//         },
//         username: {
//             type: String,
//             required: [true, 'Please enter Username.'],
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             // Use a getter method to format the timestamp on query
//             get: createdAtVal => dateFormat(createdAtVal)
//         }
//     },
//     {
//         toJSON: {
//             getters: true
//         },
//         id: false
//     }
// );

// module.exports = ReactionSchema;