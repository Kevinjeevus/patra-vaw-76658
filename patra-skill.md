---
name: patra-corporate-api
description: >
  Context skill for the Patra Digital Identity Platform — Corporate API (v1).
  Enables AI assistants to correctly generate code for creating, updating, and
  distributing digital staff ID cards without requiring the developer to look up
  schemas, endpoints, or field names. Load this file as a custom instruction or
  rule in Cursor, Windsurf, Copilot Workspace, or any AI IDE.
---

# Patra Corporate API — AI IDE Skill

## About Patra

Patra is a digital identity platform that issues and hosts digital ID cards for corporate staff. Companies connect their HR systems to Patra via a REST API. When a company sends staff data to Patra, Patra generates a unique digital ID card and returns a live, shareable URL. Changes pushed via the API are reflected on the card in real time.

**Key concept:** You POST employee data → Patra generates a card → You get back a `card_url` to share.

---

## Authentication

All API requests must include:

```
x-api-key: pk_live_<YOUR_PRIVATE_KEY>
Content-Type: application/json
```

The `pk_live_` key is a **private server-side secret**. It must:
- Live in `.env` / `.env.local` as `PATRA_API_KEY`
- Never be used in client-side React code
- Always be proxied through a backend route (Next.js API route / Express / Hono)

---

## Base URL

```
https://<PROJECT_REF>.supabase.co/functions/v1/api-v1
```

Store this in `.env` as `PATRA_API_URL`.

---

## Endpoints

### Create a Staff Member
```
POST {PATRA_API_URL}/staff
```

### Update a Staff Member
```
PATCH {PATRA_API_URL}/staff/:id
```
Where `:id` is the Patra `id` UUID returned from the creation call.

---

## Request Body Schema

### Required Fields
These three fields must always be present. If any is missing, the API returns `400`.

```typescript
{
  display_name: string  // Employee's full name — shown on the card
  email: string         // Corporate email — used for identification
  job_title: string     // Official designation — shown on the card
}
```

### Optional Fields
Include these to enrich the generated ID card:

```typescript
{
  phone?: string        // Phone number with country code e.g. "+91 98765 43210"
  avatar_url?: string   // URL to employee photo (JPG/PNG/WEBP, min 300x300px)
  bio?: string          // Short bio, max 160 characters
  department?: string   // Department name e.g. "Engineering"
  location?: string     // Office/city e.g. "Bangalore, India"
  design?: string       // Optional: ID of a specific card template to use
  metadata?: Record<string, unknown> // Arbitrary key-value store for your internal IDs
}
```

### Full TypeScript Interface

```typescript
interface PatraStaffInput {
  display_name: string;
  email: string;
  job_title: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  department?: string;
  location?: string;
  design?: string;
  metadata?: Record<string, unknown>;
}
```

---

## Response Schema

### Success (201 Created)

```typescript
interface PatraStaffResponse {
  message: string;
  card_url: string;   // ← MOST IMPORTANT: share this with the employee
  data: {
    id: string;       // UUID — use this for PATCH updates
    staff_id: string; // Short human ID e.g. "ABC123" — appears in the URL
    status: 'joined' | 'invited' | 'rejected';
    is_approved: boolean;
  };
}
```

Example response:
```json
{
  "message": "Staff created successfully",
  "card_url": "https://vaw-patra.vercel.app/acme-corp/ABC123",
  "data": {
    "id": "a1b2c3d4-...",
    "staff_id": "ABC123",
    "status": "joined",
    "is_approved": true
  }
}
```

### Error Responses

| Status | Meaning | Fix |
|--------|---------|-----|
| `400` | Missing required fields | Add `display_name`, `email`, `job_title` |
| `401` | Invalid/missing API key | Check `x-api-key` header and `.env` |
| `404` | Staff record not found | Check `:id` param is correct UUID |
| `405` | Wrong HTTP method | Use `POST` to create, `PATCH` to update |
| `500` | Server error | Retry after a short wait |

