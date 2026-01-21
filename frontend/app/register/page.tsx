"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setError("");

  try {
    // 1️⃣ Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // 2️⃣ Save user profile to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role: "user", // later: admin / reviewer
      createdAt: serverTimestamp(),
    });

    // 3️⃣ Redirect to login
    alert("Registration successful! Please login.");
    router.push("/login");

  } catch (err: any) {
    setError(err.message || "Registration failed");
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
            width={120}
            height={120}
            priority
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">
          Create an account
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Join OpenGuard AI moderation platform
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* REGISTER FORM */}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:opacity-90"
          >
            Register
          </button>
        </form>

        {/* FOOTER LINKS */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

        <p className="text-xs text-gray-500 text-center mt-4">
          © {new Date().getFullYear()} OpenGuard AI
        </p>
      </div>
    </main>
  );
}
