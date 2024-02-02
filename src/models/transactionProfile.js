import mongoose from 'mongoose';
import user from './user';

const transactionProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    accountBalance: { type: Number, float: true, default: 0 },
    accountType: { type: String, default: 'customer' },
  },
  {
    timestamps: true,
  }
);

const transactionProfile =
  mongoose.models.transactionProfile ||
  mongoose.model('transactionProfile', transactionProfileSchema);

export default transactionProfile;
