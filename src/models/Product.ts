import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  keywords: string[];
  location: string;
  price?: string;
  weight?: string;
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  sortOrder: number;
  collectionId?: mongoose.Types.ObjectId;
  tags: string[];
  isDeleted: boolean;
  seo: {
    title: string;
    description: string;
  };
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  keywords: { type: [String], required: true },
  location: { type: String, default: "Katrash" },
  price: { type: String, default: "Price on Enquiry" },
  weight: { type: String },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  isFeatured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  collectionId: { type: Schema.Types.ObjectId, ref: 'Collection' },
  tags: { type: [String], default: [] },
  isDeleted: { type: Boolean, default: false },
  seo: {
    title: { type: String },
    description: { type: String }
  }
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
