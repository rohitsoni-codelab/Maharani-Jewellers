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
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  keywords: { type: [String], required: true },
  location: { type: String, default: "Katrash, Dhanbad" },
  price: { type: String, default: "Price on Enquiry" },
  weight: { type: String }
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
