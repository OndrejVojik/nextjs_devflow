import { model, models, Schema, Types } from "mongoose";

export interface IInteraction {
    user: Types.ObjectId; // Reference to the User model
    action: string; // e.g., 'upvote', 'downvote', 'comment'
    actionId: Types.ObjectId; // Reference to the Question or Answer
    actionType: "question" | "answer"; // Type of the target (question or answer)
}

const InteractionSchema = new Schema<IInteraction>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        action: { type: String, required: true }, // e.g., 'upvote', 'downvote', 'comment'
        actionId: { type: Schema.Types.ObjectId, required: true }, // Reference to the Question or Answer
        actionType: { type: String, enum: ["question", "answer"], required: true }, // Type of the target (question or answer)
    }, 
    { timestamps: true }
);

const Interaction = models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;