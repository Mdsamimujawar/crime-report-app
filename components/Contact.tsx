"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
     try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (!res.ok) {
      const msg =
        result?.errors?.[0]?.message ||
        result?.error ||
        "Failed to send message";
      throw new Error(msg);
    }

    // Simulate API (replace with your real API route)
  
       setSuccess("✅ Message sent successfully! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  } catch (err: any) {
    setSuccess(`❌ ${err.message || "Something went wrong."}`);
  } finally {
    setLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-neutral-950 to-black text-white py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)]" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-sky-500 to-blue-600 bg-clip-text text-transparent"
        >
          Contact Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg text-neutral-400 leading-relaxed"
        >
          Have questions or need support? Reach out and we’ll be in touch.
        </motion.p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-neutral-400 text-sm">Email</p>
              <p className="text-white font-medium">support@crimeapp.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center">
              <Phone className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-neutral-400 text-sm">Phone</p>
              <p className="text-white font-medium">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-neutral-400 text-sm">Address</p>
              <p className="text-white font-medium">
                Mumbai, Maharashtra, India
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-neutral-900/60 border border-neutral-800 rounded-2xl shadow-xl p-8 space-y-6"
        >
          <div>
            <label className="block text-sm text-neutral-300 mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-2">Message</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              placeholder="Write your message..."
            />
          </div>

          {success && (
            <div className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
