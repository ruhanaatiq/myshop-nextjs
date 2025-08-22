import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";

export const runtime = "nodejs";

const gadgets = [
  {
    name: "Pixel 8 Pro", brand: "Google", model: "GA04832-US",
    description: "Flagship Android with excellent camera and Tensor G3.",
    price: 899, sku: "G-PX8P-256-BLU", inStock: 15,
    thumbnail: "https://picsum.photos/seed/pixel8pro/400/260",
    images: ["https://picsum.photos/seed/pixel8pro2/800/520"],
    tags: ["phone","android","5g"],
    specs: { chipset: "Tensor G3", display: "6.7\" OLED 120Hz", battery: "5050mAh", cameras: "50MP + 48MP + 48MP", storage: "256GB", ram: "12GB", os: "Android 14", connectivity: "Wi-Fi 7, BT 5.3, 5G", ports: "USB-C" },
    variants: [{ color: "Obsidian", storage: "256GB", price: 899, sku: "G-PX8P-256-BLK", inStock: 8 }]
  },
  {
    name: "iPhone 15 Pro", brand: "Apple", model: "A3106",
    description: "Titanium design, A17 Pro, USB-C.",
    price: 999, sku: "A-IP15P-256-NAT", inStock: 10,
    thumbnail: "https://picsum.photos/seed/iphone15pro/400/260",
    tags: ["phone","ios","usb-c"],
    specs: { chipset: "A17 Pro", display: "6.1\" OLED 120Hz", battery: "3274mAh", storage: "256GB", os: "iOS 17", connectivity: "Wi-Fi 6E, BT 5.3, 5G", ports: "USB-C" }
  },
  {
    name: "Galaxy Tab S9", brand: "Samsung", model: "SM-X710",
    description: "11\" AMOLED tablet with S Pen included.",
    price: 799, sku: "S-TABS9-128-GRY", inStock: 12,
    thumbnail: "https://picsum.photos/seed/tabs9/400/260",
    tags: ["tablet","android","amoled"],
    specs: { chipset: "Snapdragon 8 Gen 2", display: "11\" AMOLED 120Hz", battery: "8400mAh", storage: "128GB", ram: "8GB", os: "Android 14", connectivity: "Wi-Fi 6E, BT 5.3", ports: "USB-C" }
  },
  {
    name: "MacBook Air 13 M3", brand: "Apple", model: "A3113",
    description: "Ultralight laptop with Apple Silicon.",
    price: 1199, sku: "A-MBA13-M3-256", inStock: 7,
    thumbnail: "https://picsum.photos/seed/mba13/400/260",
    tags: ["laptop","apple","ultrabook"],
    specs: { chipset: "Apple M3", display: "13.6\" Liquid Retina", storage: "256GB", ram: "8GB", os: "macOS", connectivity: "Wi-Fi 6E, BT 5.3", ports: "MagSafe, 2×USB-C" }
  },
  {
    name: "ThinkPad X1 Carbon Gen 11", brand: "Lenovo", model: "21HM",
    description: "Premium business ultrabook.",
    price: 1499, sku: "L-X1C11-i7-16-512", inStock: 5,
    thumbnail: "https://picsum.photos/seed/x1c11/400/260",
    tags: ["laptop","windows","business"],
    specs: { chipset: "Intel Core i7-1355U", display: "14\" IPS 1200p", storage: "512GB", ram: "16GB", os: "Windows 11 Pro", connectivity: "Wi-Fi 6E, BT 5.2", ports: "2×TB4, HDMI, USB-A" }
  },
  {
    name: "WH-1000XM5", brand: "Sony", model: "WH1000XM5/B",
    description: "Industry-leading noise-cancelling headphones.",
    price: 349, sku: "S-WH1000XM5-BLK", inStock: 20,
    thumbnail: "https://picsum.photos/seed/xm5/400/260",
    tags: ["headphones","anc","bluetooth"],
    specs: { battery: "30h", connectivity: "BT 5.2, LDAC", weight: "250g" }
  },
  {
    name: "MX Master 3S", brand: "Logitech", model: "910-006559",
    description: "Ergonomic wireless mouse with MagSpeed wheel.",
    price: 99, sku: "L-MX3S-GR", inStock: 25,
    thumbnail: "https://picsum.photos/seed/mx3s/400/260",
    tags: ["mouse","wireless","ergonomic"],
    specs: { connectivity: "BT/Logi Bolt", battery: "70 days", weight: "141g", dpi: "8000" }
  },
  {
    name: "Keychron K2 V2", brand: "Keychron", model: "K2-V2",
    description: "Compact 75% mechanical keyboard.",
    price: 89, sku: "K-K2V2-RGB-BRW", inStock: 18,
    thumbnail: "https://picsum.photos/seed/k2v2/400/260",
    tags: ["keyboard","mechanical","wireless"],
    specs: { switches: "Gateron Brown", connectivity: "BT/USB-C", battery: "4000mAh" }
  },
  {
    name: "Dell S2721QS", brand: "Dell", model: "S2721QS",
    description: "27\" 4K IPS monitor for productivity.",
    price: 279, sku: "D-S2721QS-4K", inStock: 9,
    thumbnail: "https://picsum.photos/seed/s2721qs/400/260",
    tags: ["monitor","4k","ips"],
    specs: { display: "27\" 4K IPS 60Hz", ports: "2×HDMI, DP, Audio" }
  },
  {
    name: "Anker 737 Power Bank", brand: "Anker", model: "A1289",
    description: "24,000mAh power bank with 140W USB-C PD.",
    price: 159, sku: "A-737-24K-140W", inStock: 30,
    thumbnail: "https://picsum.photos/seed/anker737/400/260",
    tags: ["powerbank","usb-c","pd"],
    specs: { battery: "24,000mAh", ports: "2×USB-C, 1×USB-A", weight: "630g" }
  }
];

export async function POST() {
  await dbConnect();
  // upsert by sku to avoid duplicates
  for (const g of gadgets) {
    await Product.updateOne({ sku: g.sku }, { $set: g }, { upsert: true });
  }
  const count = await Product.countDocuments();
  return NextResponse.json({ ok: true, total: count, upserted: gadgets.length });
}
