import { model, models, Schema, Document } from 'mongoose';

export interface IUser {
    name: string;
    username: string;
    email: string;
    bio?: string;
    image?: string;
    location?: string;
    portfilio?: string;
    reputation?: number;
}

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema(
{
    name: {   type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String},
    image: { type: String},
    location: { type: String},
    portfilio: { type: String},
    reputation: { type: Number, default: 0 },
},
{timestamps: true}
);

const User = models?.User || model<IUser>('User', UserSchema);

export default User;