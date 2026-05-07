import mongoose, { Schema, Document } from 'mongoose';

export interface IHomepageConfig extends Document {
  slug: string; // Fixed: "main"
  heroSlides: {
    image: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    order: number;
  }[];
  featuredCollections: mongoose.Types.ObjectId[];
  announcementBar: {
    text: string;
    isVisible: boolean;
  };
  whatsappCta: {
    text: string;
    phone: string;
    isVisible: boolean;
  };
  seo: {
    title: string;
    description: string;
  };
}

const HomepageConfigSchema: Schema = new Schema({
  slug: { type: String, default: "main", unique: true },
  heroSlides: [{
    image: String,
    title: String,
    subtitle: String,
    ctaText: String,
    ctaLink: String,
    order: { type: Number, default: 0 }
  }],
  featuredCollections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
  announcementBar: {
    text: String,
    isVisible: { type: Boolean, default: true }
  },
  whatsappCta: {
    text: String,
    phone: String,
    isVisible: { type: Boolean, default: true }
  },
  seo: {
    title: { type: String },
    description: { type: String }
  }
}, { timestamps: true });

export const HomepageConfig = mongoose.models.HomepageConfig || mongoose.model<IHomepageConfig>('HomepageConfig', HomepageConfigSchema);
