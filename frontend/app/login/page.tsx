"use client";

export const dynamic = "force-dynamic";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
        );

        const user = userCredential.user;
        const token = await user.getIdToken();

        document.cookie = `token=${token}; path=/`;

        router.push("/");
    } catch (err) {
        alert("Invalid email or password");
    }
    };

  

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo/logos.png"
            alt="OpenGuard AI Logo"
            width={200}
            height={200}
            priority
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">
          OpenGuard AI
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Sign in to moderation dashboard
        </p>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:opacity-90"
            >
            Login
        </button>

        <Link
            href="/register"
            className="w-full block text-center border border-black text-black py-2 rounded hover:bg-gray-100"
            >
            Register
        </Link>

        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} OpenGuard AI
        </p>
      </div>
    </main>
  );
}
