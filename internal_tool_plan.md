# Internal LeadGen Engine Hub - SaaS Plan (Project 2 UI)

## Core Purpose
Internal tool for the team to manage scraped company prospects, track outreach & website engagement, initiate communication, and configure generated websites before clients sign up for the main SaaS (Project 3). Built with Next.js (React/TS/Tailwind/shadcn), hosted on Vercel, interacts with Supabase DB via API calls. Needs authentication for the internal team.

---

## Proposed Tabs / Modules

**1. Dashboard**
* **Goal:** At-a-glance overview of operations.
* **Features:**
    * Key Metrics Widgets (Prospects, Contacts Today, Site Views Today, New Leads).
    * Pipeline Funnel Visualization.
    * Recent Engagement Feed (Website views, Form submissions, Chat messages).
    * Task List (Due today/overdue for logged-in user).
    * Quick Add Buttons (Prospect, Log Call/Email).

**2. Prospects / Companies (Core Data Interface)**
* **Goal:** View, search, filter, manage all companies.
* **Features:**
    * Configurable Table/List View: Searchable, Filterable (State, City, Category, Pipeline Status, Website Score, Engagement Date), Sortable. Columns: Name, City, State, Category, Status, Website Score, Last Engagement.
    * *Potential Bulk Actions:* Update status, Add to outreach sequence.
    * **Detail View (On Click):**
        * Display All Company Info (Contact, Scraped Details, Colors, Logo Status).
        * **Engagement Timeline:** Detailed log of website visits (Timestamp, Duration?, Pages?), form submissions, chat interactions linked to this company. Display `engagement_count`, `last_engagement_at`.
        * **Calculated Insights:** Display *on-demand* metrics: Review count (last 3/6/12mo), Photo count (last 3/6/12mo), FB Post frequency, Website Quality Score.
        * **Outreach History:** Log manual/automated Emails/SMS/Calls. Add manual notes.
        * **Task Management:** View/Add/Complete tasks for this prospect.
        * **Pipeline Status:** View & Change status.
        * **Website Config Link/Section:** Button/area to configure their generated website (see Website Management).
        * Link to Live Preview Website.

**3. Pipeline (Visual Workflow)**
* **Goal:** Visually track prospects through stages.
* **Features:**
    * Kanban Board View: Customizable columns (Prospect, Researching, Outreach Sent, Viewed Site, Follow-up, Demo, Trial, Client, Lost). Drag & Drop cards.
    * Filter board by criteria (State, Category, User).
    * Display key info on cards (Name, City, Last Engagement).

**4. Outreach (Communication Center)**
* **Goal:** Initiate and track outbound communication.
* **Features:**
    * **Email (SendGrid):** Template management (with variables), select list -> send bulk/single emails, basic open/click tracking (via webhooks), unsubscribe handling.
    * **SMS (Twilio):** Template management, select list -> send bulk/single SMS (compliance crucial: opt-out), potential reply inbox (via webhooks).
    * **Calling (Twilio/Manual):** Click-to-Call, Manual Call Log (Outcome, Notes). *(Advanced: AI Cold Calling integration API setup)*.

**5. Website Management (Control Center for Generated Sites)**
* **Goal:** Configure appearance and trigger builds. (Could be part of Prospect Detail View or separate tab).
* **Features:**
    * List generated sites/status.
    * **Website Editor Lite UI:**
        * Select Template (e.g., 'TemplateHVAC1').
        * Override Primary/Secondary Colors.
        * Select/Manage Logo (`logo_override`).
        * Select Featured Photos (using tags from `photos` table for Hero, About, OG Image).
        * Edit core text snippets (Headline, About paragraph).
        * *Saves these settings back to the `companies` record in Supabase.*
    * **Build Trigger:** Button to "Build/Update Website" (queues build job).

**6. Analytics**
* **Goal:** Understand performance.
* **Features:** Pipeline Conversion Rates, Website Engagement Funnel analysis, Outreach effectiveness metrics. Filter by date/category/state.

**7. Settings**
* **Goal:** Manage the tool itself.
* **Features:** Team User Management (Invite, Roles - Admin/Sales), API Key Integrations (Twilio, SendGrid, Maps, OpenAI, Cloud Vision), Manage Pipeline Stages, Manage Custom Tags.

---
