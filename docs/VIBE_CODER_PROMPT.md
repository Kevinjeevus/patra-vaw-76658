# Patra Corporate API — Vibe Coder Prompt

> Copy the prompt below and paste it directly into your AI IDE (Cursor, Windsurf, Bolt, Lovable, etc.)
> to generate a complete, working integration with the Patra Corporate API.
> Replace the `[BRACKETED]` placeholder values with your actual project details before pasting.

---

## ✅ Full Integration Prompt (Copy This)

```
I need to integrate the Patra Corporate Digital ID Card API into my [REACT / NEXT.JS / VITE REACT] application.

## What Patra Does
Patra is a digital identity platform. When I send a staff member's details to the Patra API, it automatically creates a live digital ID card and returns a URL to it. I need to collect employee data in my app, send it to Patra, and store/display the returned card URL.

## Tech Stack
- Frontend: [React 18 / Next.js 14 / Vite + React]
- State Management: [useState / Zustand / Redux — pick your stack]
- HTTP: fetch / axios
- Form Library: [React Hook Form / plain controlled inputs]
- Backend/Proxy: [Next.js API Routes / Express / Node — needed to hide the API key]

---

## Task 1: Environment Setup

Create a `.env.local` file (or `.env`) with:
```
PATRA_API_KEY=pk_live_REPLACE_WITH_YOUR_KEY
PATRA_API_URL=https://YOURPROJECT.supabase.co/functions/v1/api-v1
```

IMPORTANT: Never expose `PATRA_API_KEY` in client-side code. Always proxy through a backend/API route.

---

## Task 2: API Proxy Route (Server-Side)

Create a server-side proxy so the API key stays hidden. 

For Next.js, create `app/api/patra/staff/route.ts` (or `pages/api/patra/staff.ts` for Pages Router).
For Express/Node, create a `POST /api/patra/staff` route.

The proxy should:
1. Accept a POST request with JSON body from the frontend.
2. Forward the request to `${PATRA_API_URL}/staff` with the header `x-api-key: ${PATRA_API_KEY}`.
3. Return the Patra response back to the frontend.

For updates, also create a PATCH proxy at `/api/patra/staff/[id]` that forwards to `${PATRA_API_URL}/staff/:id`.

---

## Task 3: Staff Input Form Component

Create a React component called `AddStaffForm` with the following controlled input fields. Every field maps directly to the Patra API body:

### Required Fields (must be filled before submitting):
| Input Label     | State Variable   | HTML input type | Patra JSON Key  | Validation                           |
|-----------------|------------------|-----------------|-----------------|--------------------------------------|
| Full Name       | displayName      | text            | display_name    | Required, min 2 chars                |
| Work Email      | email            | email           | email           | Required, must be valid email format |
| Job Title       | jobTitle         | text            | job_title       | Required, min 2 chars                |

### Optional Fields (enhance the generated ID card):
| Input Label     | State Variable   | HTML input type | Patra JSON Key  | Notes                                |
|-----------------|------------------|-----------------|-----------------|--------------------------------------|
| Phone Number    | phone            | tel             | phone           | Include country code e.g. +91        |
| Profile Photo   | avatarUrl        | url / file      | avatar_url      | URL to a JPG/PNG/WEBP image          |
| Bio             | bio              | textarea        | bio             | Max 160 characters                   |
| Department      | department       | text            | department      | e.g. Engineering, HR                 |

The form should:
- Validate all required fields before submitting.
- Show a loading spinner while the API call is in flight.
- On success, display the returned `card_url` as a clickable link and copy-to-clipboard button.
- On error, display a clear red error message with the reason.
- Include a "Reset" button to clear the form after success.

---

## Task 4: API Call Logic

Create a service function `createPatraStaffCard(formData)` that:

1. Sends a POST to `/api/patra/staff` (your proxy, NOT the Patra API directly).
2. Request body:
```json
{
  "display_name": "<string, required>",
  "email": "<string, required>",
  "job_title": "<string, required>",
  "phone": "<string, optional>",
  "avatar_url": "<string URL, optional>",
  "bio": "<string, optional>",
  "department": "<string, optional>"
}
```
3. Handles the response:
   - **Success (201)**: Extract `card_url`, `staff_id`, and `id` from `data`.
   - **Error (400)**: Show "Missing required fields" message.
   - **Error (401)**: Show "Invalid API key" message.
   - **Error (500)**: Show "Server error, please try again" message.

Also create `updatePatraStaffCard(staffRecordId, updatedData)` that:
- Sends a PATCH to `/api/patra/staff/${staffRecordId}`.
- Accepts a partial body of any of the fields listed above.
- Returns the updated card data.

---

## Task 5: Display & Distribute the Card URL

After a successful creation, the API returns:
```json
{
  "message": "Staff created successfully",
  "card_url": "https://vaw-patra.vercel.app/company-name/ABC123",
  "data": {
    "id": "uuid-string",
    "staff_id": "ABC123",
    "status": "joined"
  }
}
```

Create a `StaffCardResult` component that displays:
- The `card_url` as a clickable button (opens in new tab).
- A "Copy Link" button (uses `navigator.clipboard.writeText(card_url)`).
- The `staff_id` as a badge/chip.
- A QR Code of the `card_url` using the `qrcode.react` library (`npm install qrcode.react`).
- A "Send via Email" mailto link: `mailto:${email}?subject=Your Digital ID Card&body=Here is your Patra card: ${card_url}`.

---

## Task 6: Webhook Receiver (Optional but Recommended)

Create a webhook endpoint at `/api/webhooks/patra` that:
1. Receives POST requests from Patra when staff cards are created or updated.
2. Verifies the signature from the `x-patra-signature` header (base64 string of `timestamp.payload.webhook_secret`).
3. Handles two event types:
   - `staff.added`: Log or store the new staff card URL.
   - `staff.updated`: Update the locally stored card data.
4. Returns `{ received: true }` with status 200.

Webhook payload shape:
```json
{
  "event": "staff.added",
  "timestamp": 1234567890,
  "payload": {
    "id": "uuid",
    "staff_id": "ABC123",
    "card_url": "https://vaw-patra.vercel.app/company/ABC123",
    "data_submitted": {
      "display_name": "John Doe",
      "email": "john@company.com",
      "job_title": "Engineer"
    }
  }
}
```

---

## Task 7: TypeScript Types (if using TypeScript)

Define these interfaces/types:

```typescript
interface PatraStaffInput {
  display_name: string;          // Required
  email: string;                 // Required
  job_title: string;             // Required
  phone?: string;                // Optional
  avatar_url?: string;           // Optional
  bio?: string;                  // Optional
  department?: string;           // Optional
  location?: string;             // Optional
  metadata?: Record<string, unknown>; // Optional custom data
}

