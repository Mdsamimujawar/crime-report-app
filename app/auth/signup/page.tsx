"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      router.push("/auth/signin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-sky-600 bg-clip-text text-transparent"
          >
            Create Account
          </motion.h1>
          <p className="text-neutral-400 mt-2">
            Start your journey with{" "}
            <span className="text-blue-500 font-medium">SafeReport</span>
          </p>
        </div>

        <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="peer w-full rounded-lg bg-black/40 border border-neutral-800 px-3 pt-5 pb-2 text-neutral-100 placeholder-transparent focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none"
                placeholder="Full Name"
              />
              <label
                htmlFor="name"
                className="absolute left-3 top-2.5 text-sm text-neutral-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Full Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="peer w-full rounded-lg bg-black/40 border border-neutral-800 px-3 pt-5 pb-2 text-neutral-100 placeholder-transparent focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2.5 text-sm text-neutral-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Email Address
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="peer w-full rounded-lg bg-black/40 border border-neutral-800 px-3 pt-5 pb-2 text-neutral-100 placeholder-transparent focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2.5 text-sm text-neutral-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="peer w-full rounded-lg bg-black/40 border border-neutral-800 px-3 pt-5 pb-2 text-neutral-100 placeholder-transparent focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none"
                placeholder="Confirm Password"
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-3 top-2.5 text-sm text-neutral-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Confirm Password
              </label>
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-300"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm bg-red-500/10 border border-red-500/30 rounded-lg p-3"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-sky-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign up"
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-neutral-400">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
