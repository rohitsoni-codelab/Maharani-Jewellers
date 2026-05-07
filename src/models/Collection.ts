import mongoose, { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
  title: string;
  slug: string;
  description: string;
  bannerImage: string;
  status: 'draft' | 'published' | 'archived';
  sortOrder: number;
  isDeleted: boolean;
  seo: {
    title: string;
    description: string;
  };
}

const CollectionSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  bannerImage: { type: String },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  sortOrder: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
  seo: {
    title: { type: String },
    description: { type: String },
  }
}, { timestamps: true });

export const Collection = mongoose.models.Collection || mongoose.model<ICollection>('Collection', CollectionSchema);
