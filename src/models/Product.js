import { Schema, model, models } from "mongoose";

const VariantSchema = new Schema(
  {
    color: String,
    storage: String, // e.g., 128GB, 512GB
    ram: String,     // e.g., 8GB, 16GB
    price: Number,
    sku: { type: String, trim: true },
    inStock: { type: Number, default: 0 },
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    // basics
    name: { type: String, required: true, trim: true },         // e.g., iPhone 15 Pro
    brand: { type: String, required: true, trim: true },        // e.g., Apple
    model: { type: String, trim: true },                        // e.g., A3106
    category: { type: String, default: "gadget", index: true }, // always "gadget" for this app
    description: { type: String, required: true },

    // commerce
    price: { type: Number, required: true, min: 0 },
    sku: { type: String, unique: true, sparse: true, trim: true },
    inStock: { type: Number, default: 0, min: 0 },

    // media
    images: [{ type: String }], // URLs
    thumbnail: String,

    // tags & specs
    tags: [{ type: String, trim: true, lowercase: true }],
    specs: {
      chipset: String,
      display: String,    // "6.1\" OLED 120Hz"
      battery: String,    // "5000mAh"
      cameras: String,    // "50MP + 12MP"
      storage: String,    // "256GB"
      ram: String,        // "8GB"
      os: String,         // "Android 14"
      connectivity: String, // "Wi-Fi 6E, BT 5.3, 5G"
      weight: String,
      dimensions: String,
      ports: String,      // "USB-C, HDMI 2.1"
    },

    // variants (optional)
    variants: [VariantSchema],

    // audit
    createdById: { type: String },
  },
  { timestamps: true }
);

// handy text index for search
ProductSchema.index({ name: "text", brand: "text", description: "text", tags: 1 });

export default models.Product || model("Product", ProductSchema);
