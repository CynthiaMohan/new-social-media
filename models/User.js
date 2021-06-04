const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Please enter a valid Username'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please enter a valid Password'],
            unique: true,
            validate: {
                validator: function (value) {
                    // return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(isEmail);
                    return isEmail(value);
                },
                message: 'Please enter  a valid email'
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);
//Virtual friendCount
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

const User = model('User', UserSchema);

module.exports = User;
