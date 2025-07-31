import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String, required: true},
    role: {type: String, enum: ['user', 'hotelOwner'], default: 'user'},
    recentSearchedCities: [{type: String, required: true}],
}, {timestamps: true});

export default mongoose.model("User", UserSchema);


