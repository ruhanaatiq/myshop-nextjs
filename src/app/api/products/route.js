import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    await dbConnect();
    const docs = await Product.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(
      docs.map(d => ({
        id: d._id.toString(),
        name: d.name,
        brand: d.brand ?? null,
        description: d.description,
        price: d.price,
        thumbnail: d.thumbnail ?? null,  // include for list cards
      }))
    );
  } catch (e) {
    console.error("GET /api/products failed:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let payload;
  try { payload = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  let { name, brand, description, price, category = "gadget", thumbnail = null, images = [], sku } = payload || {};
  if (!name || !brand || !description || typeof price !== "number") {
    return NextResponse.json({ error: "name, brand, description and numeric price are required" }, { status: 400 });
  }
  if (typeof images === "string") {
    images = images.split(",").map(s => s.trim()).filter(Boolean);
  }
  if (!Array.isArray(images)) images = [];

  try {
    await dbConnect();
    const doc = await Product.create({
      name, brand, description, price, category, thumbnail, images, sku,
      createdById: session.user.id ?? session.user.email ?? null,
    });

    return NextResponse.json(
      { id: doc._id.toString(), name: doc.name, brand: doc.brand, description: doc.description, price: doc.price, thumbnail: doc.thumbnail },
      { status: 201 }
    );
  } catch (e) {
    console.error("POST /api/products failed:", e);
    if (e?.code === 11000) return NextResponse.json({ error: "Duplicate SKU" }, { status: 409 });
    if (e?.name === "ValidationError") {
      const first = Object.values(e.errors)[0]?.message || "Validation error";
      return NextResponse.json({ error: first }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
