# Patra API Documentation

Complete documentation for the Patra API - integrate digital identity features into your applications.

## 📚 Documentation Structure

```
docs/api/
├── README.md                 # This file
├── getting-started.md        # Quick start guide
├── authentication.md         # API authentication
├── endpoints.md              # Complete API reference
├── embedding.md              # Embed cards on websites
├── webhooks.md               # Real-time event notifications
├── sdks.md                   # Official SDKs & libraries
└── use-cases.md              # Real-world examples
```

## 🚀 Quick Links

- **[Getting Started](./getting-started.md)** - Your first API call in 5 minutes
- **[Authentication](./authentication.md)** - Secure your API requests
- **[Endpoints Reference](./endpoints.md)** - Complete API documentation
- **[Embedding Guide](./embedding.md)** - Add cards to your website
- **[Webhooks](./webhooks.md)** - Real-time event notifications
- **[SDKs & Libraries](./sdks.md)** - Official client libraries
- **[Use Cases](./use-cases.md)** - Real-world examples

## 🎯 What Can You Build?

### 1. **Quick User Onboarding**
Create user accounts instantly by just providing a Patra username. All profile data is fetched automatically.

```javascript
const user = await patra.users.quickCreate({ patraUsername: 'johndoe' });
// User created with full profile, avatar, social links, etc.
```

### 2. **Card Embedding**
Display user cards on any website with a simple embed code.

```html
<div class="patra-embed" data-user="johndoe"></div>
<script src="https://vaw-patra.vercel.app/embed.js" async></script>
```

### 3. **Real-time Sync**
Keep your systems in sync with webhooks.

```javascript
patra.webhooks.on('card.updated', (event) => {
  syncToCRM(event.data);
});
```

## 📖 Core Concepts

### API Keys
Authenticate your requests using API keys. Get yours from the [Developer Dashboard](/settings/developer).

### Rate Limits
- **Free**: 100 requests/hour
- **Pro**: 1,000 requests/hour
- **Enterprise**: Custom limits

### Base URL
```
https://vaw-patra.vercel.app/v1
```

## 🔑 Key Features

### ✅ User Data Fetching
Retrieve complete user profiles including:
- Personal information
- Job title & company
- Social media links
- Contact details
- Profile photos
- QR codes

### ✅ Card Embedding
Embed interactive cards on:
- Websites & blogs
- Email signatures
- Team directories
- Event pages
- Portfolio sites

### ✅ Webhooks
Get notified when:
- Cards are updated
- Contacts are shared
- Links are clicked
- Milestones are reached

### ✅ Analytics
Track card performance:
- View counts
- Contact downloads
- Link clicks
- Geographic data
- Device types

## 🛠️ Available SDKs

We provide official SDKs for:

- **Node.js** - `npm install @patra/node`
- **Python** - `pip install patra-python`
- **React** - `npm install @patra/react`
- **PHP** - `composer require patra/patra-php`
- **Ruby** - `gem install patra`
- **Go** - `go get github.com/patra/patra-go`

[View all SDKs →](./sdks.md)

## 📝 Example Use Cases

1. **Team Directories** - Auto-updating employee profiles
2. **Event Networking** - QR code badges for conferences
3. **CRM Integration** - Auto-sync contact information
4. **Blog Author Bios** - Live, always-current author profiles
5. **Job Applications** - One-click profile import
6. **Speaker Directories** - Conference speaker management
7. **Customer Portals** - Quick profile setup
8. **Email Signatures** - Professional, auto-updating signatures
9. **Analytics Dashboards** - Track card performance
10. **Virtual Business Cards** - Replace physical cards

[See all use cases →](./use-cases.md)

## 🚦 Getting Started in 3 Steps

### Step 1: Get Your API Key
```
1. Sign up at https://vaw-patra.vercel.app
2. Go to Settings → Developer
3. Generate a new API key
```

### Step 2: Make Your First Request
```bash
curl https://vaw-patra.vercel.app/v1/cards/johndoe \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Step 3: Build Something Awesome
Check out our [use cases](./use-cases.md) for inspiration!

## 📊 API Endpoints Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/cards/:username` | GET | Get user card details |
| `/v1/cards/search` | GET | Search for cards |
| `/v1/cards/:username/vcard` | GET | Download vCard |
| `/v1/cards/:username/analytics` | GET | Get card analytics |
| `/v1/users/quick-create` | POST | Create user from Patra username |
| `/v1/embed/:username` | GET | Get embed code |

[View complete API reference →](./endpoints.md)

## 🔒 Security

- All requests must use HTTPS
- API keys should be kept secure
- Webhook signatures should always be verified
- Use environment variables for keys
- Rotate keys regularly

[Learn more about security →](./authentication.md#security-best-practices)

## 💡 Support

Need help? We're here for you:

- **Documentation**: You're reading it!
- **Email**: developers@patra.app
- **Discord**: https://discord.gg/patra
- **GitHub**: https://github.com/patra
- **Status Page**: https://status.vaw-patra.vercel.app

## 🎓 Tutorials

Coming soon:
- Building a team directory
- Creating a networking app
- Integrating with your CRM
- Building custom analytics
- Advanced webhook usage

## 📄 License & Terms

By using the Patra API, you agree to our:
- [Terms of Service](https://vaw-patra.vercel.app/terms)
- [Privacy Policy](https://vaw-patra.vercel.app/privacy)
- [API Terms](https://vaw-patra.vercel.app/api-terms)

## 🔄 Changelog

### v1.0.0 (Current)
- Initial API release
- Card retrieval endpoints
- Search functionality
- Embedding support
- Webhook events
- Analytics endpoints

---

**Ready to get started?** → [Getting Started Guide](./getting-started.md)

**Questions?** → developers@patra.app
