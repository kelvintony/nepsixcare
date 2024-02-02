import mongoose from 'mongoose';

import user from './user';

const postSchema = new mongoose.Schema(
  {
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

const post = mongoose.models.post || mongoose.model('post', postSchema);

export default post;
