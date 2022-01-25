import mongoose, { Schema, model, Document } from "mongoose";

export interface LikeBook {
  email: string;
  title: string;
  author: string;
  smallImageUrl: string;
}

const LikeBookSchema = new Schema(
  {
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    email: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    coverSmallUrl: { type: String, required: true },
    href: { type: String, required: true },
    avatar: { type: String, required: true },
    content: { type: String, required: true },
    coverLargeUrl: { type: String, required: true },
    publisher: { type: String, required: true },
    customerReviewRank: { type: Number, required: true },
    categoryName: { type: String, required: true },
    isbn: { type: String, required: true },
    priceStandard: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model('LikeBook', LikeBookSchema);
export const LikeBookModel = model<LikeBook & Document>(
  "LikeBook",
  LikeBookSchema
);
