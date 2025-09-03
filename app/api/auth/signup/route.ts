import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Utility: standardized API responses
function response(
  data: object,
  status: number = 200,
  headers: Record<string, string> = {}
) {
  return NextResponse.json(
    {
      success: status >= 200 && status < 300,
      timestamp: new Date().toISOString(),
      ...data,
    },
    { status, headers }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    // 🔹 1. Input validation
    if (!email || !password || !name) {
      return response({ error: "All fields (email, name, password) are required." }, 400);
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return response({ error: "Invalid email format." }, 400);
    }

    if (password.length < 8) {
      return response({ error: "Password must be at least 8 characters long." }, 400);
    }

    // 🔹 2. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return response({ error: "User with this email already exists." }, 409);
    }

    // 🔹 3. Secure password hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    // 🔹 4. Enforce allowed roles
    const allowedRoles = ["ADMIN", "MODERATOR", "USER"] as const;
    const userRole = allowedRoles.includes(role) ? role : "USER";

    // 🔹 5. Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: userRole,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    // 🔹 6. Return safe response
    return response(
      {
        message: "User registered successfully.",
        user,
      },
      201
    );
  } catch (error: any) {
    console.error("❌ Signup error:", error);

    // Detect Prisma unique constraint violation
    if (error.code === "P2002") {
      return response({ error: "Email is already registered." }, 409);
    }

    return response({ error: "Internal server error. Please try again later." }, 500);
  }
}