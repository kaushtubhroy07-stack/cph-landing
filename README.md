# The Complete Player Hub (CPH) — Standalone Web App & Concierge

> **Production Domain**: `thecompleteplayerhub.com`  
> **Launch Window**: Fall 2026  
> **Founders**: Sol & Heather Salinas  

This repository contains the standalone, production-ready web application for **The Complete Player Hub (CPH)**. It includes the responsive marketing landing page, high-definition media backgrounds, interactive contact form, and the autonomous **CPH Digital Concierge** with local-first persistence and direct Supabase ingestion.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
# Vite runs at http://localhost:5175/
```

Or run via any zero-config static file server:
```bash
npx serve .
# or: python3 -m http.server 8080
```

---

## 🗄️ Database Setup (Dedicated Supabase Tables)

To isolate CPH user data from any parent CRM, CPH uses two dedicated tables: `cph_waitlist` and `cph_inquiries`.

### Step 1: Run the Database Migration
1. Go to your **Supabase Dashboard** (create a new project for CPH or use an existing organization).
2. Open the **SQL Editor** from the left navigation menu.
3. Open [`cph_supabase_schema.sql`](./cph_supabase_schema.sql) and paste the entire script into the editor.
4. Click **Run**.

This script sets up:
- `public.cph_waitlist`: Stores launch waitlist leads (`role`, `name`, `email`, `phone`, `location`, `diagnostic_meta`, `crm_source`, `status`).
- `public.cph_inquiries`: Stores direct contact form messages and Concierge-escalated inquiries (`role`, `name`, `email`, `phone`, `message`, `source`, `status`).
- **Row-Level Security (RLS)**: Permissive anonymous `INSERT` policies allowing web visitors to submit forms without logging in, with strict authenticated/service-role access for admin reads/updates.
- **Auto-updating Timestamps**: Automatic `updated_at` trigger.
- **Indexes**: Fast query indexing on `created_at`, `email`, `role`, and `status`.

---

## 🔌 Connecting Frontend to Supabase

Once the Supabase project is created:
1. Copy your **Project URL** (e.g. `https://xyzcompany.supabase.co`) and **Public Anon Key** (`anon` key, found in *Project Settings → API*).
2. Open `index.html` and update the configuration block in the `<head>`:

```html
<script>
  window.CPH_CONFIG = {
    supabaseUrl: "https://your-cph-project.supabase.co",
    supabaseAnonKey: "your-supabase-anon-key"
  };
</script>
```

> **Zero Downtime / Offline Fallback**: If Supabase credentials are missing or network connectivity drops, both the waitlist intake and contact form continue saving submissions into the browser's `localStorage` (`cph_waitlist_leads` and `cph_contact_inquiries`) without showing any errors to the user.

---

## ☁️ Production Deployment

### Option A: Vercel (Recommended)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial CPH standalone release"
   git remote add origin https://github.com/<org>/the-complete-player-hub.git
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Other / Static**.
4. Root Directory: `./`.
5. Pre-configured headers and cache policies are already in [`vercel.json`](./vercel.json).
6. Connect your custom domain: `thecompleteplayerhub.com`.

### Option B: Netlify
1. Connect this repository in [Netlify](https://netlify.com).
2. Build command: Leave blank or `npm run build`.
3. Publish directory: `./`.
4. Pre-configured caching and security headers are already in [`netlify.toml`](./netlify.toml).

---

## 📊 Accessing & Exporting Leads

### 1. Directly in Supabase
View and filter leads directly in the **Supabase Table Editor**:
- `cph_waitlist`
- `cph_inquiries`

### 2. Client-Side Browser Utilities
Open DevTools (`F12` or `Cmd+Option+I`) in any browser viewing the site to interact with the runtime helper `window.CPHConcierge`:

```javascript
// View stored leads
CPHConcierge.getLeads();

// Download a CSV of all waitlist leads
CPHConcierge.exportLeadsCSV();

// Download a CSV of all contact inquiries
CPHConcierge.exportInquiriesCSV();

// Download unhandled user questions
CPHConcierge.exportEscalatedQuestionsCSV();

// Backfill all locally stored leads into Supabase
await CPHConcierge.syncAllToSupabase();
```

---

## 📁 Repository Structure

```
├── index.html                 # Main CPH responsive landing page & contact form
├── cph_supabase_schema.sql    # DDL & RLS security rules for Supabase
├── background-hover.mp4       # Background interactive video
├── package.json               # Node dev server configuration
├── vercel.json                # Vercel static routing & headers
├── netlify.toml               # Netlify static routing & headers
├── chatbot/
│   └── cph_bot_widget.js      # CPH Digital Concierge (Sol Salinas persona & logic)
├── design/
│   ├── cph_logo.svg           # Vector branding
│   ├── cph_logo_final.png     # Rendered logo
│   ├── owners.jpeg            # Sol & Heather Salinas photo
│   └── *.mp4                  # Full-fidelity media assets
└── README.md                  # This deployment & ops guide
```

---

## 🛡️ Support & Inquiries
- **Founders**: Sol Salinas (`sol@thecompleteplayerhub.com`) & Heather Salinas
- **Architecture**: M3SH Intelligence
