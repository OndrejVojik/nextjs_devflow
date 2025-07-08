import { model, models, Schema, Types } from "mongoose";

export interface ICollection {
    author: Types.ObjectId; // Reference to the User model
    question: Types.ObjectId; // Reference to the Question model
}

const CollectionSchema = new Schema<ICollection>(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        question: { type: Schema.Types.ObjectId, ref: "Question", required: true }
    }, 
    { timestamps: true }
);

const Collection = models?.Collection || model<ICollection>("Collection", CollectionSchema);

export default Collection;