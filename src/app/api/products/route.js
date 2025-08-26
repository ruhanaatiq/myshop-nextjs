// src/app/api/products/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // <-- v4 options

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(
      products.map((p) => ({
        id: p._id.toString(),
        name: p.name,
        brand: p.brand ?? null,
        description: p.description ?? "",
        price: p.price,
        thumbnail: p.thumbnail ?? null,
      }))
    );
  } catch (e) {
    console.error("GET /api/products failed:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    // v4 session check
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    const name = (body.name || "").trim();
    const price = Number(body.price);
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json({ error: "Price must be a valid number" }, { status: 400 });
    }

    const images = Array.isArray(body.images)
      ? body.images.map(String).map((s) => s.trim()).filter(Boolean)
      : body.images
      ? String(body.images).split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    let tags = null;
    if (Array.isArray(body.tags)) tags = body.tags.join(" ");
    else if (typeof body.tags === "string") tags = body.tags;

    const doc = await Product.create({
      name,
      brand: body.brand?.trim() || null,
      description: body.description?.trim() || "",
      price,
      thumbnail: body.thumbnail?.trim() || null,
      images,
      tags,
    });

    return NextResponse.json({ id: doc._id.toString() }, { status: 201 });
  } catch (err) {
    console.error("POST /api/products failed:", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
