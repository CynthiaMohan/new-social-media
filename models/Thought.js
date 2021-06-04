const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

ThoughtSchema = new Schema(
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
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Please enter username',
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
ThoughtSchema.virtual("reactionCount").get(() => {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = { Thought, ReactionSchema };