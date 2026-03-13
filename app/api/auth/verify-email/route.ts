import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 })
  }

  try {

    const user = await prisma.user.findFirst({
      where: {
        emailToken: token
      }
    })

    if (!user) {
      return NextResponse.json({ error: "Token invalid or expired" }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailToken: null
      }
    })

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/verify-email/success`
    )

  } catch (error) {

    return NextResponse.json(
      { error: "Email verification failed" },
      { status: 500 }
    )

  }
}