interface PatraStaffResponse {
  message: string;
  card_url: string;              // Live URL to the digital ID card
  data: {
    id: string;                  // UUID of the record
    staff_id: string;            // Short human-readable ID (e.g. ABC123)
    status: 'joined' | 'invited' | 'rejected';
    is_approved: boolean;
  };
}

interface PatraWebhookPayload {
  event: 'staff.added' | 'staff.updated';
  timestamp: number;
  payload: PatraStaffResponse['data'] & {
    data_submitted: PatraStaffInput;
    card_url: string;
  };
}
```

---

## Error Handling Rules

- `401` → "Your Patra API key is invalid. Check your .env file."
- `400` → "Missing fields: display_name, email, and job_title are all required."
- `404` → "Staff record not found. Check the staff record ID."
- `405` → "Wrong HTTP method used. Use POST to create, PATCH to update."
- `500` → "Patra server error. Try again in a few minutes."
- Network failure → "Could not reach the Patra API. Check your internet connection."

---

## What NOT to do

- ❌ Do NOT put `PATRA_API_KEY` in any client-side file or component.
- ❌ Do NOT call `https://...supabase.co/functions/v1/api-v1` directly from the browser.
- ❌ Do NOT skip email validation before submitting.
- ❌ Do NOT ignore the webhook signature — always verify it in production.

---

## Final Checklist

Once done, confirm:
- [ ] `.env.local` has `PATRA_API_KEY` and `PATRA_API_URL`
- [ ] API proxy route exists and works server-side
- [ ] Form has all 3 required input fields with validation
- [ ] Successful response shows `card_url` with copy + QR code
- [ ] Error states are handled and displayed clearly
- [ ] TypeScript types are defined (if TS project)
- [ ] Webhook endpoint exists and verifies signatures (if webhooks are enabled)
```

---

## Minimal Quick-Start Prompt (for simple projects)

If you just want the basics fast, use this shorter version:

```
Connect my React app to the Patra Corporate API.

Setup:
- Add PATRA_API_KEY and PATRA_API_URL to .env
- Create a server-side proxy POST /api/patra/staff that forwards to the Patra API with x-api-key header

Form:
- Build a form with 3 required fields: display_name (text), email (email), job_title (text)
- Add optional fields: phone (tel), avatar_url (url), bio (textarea)
- Validate required fields before submit
- Show loading state during API call

After success:
- Display card_url as a clickable link
- Add copy-to-clipboard button for the card_url
- Show the staff_id as a badge

API call body format:
{ display_name, email, job_title, phone?, avatar_url?, bio? }

Success response shape:
{ message, card_url, data: { id, staff_id, status } }

Error handling: show a readable message for 400, 401, 500 status codes.
```

---

*Both prompts work with Cursor, Windsurf, Bolt, v0, Lovable, and any AI-assisted IDE.*
