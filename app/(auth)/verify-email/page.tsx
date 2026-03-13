"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function VerifyEmailPage() {

  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [status, setStatus] = useState("verifying")

  useEffect(() => {

    if (!token) return

    const verify = async () => {

      try {

        const res = await fetch(`/api/auth/verify-email?token=${token}`)

        if (res.ok) {
          setStatus("success")
        } else {
          setStatus("error")

        }

      } catch (error) {
        setStatus("error")
        console.error("Verification failed:", error)
      }

    }

    verify()

  }, [token])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">

      <div className="w-full max-w-md rounded-xl border p-8 text-center shadow-lg">

        <h1 className="mb-4 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          OrgFlow
        </h1>

        {status === "verifying" && (
          <p className="text-gray-600">Verifying your email...</p>
        )}

        {status === "success" && (
          <>
            <h2 className="mb-2 text-xl font-semibold text-green-600">
              Email Verified 🎉
            </h2>

            <p className="mb-6 text-gray-600">
              Your account has been successfully verified.
            </p>

            <a
              href="/login"
              className="rounded-lg bg-primary px-6 py-2 text-white hover:opacity-90"
            >
              Go to Login
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="mb-2 text-xl font-semibold text-red-600">
              Verification Failed
            </h2>

            <p className="text-gray-600">
              The verification link is invalid or expired.
            </p>
          </>
        )}

      </div>

    </div>
  )
}