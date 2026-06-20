# Free Trial Reminder 🛡️

> Never get charged for a subscription you forgot to cancel.

A beautiful, lightweight web app that generates calendar reminders for your free trial subscriptions. Get alerted **24 hours before** your trial expires so you can cancel in time.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)

## ✨ Features

- **Smart Date Calculation** — Automatically calculates trial expiration and sets a reminder 24 hours before
- **Standard .ics Files** — Download RFC 5545-compliant calendar files compatible with Google Calendar, Outlook, and Apple Calendar
- **Zero Dependencies** — No bloated libraries. Calendar generation uses pure TypeScript
- **Privacy First** — Everything runs client-side in your browser. No data is stored or sent to any server
- **Premium UI** — Dark theme with glassmorphism, animated gradients, and micro-animations

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/free-trial-reminder.git
cd free-trial-reminder

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| .ics Generation | Vanilla TypeScript (no libraries) |
| Hosting | Vercel |

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css     # Design system (dark theme, glassmorphism, animations)
│   ├── layout.tsx      # Root layout with SEO metadata
│   └── page.tsx        # Main page (form + result card)
└── lib/
    ├── ics-generator.ts    # .ics calendar file generation
    └── download-helper.ts  # Browser-native file download
```

## 🔧 How It Works

1. **User fills the form**: Service name, trial start date, trial duration
2. **Date calculation**: `expirationDate = startDate + duration`, `reminderDate = expirationDate - 24hrs`
3. **ICS generation**: Formats data into standard iCalendar text (VCALENDAR/VEVENT blocks)
4. **Download**: `URL.createObjectURL(new Blob([icsContent]))` creates a downloadable `.ics` file

## 🌐 Deployment

This project is designed to deploy on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect the repository to Vercel
3. Vercel auto-deploys on every push

```bash
# Build for production
npm run build

# Start production server (local testing)
npm start
```

## 📄 License

MIT License — use freely for any project.
