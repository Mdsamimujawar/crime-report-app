"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, Video, LinkIcon } from "lucide-react";

const resources = [
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description:
      "Browse detailed articles and guides to learn about crime prevention, emergency response, and safety protocols.",
    link: "#",
  },
  {
    icon: FileText,
    title: "Legal Resources",
    description:
      "Access important documents, laws, and regulations related to crime reporting and victim rights.",
    link: "#",
  },
  {
    icon: Video,
    title: "Tutorials & Training",
    description:
      "Watch step-by-step tutorials on how to use the platform and learn best practices for reporting incidents.",
    link: "#",
  },
  {
    icon: LinkIcon,
    title: "External Links",
    description:
      "Find curated links to trusted government, NGO, and law enforcement resources for additional help.",
    link: "#",
  },
];

export default function Resources() {
  return (
    <section className="relative bg-gradient-to-b from-black via-neutral-950 to-black text-white py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_70%)]" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-sky-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg"
        >
          Resources
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-5 text-lg text-neutral-400 leading-relaxed"
        >
          Access helpful guides, tutorials, and official information to stay
          informed and empowered.
        </motion.p>
      </div>

      {/* Resource Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {resources.map((resource, index) => (
          <motion.a
            key={resource.title}
            href={resource.link}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.25,
              duration: 0.7,
              ease: "easeOut",
            }}
            className="group relative bg-neutral-900/70 border border-neutral-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:border-blue-500/50 hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-sky-500/10 border border-blue-500/30 mb-6 group-hover:scale-110 transition-transform duration-300">
              <resource.icon className="w-8 h-8 text-blue-400" />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-semibold mb-3 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
              {resource.title}
            </h3>

            {/* Description */}
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              {resource.description}
            </p>

            <span className="text-blue-400 text-sm font-medium group-hover:underline">
              Learn More →
            </span>

            {/* Decorative Glow */}
            <div className="absolute inset-0 rounded-2xl bg-blue-500/10 opacity-0 group-hover:opacity-10 blur-xl transition duration-500" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
