import { NextResponse } from "next/server";
import { signupSchema } from "@/validations/auth.schema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { transporter } from "@/lib/mail";
import generateEmailTemplate from "@/components/emailTemplate";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received signup data:", body); // Debug log

        // 1️⃣ validate input
        const result = signupSchema.safeParse(body);

        if (!result.success) {
            return Response.json(
                { message: result.error.issues[0].message },
                { status: 400 },
            );
        }

        const data = result.data;

        console.log("Validated signup data:", data);
        // Debug log

        // 2️⃣ check existing user
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 },
            );
        }

        // 3️⃣ hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // 4️⃣ create email verification token
        const token = crypto.randomBytes(32).toString("hex");

        // 5️⃣ create user
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                emailToken: token,
            },
        });

        // 6️⃣ send verification email
        const verifyLink =
            `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

        const html = generateEmailTemplate({
            title: "Verify your email",
            message: "Thanks for signing up. Please verify your email address.",
            buttonText: "Verify Email",
            buttonUrl: verifyLink,
        });

        await transporter.sendMail({
            from: "Orgflow <noreply@orgflow.com>",
            to: data.email,
            subject: "Verify your email",
            html: html,
        });

        return NextResponse.json({
            message: "Signup successful. Check email.",
        });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Signup failed" },
            { status: 500 },
        );
    }
}
