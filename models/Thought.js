const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// const ReactionSchema = require('./Reaction');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: [true, 'Please enter a Reaction.'],
            maxlength: 280,
        },
        username: {
            type: String,
            required: [true, 'Please enter Username.'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'A penny for your thoughts'],
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: [true, 'Please enter username'],
            trim: true,
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);



//Schema settings-create virtual reactionCount
ThoughtSchema.virtual("reactionCount").get(function () {
    // console.log('this.reactions.length => ' + this.reactions.length);
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;