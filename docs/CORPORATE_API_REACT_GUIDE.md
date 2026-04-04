# Patra Corporate API: Developer Integration Guide

This guide provides everything a developer (specifically focused on React/Frontend) needs to know to successfully integrate with the Patra Corporate API for automated staff identity management.

---

## 1. Authentication & Connection

To start, you will need your **Private API Key**, which you can find in your [Company Dashboard](https://vaw-patra.vercel.app/dashboard/api).

### Headers
Every request to the Patra API must include the following headers:

| Header | Value | Description |
| :--- | :--- | :--- |
| `x-api-key` | `pk_live_...` | Your unique private API key. |
| `Content-Type` | `application/json` | All payloads must be sent as JSON. |

---

## 2. Staff Data Schema (Variables)

When creating or updating a staff member, the following variables are collected and used. These fields are stored in the `data_submitted` JSON object.

### Required Fields (Creation)
The API requires at least these fields to successfully create a staff entry and generate a digital card.

| Variable | Type | Description |
| :--- | :--- | :--- |
| `display_name` | `string` | The full name of the employee (e.g., "John Doe"). |
| `email` | `string` | The official corporate email address. |
| `job_title` | `string` | The staff's designation (e.g., "Senior Engineer"). |

### Optional Fields
The following fields can be included to enrich the digital card profile:

| Variable | Type | Description |
| :--- | :--- | :--- |
| `phone` | `string` | Contact number with country code. |
| `avatar_url` | `string` | URL to a hosted profile picture (JPG/PNG/WEBP). |
| `bio` | `string` | A short professional bio (max 160 chars). |
| `design` | `string` | ID of a specific card design template (overrides default). |

---

## 3. Endpoints for React Developers

### A. Create Staff Member
**`POST https://vaw-patra.vercel.app/functions/v1/api-v1/staff`**

**Request Example (React Fetch):**
```javascript
const addStaff = async (staffData) => {
  const response = await fetch('https://vaw-patra.vercel.app/functions/v1/api-v1/staff', {
    method: 'POST',
    headers: {
      'x-api-key': 'your_pk_live_key...',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      display_name: staffData.name,
      email: staffData.email,
      job_title: staffData.role,
      avatar_url: staffData.photoUrl
    })
  });

  const data = await response.json();
  if (response.ok) {
    console.log('Card URL:', data.card_url); // Distribute this URL!
  } else {
    console.error('Error adding staff:', data.error);
  }
};
```

**Successful Response (201 Created):**
```json
{
  "message": "Staff created successfully",
  "card_url": "https://vaw-patra.vercel.app/my-company/ABC123",
  "data": {
    "id": "uuid-...",
    "staff_id": "ABC123",
    "status": "joined"
  }
}
```

### B. Update Staff Member
**`PATCH https://vaw-patra.vercel.app/functions/v1/api-v1/staff/:id`**

Use this to update existing staff profiles in real-time. Changes are reflected on the digital card immediately.

---

## 4. How to Distribute & Share

Once a staff member is created, you receive a `card_url`. You can distribute this in several ways:
1.  **Email/Notification**: Send the URL directly via your automated system.
2.  **QR Codes**: Use the URL to generate a dynamic QR code for employee badges.
3.  **Intranet**: Embed the link in your company directory.

---

## 5. Webhook Integration (Real-time Sync)

Configure your webhook URL in the Settings tab to receive notifications when:
-   **`staff.added`**: A new staff card is created.
-   **`staff.updated`**: Information on an existing card is changed.

### Signature Verification
To ensure the payload is from Patra, verify the `x-patra-signature`.
The signature is a Base64 string of: `[timestamp].[payload_json].[webhook_secret]`

---

## 6. Common Errors & Troubleshooting

| Status Code | Description | Solution |
| :--- | :--- | :--- |
| `401 Unauthorized` | Invalid or missing API key. | Check your `x-api-key` header. |
| `400 Bad Request` | Missing required fields. | Ensure `display_name`, `email`, and `job_title` are present. |
| `405 Method Not Allowed` | Incorrect HTTP method. | Use `POST` for creation and `PATCH` for updates. |

### React Dev Tip: Handling CORS
The Patra API supports CORS. If you are calling the API from a client-side React app, ensure your domain is not blocked by a strict Content Security Policy.

**Important Note**: We recommend performing API calls from your backend (e.g., Next.js API Routes or Node.js server) to keep your Private API Key secure from the client.

---

## 7. Best Practices for Error-Free Implementation

1.  **Server-Side First**: Never expose your `pk_live_` key in client-side code. Use a Next.js API Route or an Express proxy.
2.  **Validation**: Validate email formats before sending them to the API.
3.  **Idempotency**: Use your internal Employee ID in a custom metadata field if you need to track mappings between Patra and your database.
4.  **Fallback Designs**: If no `design` is specified, Patra uses the "Default Design" selected in your Company Settings.

---

*Need more help? Visit our [Developer Portal](https://vaw-patra.vercel.app/docs) or contact support@patra.app.*
