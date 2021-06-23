import { Schema, model } from 'mongoose';

const userSchema = new Schema(
 {
  userName: { type: String },
  email: { type: String },
  picture: { type: String },
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
