import mongoose, { Schema, model, Document } from "mongoose";


export interface LikeBook {
    email: string;
    title: string;
    author: string;
    smallImageUrl: string;
}

const LikeBookSchema = new Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    email: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    smallImageUrl: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

// module.exports = mongoose.model('LikeBook', LikeBookSchema);
export const LikeBookModel = model<LikeBook & Document>("LikeBook", LikeBookSchema);
