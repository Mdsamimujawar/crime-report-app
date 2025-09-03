"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Upload, Brain, BarChart } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Report an Incident",
    description:
      "Quickly report crimes, emergencies, or suspicious activity with detailed information and optional images.",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Our AI analyzes uploaded images to detect emergencies and provide structured details instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Secured",
    description:
      "Data is securely stored and reviewed by authorized personnel. Sensitive details are encrypted.",
  },
  {
    icon: BarChart,
    title: "Real-Time Dashboard",
    description:
      "Authorities access live dashboards with visual insights, enabling faster response and better decision-making.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-gradient-to-b from-black via-neutral-950 to-black text-white py-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_70%)]" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-sky-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-5 text-lg text-neutral-400 leading-relaxed"
        >
          From reporting an incident to real-time monitoring, here’s how our
          system empowers safer communities with advanced technology.
        </motion.p>
      </div>

      {/* Steps */}
      <div className="relative max-w-6xl mx-auto">
        {/* Connecting Line for desktop */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/30 via-blue-400/20 to-transparent" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.25, duration: 0.7, ease: "easeOut" }}
              className="group relative bg-neutral-900/70 border border-neutral-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:border-blue-500/50 hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-sky-500/10 border border-blue-500/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-blue-400" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold mb-3 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-400 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Decorative Glow */}
              <div className="absolute inset-0 rounded-2xl bg-blue-500/10 opacity-0 group-hover:opacity-10 blur-xl transition duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
