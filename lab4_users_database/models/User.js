const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, minlength: 4 },
    email: { 
        type: String, 
        required: true, 
        validate: [validator.isEmail, "Invalid email address"] 
    },
    address: {
        street: { type: String, required: true },
        suite: { type: String, required: true },
        city: { 
            type: String, 
            required: true, 
            validate: {
                validator: (v) => /^[A-Za-z\s]+$/.test(v),
                message: "City name must contain only letters and spaces"
            }
        },
        zipcode: { 
            type: String, 
            required: true, 
            validate: {
                validator: (v) => /^\d{5}-\d{4}$/.test(v),
                message: "Zipcode must be in format DDDDD-DDDD"
            }
        },
        geo: {
            lat: { type: String, required: true },
            lng: { type: String, required: true }
        }
    },
    phone: { 
        type: String, 
        required: true, 
        validate: {
            validator: (v) => /^1-\d{3}-\d{3}-\d{4}$/.test(v),
            message: "Phone number must be in format 1-XXX-XXX-XXXX"
        }
    },
    website: { 
        type: String, 
        required: true, 
        validate: {
            validator: (v) => validator.isURL(v, { protocols: ['http', 'https'] }),
            message: "Invalid website URL"
        }
    },
    company: {
        name: { type: String, required: true },
        catchPhrase: { type: String, required: true },
        bs: { type: String, required: true }
    }
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
