import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  phone: string;
  whatsapp: string;
  message: string;
  productRef?: mongoose.Types.ObjectId;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  notes?: string;
}

const EnquirySchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String },
  message: { type: String, required: true },
  productRef: { type: Schema.Types.ObjectId, ref: 'Product' },
  status: { type: String, enum: ['new', 'contacted', 'converted', 'closed'], default: 'new' },
  notes: { type: String }
}, { timestamps: true });

export const Enquiry = mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
