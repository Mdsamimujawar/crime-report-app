import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = ContactSchema.parse(json);

    // Try to capture client IP (works on most hosts / proxies)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      null;

    const saved = await prisma.contactMessage.create({
      data: { ...data, ip },
    });

    return NextResponse.json(
      { success: true, id: saved.id, message: "Message received." },
      { status: 201 }
    );
  } catch (err: any) {
    if (err?.name === "ZodError") {
      return NextResponse.json({ success: false, errors: err.issues }, { status: 400 });
    }
    console.error("Contact POST error:", err);
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
