const { Schema, model, Types } = require('mongoose');

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

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: 'Please enter a Reaction.',
            maxlength: 280,
        },
        username: {
            type: String,
            required: 'Please enter Username.',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

//Schema settings-create virtual reactionCount
ThoughtSchema.virtual("reactionCount").get(() => {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;