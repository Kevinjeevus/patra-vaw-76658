# Card API Documentation

## Overview
The Patra Card API allows you to fetch public digital card data for integration into external websites or applications.

## Endpoint
`POST https://[YOUR_PROJECT_REF].supabase.co/functions/v1/get-card`

## Authentication
This is a public endpoint, but you may need to provide your Anon Key in the Authorization header depending on your function configuration.

`Authorization: Bearer [YOUR_ANON_KEY]`

## Parameters
You can fetch a card using either `vanity_url` (username) or `id`.

### Query Parameters
- `vanity_url`: The unique username/URL of the card (e.g., `abin`).
- `id`: The UUID of the card.

## Example Request

```bash
curl -X GET 'https://[YOUR_PROJECT_REF].supabase.co/functions/v1/get-card?vanity_url=abin' \
  -H 'Authorization: Bearer [YOUR_ANON_KEY]'
```

## Example Response

```json
{
  "id": "uuid...",
  "vanity_url": "abin",
  "title": "Abin's Card",
  "owner": {
    "name": "Abin B N",
    "avatar_url": "...",
    "job_title": "CTO"
  },
  "card_data": {
    "fullName": "Abin B N",
    "jobTitle": "CTO",
    "company": "Patra",
    "email": "...",
    "phone": "...",
    "avatarUrl": "...",
    "cardConfig": { ... }
  },
  "meta": {
    "created_at": "...",
    "updated_at": "..."
  }
}
```

## Embedding in React
You can use the `DigitalCard` component from the Patra codebase if you are building within the Patra ecosystem, or fetch this JSON and render your own card UI for external sites.
