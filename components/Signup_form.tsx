"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast"
import { set } from "zod";

export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);



const createAccount = async () => {

  const toastId = toast.loading("Creating account...")

  try {
    const response = await axios.post("/api/auth/signup", {
      name,
      email,
      password,
    })

    toast.success("Account created successfully!", {
      id: toastId,
    })

    setName("")
    setEmail("")
    setPassword("")
    setShowPassword(false)

    console.log("Signup successful:", response.data)

  } catch (error: any) {

    const message =
      error?.response?.data?.message ||
      "Signup failed. Please try again."

    toast.error(message, {
      id: toastId,
    })

    console.error("Signup failed:", message)
  }
}

    const isDisabled = !name || !email || !password;

    return (
        <Card className="w-full max-w-md shadow-xl ">
            <CardHeader className="space-y-4 items-center justify-center text-center">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={250}
                    height={300}
                    className="rounded-md"
                />

                <CardTitle className="text-3xl font-bold">
                    Create account
                </CardTitle>

                <CardDescription>
                    Enter your information to create your account
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
                {/* NAME */}
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        className=" focus:outline-none 
                                    focus:border-none       
                                    focus:ring              
                                    focus:ring-primary        
                                    focus:ring-offset-1 "
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@email.com"
                        className=" focus:outline-none 
                                    focus:border-none       
                                    focus:ring              
                                    focus:ring-primary        
                                    focus:ring-offset-1 "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                    <Label>Password</Label>

                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create password"
                            value={password}
                            className=" focus:outline-none 
                                    focus:border-none       
                                    focus:ring              
                                    focus:ring-primary        
                                    focus:ring-offset-1 "
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword
                                ? <EyeOff size={18} />
                                : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* BUTTON */}
                <Button
                    className="w-full bg-primary text-white shadow-2xl py-5 hover:cursor-pointer"
                    disabled={isDisabled}
                    onClick={createAccount}
                >
                    Create Account
                </Button>
            </CardContent>
        </Card>
    );
}
