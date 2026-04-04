# Patra API Documentation

> **One-stop reference** for developers integrating with Patra. All schema, code, prompts, and AI IDE context are embedded here — no need to open another file.

---

## Table of Contents

1. [Base URL & Auth](#1-base-url--auth)
2. [Public Endpoints](#2-public-endpoints)
3. [Corporate API — Staff Management (v1)](#3-corporate-api--staff-management-v1)
   - [Staff Input Schema](#31-staff-input-schema-variables)
   - [API Response Schema](#32-api-response-schema)
   - [Create Staff — Code Examples](#33-create-staff--code-examples)
   - [Update Staff](#34-update-staff-patch)
   - [Webhooks](#35-webhooks--real-time-sync)
   - [TypeScript Types](#36-typescript-types)
   - [Error Reference](#37-error-reference)
4. [Embedding Cards](#4-embedding-cards)
5. [Rate Limits](#5-rate-limits)
6. [🤖 Vibe Coder Prompt — Full](#6--vibe-coder-prompt--full-copy-this-into-your-ai-ide)
7. [⚡ Vibe Coder Prompt — Quick Start](#7--vibe-coder-prompt--quick-start)
8. [🧠 AI IDE Skill (patra-skill)](#8--ai-ide-skill--paste-this-as-a-custom-rule-in-cursor--windsurf)
9. [Support](#9-support)

---

## 1. Base URL & Auth

### Public API Base URL
```
https://vaw-patra.vercel.app/v1
```

### Corporate API Base URL (v1)
```
https://<PROJECT_REF>.supabase.co/functions/v1/api-v1
```
Store this in your environment as `PATRA_API_URL`.

### Authentication

| API Type | Header | Value |
| :--- | :--- | :--- |
| Public (read-only cards) | `Authorization` | `Bearer YOUR_ANON_KEY` |
| Corporate (write/manage staff) | `x-api-key` | `pk_live_YOUR_PRIVATE_KEY` |

> ⚠️ **Never expose `pk_live_` keys in client-side code.** Always proxy through a backend route (Next.js API Route / Express / Hono).

### Environment Variables (add to `.env.local`)
```bash
PATRA_API_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxx
PATRA_API_URL=https://xxxxxxxx.supabase.co/functions/v1/api-v1
PATRA_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxx

# Safe to expose in client (Vite)
VITE_PATRA_CARD_BASE_URL=https://vaw-patra.vercel.app
```

---

## 2. Public Endpoints

### GET `/cards/:username` — Fetch a card
```bash
curl https://vaw-patra.vercel.app/v1/cards/johndoe \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Response:**
```json
{
  "id": "card_123456789",
  "username": "johndoe",
  "displayName": "John Doe",
  "jobTitle": "Senior Software Engineer",
  "company": "Tech Corp",
  "bio": "Building the future of digital identity.",
  "avatarUrl": "https://vaw-patra.vercel.app/storage/avatars/johndoe.jpg",
  "theme": "modern-dark",
  "socialLinks": [
    { "platform": "linkedin", "url": "https://linkedin.com/in/johndoe" }
  ]
}
```

### GET `/cards/search?q=engineer&limit=10` — Search cards
```bash
curl "https://vaw-patra.vercel.app/v1/cards/search?q=engineer&limit=10" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## 3. Corporate API — Staff Management (v1)

### How it works
```
Your App  →  POST staff data  →  Patra API  →  Returns card_url
                                     ↓
                          Generates digital ID card
                                     ↓
                     "https://vaw-patra.vercel.app/company-slug/ABC123"
```

Distribute the `card_url` to the employee. Any `PATCH` update to the record reflects on the live card instantly.

---

### 3.1 Staff Input Schema (Variables)

#### ✅ Required Fields — must be present or API returns `400`

| JSON Key | Type | Example | Notes |
| :--- | :--- | :--- | :--- |
| `display_name` | `string` | `"John Doe"` | Appears on the card as the employee's name |
| `email` | `string` | `"john@acme.com"` | Used for identification, must be valid format |
| `job_title` | `string` | `"Senior Engineer"` | Official designation shown on the card |

#### 🔵 Optional Fields — enrich the card

| JSON Key | Type | Example | Notes |
| :--- | :--- | :--- | :--- |
| `phone` | `string` | `"+91 98765 43210"` | Include country code |
| `avatar_url` | `string` (URL) | `"https://cdn.../photo.jpg"` | JPG/PNG/WEBP, min 300×300px |
| `bio` | `string` | `"Full-stack engineer..."` | Max 160 characters |
| `department` | `string` | `"Engineering"` | Internal department name |
| `location` | `string` | `"Bangalore, India"` | Office or city |
| `design` | `string` | `"tmpl_abc123"` | Override default card template |
| `metadata` | `object` | `{ "emp_id": "EMP-456" }` | Store any custom key-value pairs |

#### Full request body example
```json
{
  "display_name": "John Doe",
  "email": "john@acme.com",
  "job_title": "Senior Engineer",
  "phone": "+91 98765 43210",
  "avatar_url": "https://cdn.example.com/john.jpg",
  "bio": "Full-stack engineer with 8 years of experience.",
  "department": "Engineering",
  "location": "Bangalore, India",
  "metadata": {
    "internal_employee_id": "EMP-456",
    "region": "IN-SOUTH"
  }
}
```

---

### 3.2 API Response Schema

#### Success `201 Created`
```json
{
  "message": "Staff created successfully",
  "card_url": "https://vaw-patra.vercel.app/acme-corp/ABC123",
  "data": {
    "id": "a1b2c3d4-e5f6-...",
    "staff_id": "ABC123",
    "status": "joined",
    "is_approved": true
  }
}
```

| Key | Type | Description |
| :--- | :--- | :--- |
| `card_url` | `string` | **The live digital ID card URL** — share this with the employee |
| `data.id` | `UUID` | Use this as `:id` in PATCH calls |
| `data.staff_id` | `string` | Short human-readable ID, appears in the card URL |
| `data.status` | `string` | `"joined"` \| `"invited"` \| `"rejected"` |
| `data.is_approved` | `boolean` | Card is publicly visible only when `true` |

---

### 3.3 Create Staff — Code Examples

#### Backend Proxy (Next.js App Router) — `app/api/patra/staff/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${process.env.PATRA_API_URL}/staff`, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.PATRA_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
```

#### Backend Proxy (Next.js Pages Router) — `pages/api/patra/staff.ts`
```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const upstream = await fetch(`${process.env.PATRA_API_URL}/staff`, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.PATRA_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  const data = await upstream.json();
  res.status(upstream.status).json(data);
}
```

#### Service Function — `lib/patra.ts`
```typescript
export async function createPatraStaff(input: PatraStaffInput): Promise<PatraStaffResponse> {
  const res = await fetch('/api/patra/staff', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || `Patra API error: ${res.status}`);
  }

  return res.json();
}
```

#### React Form Component — `components/AddStaffForm.tsx`
```tsx
import { useState } from 'react';
import { createPatraStaff } from '@/lib/patra';

export function AddStaffForm() {
  const [form, setForm] = useState({
    display_name: '',
    email: '',
    job_title: '',
    phone: '',
    avatar_url: '',
    bio: '',
    department: '',
  });
  const [result, setResult] = useState<{ card_url: string; staff_id: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.display_name || !form.email || !form.job_title) {
      setError('Full Name, Email, and Job Title are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await createPatraStaff(form);
      setResult({ card_url: res.card_url, staff_id: res.data.staff_id });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Required */}
      <input required placeholder="Full Name *"       value={form.display_name} onChange={set('display_name')} />
      <input required type="email" placeholder="Work Email *"  value={form.email}        onChange={set('email')} />
      <input required placeholder="Job Title *"       value={form.job_title}    onChange={set('job_title')} />
      {/* Optional */}
      <input placeholder="Phone (with country code)"  value={form.phone}        onChange={set('phone')} />
      <input placeholder="Avatar URL (direct link)"   value={form.avatar_url}   onChange={set('avatar_url')} />
      <input placeholder="Department"                 value={form.department}   onChange={set('department')} />
      <textarea placeholder="Bio (max 160 chars)"     value={form.bio}          onChange={set('bio')} maxLength={160} />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating card...' : 'Create Digital ID Card'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div className="success-box">
          <p>✅ Card created! Staff ID: <strong>{result.staff_id}</strong></p>
          <a href={result.card_url} target="_blank" rel="noreferrer">View Card →</a>
          <button type="button" onClick={() => navigator.clipboard.writeText(result.card_url)}>
            Copy Card Link
          </button>
        </div>
      )}
    </form>
  );
}
```

---

### 3.4 Update Staff (PATCH)

**Endpoint:** `PATCH {PATRA_API_URL}/staff/:id`

Use the `id` UUID returned from the creation response.

```typescript
export async function updatePatraStaff(
  id: string,
  updates: Partial<PatraStaffInput>
): Promise<PatraStaffResponse> {
  const res = await fetch(`/api/patra/staff/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || `Patra API error: ${res.status}`);
  }

  return res.json();
}
```

Changes are reflected on the live card **immediately** — no republishing needed.

---

### 3.5 Webhooks — Real-Time Sync

Configure your webhook endpoint URL in the Patra Company Dashboard under **Settings → API & Integrations**.

#### Events

| Event | When Triggered |
| :--- | :--- |
| `staff.added` | A new staff card is created |
| `staff.updated` | A staff profile is updated |
| `card.viewed` | Someone views a staff card (optional) |

#### Webhook Payload Shape
```json
{
  "event": "staff.added",
  "timestamp": 1712229600,
  "payload": {
    "id": "a1b2c3d4-...",
    "staff_id": "ABC123",
    "card_url": "https://vaw-patra.vercel.app/acme-corp/ABC123",
    "data_submitted": {
      "display_name": "John Doe",
      "email": "john@acme.com",
      "job_title": "Senior Engineer"
    }
  }
}
```

#### Webhook Receiver — `app/api/webhooks/patra/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('x-patra-signature') ?? '';
  const body = await req.json();

  // Verify: signature = btoa(`${timestamp}.${JSON.stringify(payload)}.${secret}`)
  const expected = btoa(
    `${body.timestamp}.${JSON.stringify(body.payload)}.${process.env.PATRA_WEBHOOK_SECRET}`
  );

  if (sig !== expected) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  if (body.event === 'staff.added') {
    // Save card_url to your database, notify the employee, etc.
    console.log('New card:', body.payload.card_url);
  }

  if (body.event === 'staff.updated') {
    // Sync changes to your local employee record
    console.log('Updated staff:', body.payload.id);
  }

  return NextResponse.json({ received: true });
}
```

---

### 3.6 TypeScript Types

```typescript
// types/patra.ts — copy this into your project

export interface PatraStaffInput {
  display_name: string;            // Required
  email: string;                   // Required
  job_title: string;               // Required
  phone?: string;
  avatar_url?: string;
  bio?: string;
  department?: string;
  location?: string;
  design?: string;                 // Override default card template ID
  metadata?: Record<string, unknown>;
}

export interface PatraStaffResponse {
  message: string;
  card_url: string;                // Live URL — share this with the employee
  data: {
    id: string;                    // UUID — use for PATCH calls
    staff_id: string;              // Short ID e.g. "ABC123" — in the card URL
    status: 'joined' | 'invited' | 'rejected';
    is_approved: boolean;
  };
}

export interface PatraWebhookPayload {
  event: 'staff.added' | 'staff.updated' | 'card.viewed';
  timestamp: number;               // Unix epoch seconds
  payload: PatraStaffResponse['data'] & {
    card_url: string;
    data_submitted: PatraStaffInput;
  };
}
```

---

### 3.7 Error Reference

| Status | Meaning | Fix |
| :--- | :--- | :--- |
| `400` | Missing required fields | Include `display_name`, `email`, and `job_title` |
| `401` | Invalid/missing API key | Check `x-api-key` header & `.env` file |
| `404` | Staff record not found | Verify the `id` UUID in PATCH calls |
| `405` | Wrong HTTP method | `POST` = create, `PATCH` = update |
| `500` | Server error | Retry after a short wait |

**Error response shape:**
```json
{ "error": "Missing required field: email" }
```

---

## 4. Embedding Cards

### Option 1 — Script Tag
```html
<div class="patra-card-embed" data-username="johndoe" data-theme="light"></div>
<script src="https://vaw-patra.vercel.app/embed.js" async></script>
```

### Option 2 — iFrame
```html
<iframe
  src="https://vaw-patra.vercel.app/embed/johndoe"
  width="400" height="600" frameborder="0"
  style="border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);"
></iframe>
```

### Option 3 — Web Component (SDK)
```html
<script type="module" src="https://vaw-patra.vercel.app/patra-sdk.js"></script>
<patra-card username="johndoe" width="400" height="250"></patra-card>
```

---

## 5. Rate Limits

| Plan | Requests / hour |
| :--- | :--- |
| Standard | 1,000 |
| Pro | 10,000 |
| Enterprise | Custom |

Rate limit headers returned on every response:
- `X-RateLimit-Limit` — your ceiling
- `X-RateLimit-Remaining` — requests left this window
- `X-RateLimit-Reset` — Unix timestamp when limit resets

---

## 6. 🤖 Vibe Coder Prompt — Full

> Copy everything inside the code block below and paste it directly into **Cursor**, **Windsurf**, **Bolt**, **Lovable**, **v0**, or any AI chat. Replace `[BRACKETED]` values with your stack before pasting.

````
I need to integrate the Patra Corporate Digital ID Card API into my [REACT / NEXT.JS / VITE REACT] app.

## What Patra Does
Patra is a digital identity platform. I POST employee data → Patra creates a live digital ID card → returns a card_url I share with the employee.

## My Stack
- Frontend: [React 18 / Next.js 14 / Vite + React]
- HTTP: fetch / axios
- Forms: [React Hook Form / plain controlled inputs]
- Backend proxy: [Next.js API Routes / Express / Hono]

---

## Task 1: Environment Setup
Add to `.env.local`:
```
PATRA_API_KEY=pk_live_REPLACE_ME
PATRA_API_URL=https://PROJECT_REF.supabase.co/functions/v1/api-v1
PATRA_WEBHOOK_SECRET=whsec_REPLACE_ME
```
Never expose PATRA_API_KEY in client code.

---

## Task 2: Backend Proxy Route
Create a server-side proxy so the API key is hidden.

For Next.js App Router: `app/api/patra/staff/route.ts`
For Pages Router: `pages/api/patra/staff.ts`
For Express: POST /api/patra/staff

Proxy must:
1. Accept POST from frontend
2. Forward to `${PATRA_API_URL}/staff` with header `x-api-key: ${PATRA_API_KEY}`
3. Return Patra's response to the frontend

Also create a PATCH proxy at `/api/patra/staff/[id]`.

---

## Task 3: TypeScript Types (create `types/patra.ts`)

```typescript
export interface PatraStaffInput {
  display_name: string;   // Required — employee's full name
  email: string;          // Required — corporate email
  job_title: string;      // Required — designation
  phone?: string;         // Optional — with country code
  avatar_url?: string;    // Optional — hosted image URL
  bio?: string;           // Optional — max 160 chars
  department?: string;    // Optional
  location?: string;      // Optional
  design?: string;        // Optional — card template ID override
  metadata?: Record<string, unknown>; // Optional — your internal IDs
}

export interface PatraStaffResponse {
  message: string;
  card_url: string;       // THE LIVE CARD URL — share this with the employee
  data: {
    id: string;           // UUID — use for PATCH calls
    staff_id: string;     // Short ID (e.g. ABC123) — appears in card URL
    status: 'joined' | 'invited' | 'rejected';
    is_approved: boolean;
  };
}
```

---

## Task 4: Service Functions (create `lib/patra.ts`)

Create:
- `createPatraStaff(input: PatraStaffInput): Promise<PatraStaffResponse>` — POST to `/api/patra/staff`
- `updatePatraStaff(id: string, updates: Partial<PatraStaffInput>): Promise<PatraStaffResponse>` — PATCH to `/api/patra/staff/${id}`

Handle errors with readable messages:
- 400 → "Missing required fields. Need display_name, email, job_title."
- 401 → "Invalid API key. Check your .env file."
- 404 → "Staff record not found."
- 500 → "Server error. Please try again."

---

## Task 5: Staff Form Component (create `components/AddStaffForm.tsx`)

Build a controlled React form with these inputs:

Required fields (validate before submit):
- Full Name → `display_name` (text, required)
- Work Email → `email` (email, required, validate format)
- Job Title → `job_title` (text, required)

Optional fields:
- Phone → `phone` (tel, include country code hint)
- Avatar URL → `avatar_url` (url)
- Bio → `bio` (textarea, maxLength=160)
- Department → `department` (text)

Form behaviour:
- Show inline validation errors before submit
- Show loading spinner while API is in flight
- On success: display card_url as a link + copy button + staff_id badge
- On error: show a red error message
- Include a Reset button to clear form after success

---

## Task 6: Result Display Component (`components/StaffCardResult.tsx`)

After success, show:
- card_url as a clickable "View Card" button (opens new tab)
- "Copy Link" button using `navigator.clipboard.writeText(card_url)`
- staff_id as a badge
- QR code of card_url using `qrcode.react` (`npm install qrcode.react`)
- "Email to Staff" mailto link: `mailto:${email}?subject=Your Digital ID Card&body=Your card: ${card_url}`

---

## Task 7: Webhook Receiver (`app/api/webhooks/patra/route.ts`)

Create a POST endpoint that:
1. Reads `x-patra-signature` header
2. Verifies: `btoa(`${timestamp}.${JSON.stringify(payload)}.${PATRA_WEBHOOK_SECRET}`)`
3. Returns 401 if signature mismatch
4. Handles `staff.added` → log/store the new card_url
5. Handles `staff.updated` → sync changes locally
6. Returns `{ received: true }` with 200

---

## What NOT to do
- ❌ Never call the Patra API directly from React/browser
- ❌ Never put pk_live_ key in any client-side file
- ❌ Never skip email validation before POST
- ❌ Never ignore webhook signature verification in production

## Final checklist
- [ ] .env has PATRA_API_KEY and PATRA_API_URL
- [ ] Backend proxy exists (POST + PATCH)
- [ ] TypeScript interfaces defined
- [ ] Form validates all 3 required fields
- [ ] Success shows card_url with copy + QR code
- [ ] Errors are handled with readable messages
- [ ] Webhook endpoint verifies signature
````

---

## 7. ⚡ Vibe Coder Prompt — Quick Start

> For simple projects. Paste this when you just need something working fast.

````
Connect my React + [Next.js / Express] app to the Patra Corporate API.

Setup:
- Add PATRA_API_KEY and PATRA_API_URL to .env
- Create server-side proxy POST /api/patra/staff → forwards to Patra with x-api-key header

Form (3 required, rest optional):
- display_name (text, required)
- email (email, required, validate format)
- job_title (text, required)
- phone (tel, optional)
- avatar_url (url, optional)
- bio (textarea, optional, max 160 chars)
- department (text, optional)

After submit:
- Show loading state
- On success: display card_url as link + copy button + show staff_id badge
- On error: show readable message per status code (400/401/500)

API call body: { display_name, email, job_title, phone?, avatar_url?, bio?, department? }
Success response shape: { message, card_url, data: { id, staff_id, status } }
````

---

## 8. 🧠 AI IDE Skill — Paste This as a Custom Rule in Cursor / Windsurf

> Go to **Cursor → Settings → Rules for AI** (or Windsurf → Custom Instructions) and paste the block below. Once added, your AI will always know the full Patra schema without extra prompting.

````
## Patra Corporate API — AI Context

You are working on an app that integrates with the Patra digital identity platform.

### What Patra Does
POST employee data → Patra generates a digital ID card → returns card_url.
PATCH updates are reflected on the live card immediately.

### Base URL
Stored in env as PATRA_API_URL (e.g. https://xxx.supabase.co/functions/v1/api-v1).

### Auth
Header: x-api-key: pk_live_<key>  (from env: PATRA_API_KEY)
NEVER use in client code. Always proxy via backend.

### Endpoints
POST   {PATRA_API_URL}/staff        → create staff
PATCH  {PATRA_API_URL}/staff/:id    → update staff (use id UUID from creation response)

### Required Request Body Fields
- display_name: string   (employee full name, shown on card)
- email: string          (corporate email, valid format required)
- job_title: string      (designation, shown on card)

### Optional Request Body Fields
- phone?: string         (with country code)
- avatar_url?: string    (JPG/PNG/WEBP hosted URL)
- bio?: string           (max 160 chars)
- department?: string
- location?: string
- design?: string        (template ID to override company default)
- metadata?: object      (store your internal IDs here)

### Success Response (201)
{
  message: string,
  card_url: string,       ← THE MOST IMPORTANT FIELD. Share this with the employee.
  data: {
    id: string,           ← use this UUID for PATCH calls
    staff_id: string,     ← short ID like "ABC123", appears in the URL
    status: "joined" | "invited" | "rejected",
    is_approved: boolean
  }
}

### Error Status Codes
400 → missing required field → tell user to add display_name, email, job_title
401 → wrong API key → check x-api-key header
404 → staff record not found → check id UUID
405 → wrong method → POST=create, PATCH=update
500 → server error → retry

### TypeScript Interfaces
interface PatraStaffInput {
  display_name: string; email: string; job_title: string;
  phone?: string; avatar_url?: string; bio?: string;
  department?: string; location?: string; design?: string;
  metadata?: Record<string, unknown>;
}
interface PatraStaffResponse {
  message: string; card_url: string;
  data: { id: string; staff_id: string; status: string; is_approved: boolean; };
}

### Webhook Events
staff.added / staff.updated / card.viewed
Signature header: x-patra-signature = btoa(`${timestamp}.${JSON.stringify(payload)}.${secret}`)

### Card URL Format
https://vaw-patra.vercel.app/{companyVanityUrl}/{staffId}

### Rules When Generating Code
1. Always proxy — never call Patra API directly from React/browser
2. Validate email format before any POST call
3. Always store the returned id UUID for future PATCH calls
4. Store card_url in your own database alongside the employee record
5. Verify webhook signatures in production
````

---

## 9. Support

| Channel | Details |
| :--- | :--- |
| Email | api-support@patra.app |
| Developer Portal | https://vaw-patra.vercel.app/developer |
| Documentation | https://vaw-patra.vercel.app/docs |
| Dashboard | https://vaw-patra.vercel.app/dashboard/api |

---

*Patra API Documentation — v1.0 — Updated April 2026*