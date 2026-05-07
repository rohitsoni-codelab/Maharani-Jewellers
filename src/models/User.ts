import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  role: 'admin' | 'viewer';
  name?: string;
  image?: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'viewer'], default: 'viewer' },
  name: { type: String },
  image: { type: String },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
