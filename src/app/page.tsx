"use client";

import { useState, useCallback } from "react";
import { generateICS, type ReminderResult } from "@/lib/ics-generator";
import { downloadICSFile } from "@/lib/download-helper";

const DURATION_OPTIONS = [
  { value: 3, label: "3 Days" },
  { value: 7, label: "7 Days" },
  { value: 14, label: "14 Days" },
  { value: 30, label: "30 Days" },
  { value: 60, label: "60 Days" },
  { value: 90, label: "90 Days" },
];

// SVG Icon Components
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

export default function Home() {
  const [serviceName, setServiceName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState(7);
  const [result, setResult] = useState<ReminderResult | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const isFormValid = serviceName.trim() !== "" && startDate !== "";

  const handleGenerate = useCallback(() => {
    if (!isFormValid) return;

    const reminderResult = generateICS({
      serviceName: serviceName.trim(),
      trialStartDate: new Date(startDate + "T00:00:00"),
      durationDays: duration,
    });

    setResult(reminderResult);
    setShowCelebration(true);

    // Reset celebration animation
    setTimeout(() => setShowCelebration(false), 2000);
  }, [serviceName, startDate, duration, isFormValid]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    downloadICSFile(result.icsContent, result.fileName);
  }, [result]);

  const handleReset = useCallback(() => {
    setServiceName("");
    setStartDate("");
    setDuration(7);
    setResult(null);
    setShowCelebration(false);
  }, []);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="relative flex flex-col flex-1 items-center font-sans">
      {/* Animated mesh gradient background */}
      <div className="bg-mesh" />

      {/* Floating decorative orbs */}
      <div
        className="floating-orb animate-float"
        style={{
          width: 300,
          height: 300,
          top: "10%",
          left: "-5%",
          background: "rgba(139, 92, 246, 0.15)",
        }}
      />
      <div
        className="floating-orb animate-float"
        style={{
          width: 200,
          height: 200,
          top: "60%",
          right: "-3%",
          background: "rgba(6, 182, 212, 0.12)",
          animationDelay: "3s",
        }}
      />
      <div
        className="floating-orb animate-float"
        style={{
          width: 150,
          height: 150,
          bottom: "10%",
          left: "15%",
          background: "rgba(236, 72, 153, 0.1)",
          animationDelay: "1.5s",
        }}
      />

      <main className="relative z-10 flex flex-1 w-full max-w-2xl flex-col items-center px-5 py-12 sm:py-20">
        {/* ============================================
            HERO SECTION
            ============================================ */}
        <header className="text-center mb-12 sm:mb-16 animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-sm font-medium mb-6">
            <ShieldIcon className="w-4 h-4" />
            <span>Protect Your Wallet</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight">
            <span className="gradient-text">Free Trial</span>
            <br />
            <span className="text-foreground">Reminder</span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Never get charged for a subscription you forgot to cancel. Get a
            calendar alert{" "}
            <span className="text-accent-cyan font-medium">
              24 hours before
            </span>{" "}
            your trial expires.
          </p>
        </header>

        {/* ============================================
            FORM CARD
            ============================================ */}
        <section
          id="reminder-form"
          className="glass-card glass-card-hover w-full p-6 sm:p-8 animate-slide-up-delayed"
        >
          <div className="flex items-center gap-3 mb-7">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-purple/15 text-accent-purple">
              <BellIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Set Your Reminder
              </h2>
              <p className="text-sm text-slate-500">
                Fill in the details below
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Service Name Input */}
            <div>
              <label
                htmlFor="service-name"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Service Name
              </label>
              <div className="relative">
                <TagIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-[18px] h-[18px] pointer-events-none" />
                <input
                  id="service-name"
                  type="text"
                  className="input-premium"
                  placeholder="e.g., Netflix, Spotify, Adobe..."
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Trial Start Date Input */}
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Trial Start Date
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-[18px] h-[18px] pointer-events-none" />
                <input
                  id="start-date"
                  type="date"
                  className="input-premium"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>

            {/* Trial Duration Select */}
            <div>
              <label
                htmlFor="trial-duration"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Trial Duration
              </label>
              <div className="relative">
                <ClockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-[18px] h-[18px] pointer-events-none" />
                <select
                  id="trial-duration"
                  className="input-premium select-premium"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                >
                  {DURATION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              id="generate-reminder-btn"
              className="btn-primary mt-2"
              onClick={handleGenerate}
              disabled={!isFormValid}
            >
              <SparklesIcon className="w-5 h-5" />
              <span>Generate Reminder</span>
            </button>
          </div>
        </section>

        {/* ============================================
            RESULT CARD
            ============================================ */}
        {result && (
          <section
            id="result-card"
            className={`result-card w-full p-6 sm:p-8 mt-6 ${
              showCelebration ? "animate-celebration" : "animate-scale-in"
            }`}
          >
            {/* Success Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-emerald/15 text-accent-emerald">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Reminder Ready!
                </h3>
                <p className="text-sm text-slate-500">
                  Your calendar event has been generated
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Service */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <TagIcon className="w-5 h-5 text-accent-purple mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                    Service
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    {serviceName}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <ClockIcon className="w-5 h-5 text-accent-cyan mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                    Trial Length
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    {duration} Days
                  </p>
                </div>
              </div>

              {/* Expiration */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <CalendarIcon className="w-5 h-5 text-accent-pink mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                    Expires On
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    {formatDate(result.expirationDate)}
                  </p>
                </div>
              </div>

              {/* Reminder */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-accent-emerald/5 border border-accent-emerald/15">
                <BellIcon className="w-5 h-5 text-accent-emerald mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                    Reminder At
                  </p>
                  <p className="text-sm text-accent-emerald font-semibold">
                    {formatDate(result.reminderDate)} •{" "}
                    {formatTime(result.reminderDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Alert message */}
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/15 mb-6">
              <span className="text-lg shrink-0">⚠️</span>
              <p className="text-sm text-amber-200/80">
                You&apos;ll be alerted{" "}
                <span className="font-semibold text-amber-300">
                  24 hours before
                </span>{" "}
                your {serviceName} trial expires. Open the .ics file to add it
                to your calendar.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="download-ics-btn"
                className="btn-download flex-1"
                onClick={handleDownload}
              >
                <DownloadIcon className="w-5 h-5" />
                <span>Download .ics File</span>
              </button>
              <button
                id="new-reminder-btn"
                className="flex-1 px-5 py-3 rounded-xl text-sm font-semibold text-slate-300 bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all cursor-pointer"
                onClick={handleReset}
              >
                Create Another
              </button>
            </div>
          </section>
        )}

        {/* ============================================
            HOW IT WORKS SECTION
            ============================================ */}
        <section className="w-full mt-16 sm:mt-20 animate-slide-up-delayed-2">
          <h2 className="text-center text-xl font-semibold text-foreground mb-8">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                icon: <TagIcon className="w-5 h-5" />,
                title: "Enter Details",
                desc: "Name the service, pick your start date, and choose the trial length.",
                color: "text-accent-purple",
                bg: "bg-accent-purple/10",
              },
              {
                step: "02",
                icon: <SparklesIcon className="w-5 h-5" />,
                title: "Generate",
                desc: "We calculate the exact expiration and create a reminder 24 hours before.",
                color: "text-accent-cyan",
                bg: "bg-accent-cyan/10",
              },
              {
                step: "03",
                icon: <CalendarIcon className="w-5 h-5" />,
                title: "Add to Calendar",
                desc: "Download the .ics file and open it to add to Google Calendar, Outlook, or Apple Calendar.",
                color: "text-accent-emerald",
                bg: "bg-accent-emerald/10",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="glass-card glass-card-hover p-5 text-center"
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${item.bg} ${item.color} mb-3`}
                >
                  {item.icon}
                </div>
                <p
                  className={`text-xs font-bold ${item.color} uppercase tracking-widest mb-1.5`}
                >
                  Step {item.step}
                </p>
                <h3 className="text-base font-semibold text-foreground mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================
            FOOTER
            ============================================ */}
        <footer className="w-full mt-16 sm:mt-20 pb-8 text-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-6" />
          <p className="text-sm text-slate-600">
            Built with{" "}
            <span className="text-accent-purple">Next.js</span> &{" "}
            <span className="text-accent-cyan">Tailwind CSS</span> — No data
            stored. Everything runs in your browser.
          </p>
          <p className="text-xs text-slate-700 mt-2">
            © {new Date().getFullYear()} Free Trial Reminder. All rights
            reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
