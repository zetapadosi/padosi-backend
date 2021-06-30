import { Schema, model } from 'mongoose';

const FROM_USER = {
 GOOGLE: 'google',
 FACEBOOK: 'facebook',
 DEFAULT: null,
};

const userSchema = new Schema(
 {
  userName: { type: String },
  email: { type: String },
  picture: { type: String },
  userFrom: { type: String, enum: Object.values(FROM_USER), default: FROM_USER.DEFAULT },
  location: {
   type: { type: String, enum: 'Point' },
   coordinates: { type: [Number] },
  },
  following: [{ type: Schema.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.ObjectId, ref: 'User' }],
 },
 { timestamps: true }
);

export default model('User', userSchema);
