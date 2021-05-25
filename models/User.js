const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Please enter a valid Username',
            trim: true
        },
        email: {
            type: String,
            required: 'Please enter a valid Password',
            unique: true,
            validate: {
                validator: function (isEmail) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(isEmail);
                }
            }
        },
        thoughts: {

        },
        friends: {

        }
    }
);
//Virtual friendCount
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

const User = model('User', UserSchema);

module.exports = User;
