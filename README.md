# 🌐 Interglott - AI-Powered Multilingual Language Learning Platform

**Interglott** is a comprehensive, feature-rich interactive language learning platform. It empowers users to learn languages including French, Spanish, Chinese, German, and Arabic through AI-driven interactive lessons, dynamic reading comprehension exercises, immersive stories, and real-time voice conversations.

---

## 🚀 Key Features

*   **🎓 Guided Multilingual Lessons**: Structured curriculum mapped across *Beginner*, *Intermediate*, and *Advanced* levels, loaded with multiple-choice, translation, and fill-in-the-gap exercises.
*   **🎙️ Realtime AI Voice Tutor**: Seamless voice-to-voice chat sessions powered by **OpenAI Realtime Voice API** and **Gemini Live** via Supabase Edge Functions. It simulates different teaching personas (Supportive Tutor, Cheerful Coach, Calm Guide, Formal Examiner) and adapts output voices to match gender and tone.
*   **📚 Immersive Stories**: Interactive short stories written in the target language with real-time audio playback, highlightable transcript tracking, and in-context translations.
*   **📋 TCF & TEF Exam Preparation**: Production-grade reading practice exams modeled after official French proficiency tests (*Test de connaissance du français* & *Test d'évaluation de français*), featuring real-world passage questions and detailed evaluation scoring.
*   **🎮 Advanced Gamification**: 
    *   **XP & Level Systems**: Earn experience points (XP) from learning tasks, view progression milestones, and convert XP into learning tokens.
    *   **Streaks & Daily Challenges**: Engage users daily with login bonuses, streak badges, and special tasks.
    *   **Achievements & Badges**: Unlock badges for specific learning thresholds.
*   **💳 Dynamic Credits System**: Dual-tier monetization mechanism (Free, Basic Premium, Pro) with configurable credit costs per action, featuring a clean local state synchronization and countdown reset system.
*   **🔗 Public Sharing**: Generate unique shareable progress tokens and host public profiles (`/u/:shareToken`) showing language scores, levels, streaks, and unlocked achievements.

---

## 🛠️ Technology Stack

*   **Frontend**: React (v18), Vite, TypeScript, Tailwind CSS, shadcn/ui components, Lucide icons, and Framer Motion.
*   **State & Query Management**: React Context, TanStack React Query (v5), and Custom React Hooks.
*   **Backend & Serverless**: Supabase (Database, Auth, and Edge Functions written in Deno/TypeScript).
*   **Testing**: Vitest and React Testing Library.
*   **Deployment**: Pre-configured Vercel configuration (`vercel.json`) and Lovable Integration.

---

## 📂 Project Architecture

```filepath
interglott/
├── src/
│   ├── components/            # UI components (Buttons, Badges, Layout, Modals)
│   │   ├── ui/                # Core shadcn/ui visual tokens
│   │   └── voice/             # Realtime voice UI (MicButton, VoiceWaveform, Settings)
│   ├── contexts/              # Global state providers (CreditsContext, UserProgressContext)
│   ├── data/                  # Multilingual lesson files, stories, achievements, and TCF/TEF data
│   ├── hooks/                 # Reusable utility hooks
│   ├── integrations/          # Supabase client initializer and database types
│   ├── pages/                 # Routing pages (Lessons, Dashboard, Live Voice, TCF/TEF tests, Stories)
│   ├── test/                  # Test suites and harness configurations
│   ├── App.tsx                # App entrypoint and React Router configurations
│   └── index.css              # Custom Tailwind styling & HSL theme configuration
├── supabase/                  # Serverless configs & Edge Functions
│   ├── functions/
│   │   ├── translate-transcript/   # Serverless API translation services
│   │   └── voice-session/          # Real-time secure API session handshake generator
│   └── migrations/                 # Schema updates
├── package.json               # Package dependencies & scripts
├── vite.config.ts             # Bundler configs
└── README.md                  # Project documentation (You are here)
```

---

## ⚙️ Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and [npm](https://www.npmjs.com/) (or [Bun](https://bun.sh/)) installed.

### 2. Installation
Clone the repository and install the dependencies:
```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd interglott

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and supply your Supabase and API credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Running the Development Server
Launch the local dev environment with hot reloading:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

---

## 🛰️ Supabase Edge Functions & Voice Setup

To power the real-time AI Voice feature, configure the Supabase CLI and set the API secrets on your Supabase dashboard or CLI environment:

```bash
# Set OpenAI API key for real-time speech
supabase secrets set OPENAI_API_KEY=your-openai-api-key

# Set Gemini API key for Gemini Live features
supabase secrets set GEMINI_API_KEY=your-gemini-api-key
```

The app handles CORS headers dynamically to establish a secure client-to-model socket handshake via the `voice-session` edge function.

---

## 🧪 Running Tests

Unit tests are written with **Vitest** to ensure core features, hooks, and voice components perform correctly. Run the test suite using:
```bash
# Single execution run
npm run test

# Active file watcher mode
npm run test:watch
```
