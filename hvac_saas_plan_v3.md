# HVAC SaaS Blueprint v3 (Fresh Take)

**Core Philosophy:**
* **Tier 1 ("Foundation"):** Empower solo operator / very small shop. Focus on organization, time-saving, reputation, lead capture. High core value. Includes manual workflows for key actions.
* **Tier 2 ("Crew"):** Build on Foundation. Add automation, team coordination, workflow visibility, basic reporting. Higher usage limits.
* *(Tiers control automation levels & usage limits, not necessarily access to core data modules)*.

---

**Proposed SaaS Structure & Features (Tabs/Modules):**

**1. Dashboard (Command Center)**
* **Foundation & Crew:** Customizable widgets (future), Today's Schedule snapshot, New Leads count/list, Pending Actions (Review Replies, Tasks, Maintenance Flags), Quick Add buttons, Recent Activity Feed (optional).

**2. Contacts (CRM Hub - *Primary Tab*)**
* **Foundation & Crew:** Lead/Customer list, Add/Edit Contact (multi-phone/email/address), Lead Source Tracking (auto/manual), Full Activity Timeline (Notes, Calls, Email/SMS logs, Jobs, Quotes, Invoices, Equipment), Manual Task Management w/ reminders, Custom Tagging, Equipment View per contact, File Uploads per contact, CSV Import/Export. *Maps Integration:* View address on map, one-click navigation. **Voice Note Transcription** for quick notes.
* **Crew Tier:** Assign Contact Owner, Filter by Owner.

**3. Schedule & Jobs (Workflow Engine - *Calendar/List/Map Views*)**
* **Foundation & Crew:** Job Creation (link Contact, description, line items from Catalog, schedule date/time), Job Notes (Text + Voice Transcription), Job Photos (upload), Calendar View (Day/Week/Month), Job List View (search/filter), Basic Job Statuses (customizable later), **Google/Outlook Calendar Sync** (view personal, push work jobs). *Maps Integration:* View job location, navigation link, estimate drive time.
* **Foundation Specific:** Calendar shows owner's schedule, simple status tracking.
* **Crew Tier Specific:** Assign Techs, Team Calendar View (filter by tech, see unassigned), Enhanced Job Statuses, **Dispatch Map View** (daily job pins, color-coded), **Technician Mobile View (Web)** (view schedule/details, update status, add notes/photos).

**4. Catalog (Centralized Data - *Likely under Settings*)**
* **Foundation & Crew:** Manage Service Line Items (Name, Desc, Price, Category), Manage simple Parts list (Name, Desc, Price), Manage Equipment Library (Type, Brand, Model - feeds dropdowns).

**5. Money (Quotes & Invoicing)**
* **Foundation & Crew:** Quote Builder (from Catalog/manual, PDF generation, **Email via SendGrid**, Status Tracking), Invoice Builder (from Quote/Job, PDF generation, **Email via SendGrid**), **Manual Payment Recording** & Status Tracking.
* **Crew Tier / Future:** Online Payment Links (Stripe/Square), Basic reporting, Zapier/QBO integration.

**6. Marketing & Reputation**
* **Foundation & Crew:** Google Review Feed, **AI Review Responder** (drafts), **Manual Review Request Button** (via Twilio/SendGrid templates), **AI Social Post Ideas/Drafts** (manual posting), Basic **SEO Rank Tracker** (few keywords/location).
* **Crew Tier:** **Automated Review Request Workflow** (triggered by job status, optional approval queue), More SEO keywords/competitors. *(Future: Direct Social Posting)*.

**7. Customer Equipment (Asset Management - *Core Value*)**
* **Foundation & Crew:** Add/Edit Equipment Records (linked to Customer/Address: Type, Brand, Model, Serial, Install Date, Warranty Date, Notes, Photos). View list per customer/search all. **Maintenance Flags + Manual Task Creation:** System flags upcoming service based on rules -> Creates actionable task for owner.
* **Crew Tier:** **Automated Maintenance Reminder Workflow:** Flag triggers *draft* Email/SMS via SendGrid/Twilio, queues for approval/sending.

**8. Integrations Hub (Settings Section)**
* **Foundation & Crew:** Connect Google/Outlook Calendar, Input Twilio Keys/Numbers, Input SendGrid Keys. CSV Import/Export.
* **Crew Tier:** Zapier/Make Webhook configuration. *(Future: Direct QBO/Jobber etc.)*

---
