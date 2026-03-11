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

export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const createAccount = async () => {
        try {
            const response = await axios.post("/api/auth/signup", {
                name,
                email,
                password,
            });

            console.log("Signup successful:", response.data);
            // Optionally, redirect user or show a success message
        } catch (error: any) {
            console.error(
                "Signup failed:",
                error.response?.data || error.message,
            );
            // Optionally, show error notification
        }
    };

    const isDisabled = !name || !email || !password;

    return (
        <Card className="w-full max-w-md shadow-xl ">
            <CardHeader className="space-y-4 items-center justify-center text-center">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={220}
                    height={220}
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
                                    focus:ring-2              
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
                    className="w-full bg-primary text-white shadow-2xl py-5"
                    disabled={isDisabled}
                    onClick={createAccount}
                >
                    Create Account
                </Button>
            </CardContent>
        </Card>
    );
}
