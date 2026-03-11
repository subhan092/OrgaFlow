 
 import SignupForm from "@/components/Signup_form"

export default function SignupPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE FORM */}
      <div className="flex items-center justify-center p-8">
        <SignupForm />
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden md:block relative">
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
          alt="signup"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

    </div>
  )
}