"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Report, ReportStatus, ReportType } from "@prisma/client";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<ReportType | "ALL">("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reports");
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateReportStatus = async (
    reportId: string,
    newStatus: ReportStatus
  ) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) fetchReports();
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

      const filteredReports = Array.isArray(reports)
      ? reports.filter((report) => {
      const statusMatch = filter === "ALL" || report.status === filter;
      const typeMatch = typeFilter === "ALL" || report.type === typeFilter;
      return statusMatch && typeMatch;

  })
      : [];

  const getStatusColor = (status: ReportStatus) => {
    const colors = {
      PENDING: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
      IN_PROGRESS: "bg-sky-500/10 text-sky-400 border border-sky-500/30",
      RESOLVED: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
      DISMISSED: "bg-neutral-500/10 text-neutral-400 border border-neutral-500/30",
    };
    return colors[status];
  };

  // Simple stats
  const safeReports = Array.isArray(reports) ? reports : [];

  const stats = [
    {
      label: "Pending",
      value: safeReports.filter((r) => r.status === "PENDING").length,
    },
    {
      label: "In Progress",
      value: safeReports.filter((r) => r.status === "IN_PROGRESS").length,
    },
    {
      label: "Resolved",
      value: safeReports.filter((r) => r.status === "RESOLVED").length,
    },
  ];


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="rounded-full h-12 w-12 border-b-2 border-sky-500"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">
              {session?.user?.name || "Admin"}
            </span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-900 rounded-lg hover:bg-neutral-800 border border-neutral-800 transition-all hover:border-neutral-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-neutral-900/60 p-6 text-center border border-white/10 backdrop-blur-sm hover:border-sky-500/30 transition-all"
            >
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-neutral-400">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as ReportStatus | "ALL")
              }
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500/20"
            >
              <option value="ALL">All Statuses</option>
              {Object.values(ReportStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as ReportType | "ALL")
              }
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500/20"
            >
              <option value="ALL">All Types</option>
              {Object.values(ReportType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="text-neutral-400">
            {filteredReports.length} Reports
          </div>
        </div>

        {/* Reports */}
        <div className="grid gap-6">
          <AnimatePresence>
            {filteredReports.map((report) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-neutral-900/60 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-sky-500/30 transition-all"
              >
                <div className="flex justify-between items-start gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold text-neutral-100">
                        {report.title}
                      </h2>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </div>

                    <p className="text-neutral-400 text-sm">
                      {report.description}
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
                      <span>{report.type}</span>
                      <span>{report.location || "N/A"}</span>
                      <span>
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {report.image && (
                      <img
                        src={report.image}
                        alt="Report"
                        className="mt-4 rounded-lg border border-neutral-800"
                      />
                    )}
                  </div>

                  <select
                    value={report.status}
                    onChange={(e) =>
                      updateReportStatus(
                        report.id,
                        e.target.value as ReportStatus
                      )
                    }
                    className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500/20"
                  >
                    {Object.values(ReportStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredReports.length === 0 && (
            <div className="text-center py-16 text-neutral-500 bg-neutral-900/50 rounded-xl border border-white/10">
              No reports found matching the selected filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}