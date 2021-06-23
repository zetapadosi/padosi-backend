import { Schema, model } from 'mongoose';

const postSchema = new Schema(
 {
  text: { type: String },
  likes: [{ type: Schema.ObjectId, ref: 'User' }],
  comments: [
   {
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: Schema.ObjectId, ref: 'User' },
   },
  ],
 },
 { timestamp: true }
);

export default model('Post', postSchema);