---

## Correct Code Patterns

### Backend Proxy (Next.js App Router)

```typescript
// app/api/patra/staff/route.ts
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

### Backend Proxy (Next.js Pages Router)

```typescript
// pages/api/patra/staff.ts
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

### Service Function (Client calls your proxy)

```typescript
// lib/patra.ts
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

### React Form (Minimal Working Example)

```tsx
// components/AddStaffForm.tsx
import { useState } from 'react';
import { createPatraStaff } from '@/lib/patra';

export function AddStaffForm() {
  const [form, setForm] = useState({ display_name: '', email: '', job_title: '' });
  const [result, setResult] = useState<{ card_url: string; staff_id: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <form onSubmit={handleSubmit}>
      <input required placeholder="Full Name" value={form.display_name}
        onChange={e => setForm(p => ({ ...p, display_name: e.target.value }))} />
      <input required type="email" placeholder="Work Email" value={form.email}
        onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
      <input required placeholder="Job Title" value={form.job_title}
        onChange={e => setForm(p => ({ ...p, job_title: e.target.value }))} />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create ID Card'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div>
          <p>Staff ID: {result.staff_id}</p>
          <a href={result.card_url} target="_blank" rel="noreferrer">View Card</a>
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

## Webhook Events

Configure a webhook URL in the Patra Dashboard to receive these events:

| Event | When Triggered |
|-------|---------------|
| `staff.added` | A new staff card is created |
| `staff.updated` | A staff profile is changed |
| `card.viewed` | Someone views a staff card (optional) |

### Webhook Payload Shape

```typescript
interface PatraWebhookPayload {
  event: 'staff.added' | 'staff.updated' | 'card.viewed';
  timestamp: number; // Unix epoch
  payload: {
    id: string;
    staff_id: string;
    card_url: string;
    data_submitted: PatraStaffInput;
  };
}
```

### Signature Verification

Patra signs every webhook. Verify the `x-patra-signature` header:

```typescript
// The signature is: btoa(`${timestamp}.${JSON.stringify(payload)}.${WEBHOOK_SECRET}`)
function verifyPatraSignature(
  receivedSig: string,
  timestamp: number,
  payload: unknown,
  secret: string
): boolean {
  const expected = btoa(`${timestamp}.${JSON.stringify(payload)}.${secret}`);
  return receivedSig === expected;
}
```

---

## Card URL Format

Cards are always hosted at:
```
https://vaw-patra.vercel.app/{companyVanityUrl}/{staffId}
```

Example: `https://vaw-patra.vercel.app/acme-corp/ABC123`

The `companyVanityUrl` is set in the Patra Company Dashboard branding settings. The `staffId` is returned in the API response.

---

## Common Mistakes to Avoid

- ❌ **Calling Patra API directly from React** — key is exposed in network tab
- ❌ **Not validating email format** before submitting — Patra will reject with 400
- ❌ **Ignoring `is_approved` field** — cards must be approved to be publicly viewable
- ❌ **Using wrong method** — `POST` = create, `PATCH` = update, never `PUT`
- ❌ **Storing the raw `pk_live_` key in source code** — use environment variables only
- ✅ Always proxy through your backend
- ✅ Store `card_url` in your database alongside your employee record
- ✅ Use the returned `id` (UUID) not `staff_id` for PATCH calls

---

## Environment Variables Cheatsheet

```bash
# .env.local (Next.js) or .env (Vite/Express)
PATRA_API_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxx
PATRA_API_URL=https://xxxxxxxx.supabase.co/functions/v1/api-v1
PATRA_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxx
```

For **Vite** React (client-exposed), use only non-secret values:
```bash
VITE_PATRA_CARD_BASE_URL=https://vaw-patra.vercel.app
```

---

*This skill file was generated for the Patra platform. Version: 1.0 | Updated: April 2026*
