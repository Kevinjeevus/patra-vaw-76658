# Card Dropping Feature - Complete Implementation Plan

## 📋 Overview

The **Card Dropping** feature transforms Patra into a social networking platform by enabling users to share their digital business cards through QR codes in real-time. This feature facilitates seamless profile exchange between nearby users and provides a secure dashboard for managing received profiles.

### Key Value Propositions
- **Instant Sharing**: Exchange business cards as easily as scanning a QR code
- **Mutual Connection**: Both parties must consent and exchange profiles simultaneously
- **Organized Management**: Dashboard with folder-style organization for saved profiles
- **Privacy Control**: Users can revoke access at any time (with reciprocal consequences)
- **Trust & Transparency**: Users can see who has access to their profile

---

## 🎯 Core Features

### 1. Card Drop Mode (Send/Receive)
- Dual-mode interface: **Send Card** or **Receive Card**
- QR code generation with username-based URL (`/:username?card`)
- Automatic brightness boost for optimal scanning
- Real-time sharing confirmation

### 2. Profile Dashboard
- Centralized hub for all saved profiles in the patra dashboard
- Folder-style UI with latest card preview
- Organized profile collections
- Quick access to the patra dashboard from header dropdown and sidebar

### 3. Access Management
- View who has access to your profile
- Revoke access to specific users
- Reciprocal access (revoking removes your access too)
- Sharing history and timestamps

### 4. Save Profile Flow
- Scan QR → View Profile → Save to Dashboard
- "Save Profile" button on external profiles
- "Saved to Dashboard" confirmation for already-saved profiles
- Automatic mutual linking

---

## 🎨 User Experience Design

### A. Card Drop Interface

#### Send Mode
```
┌─────────────────────────────────────┐
│        Share Your Card              │
│                                     │
│   ┌─────────────────────────┐       │
│   │                         │       │
│   │     [QR CODE IMAGE]     │       │
│   │  @username/card         │       │
│   │                         │       │
│   └─────────────────────────┘       │
│                                     │
│   Point camera at this QR code      │
│   Brightness: Auto-boosted ☀️       |
│                                     │
│   [Switch to Receive Mode]          │
└─────────────────────────────────────┘
```

#### Receive Mode
*Can scan using the device build-in scanner or third party scanner too
```
┌─────────────────────────────────────┐
│        Scan a Card                  │
│                                     │
│   ┌─────────────────────────┐       │
│   │                         │       │
│   │   📷 Camera View        │      │
│   │   [Scanning Frame]      │       │
│   │                         │       │
│   └─────────────────────────┘       │
│                                     │
│   Position QR code in frame         │
│   Tip: Hold steady for 2 seconds    │
│                                     │
│   [Switch to Send Mode]             │
└─────────────────────────────────────┘
```

### B. Dashboard UI Flow

#### Level 1: Dashboard Home
```
┌─────────────────────────────────────────────┐
│  My Saved Profiles                          │
│                                             │
│   _________________                         │
│  |                 \                        |
│  |                  \                       │
│  |                   \_________________     |
│  |  ________________   _____________   |    |
│  |  \  John Doe     \  \  Sarah Doe \  |    |
|  |___\_______________\__\____________\_|    |
|  |                                     |    |
|  |                                     |    |
|  |      PROFILE                        |    |
|  |                                     |    |
|  |_____________________________________|    |
|                                             |
| Statistics:                                 │
│  • Total Saved: 24                          │
│  • This Week: 3 new                         │
│  • Your Card Shared With: 18 people         │
│                                             │
└─────────────────────────────────────────────┘
```

#### Level 2: Profile Collection Grid
```
┌─────────────────────────────────────────────┐
│  ← Back to Dashboard                        │
│  Profile Collection (24)                    │
│  ┌───────────────────────────────────────┐  |
│  | Patra                                 |  |
|  |  ┌─────────┐                          |  |
|  |  |         |  John Doe                |  |
|  |  | Profile |  Developer               |  |
|  |  |   img   |  johndoe@gamil.com       |  |
|  |  └─────────┘  +1234567890             |  |
|  |                                       |  |
|  └───────────────────────────────────────┘  |
│                                             |
│  ┌───────────────────────────────────────┐  |
│  | Patra                                 |  |
|  |  ┌─────────┐                          |  |
|  |  |         |  Sarah John              |  |
|  |  | Profile |  Developer               |  |
|  |  |   img   |  Sarah@gamil.com         |  |
|  |  └─────────┘  +1234567890             |  |
|  |                                       |  |
|  └───────────────────────────────────────┘  |
│                                             |
│  [Search profiles...]                       |
└─────────────────────────────────────────────┘
```

#### Level 3: User's Card Collection
```
┌─────────────────────────────────────────────┐
│  ← Back to Collection                       │
│  John Smith's Profile                       │
│                                             │
│  ┌───────────────────────────────────────┐  |
│  |                                       │  |
│  |           Banner Image                │  |
│  |                                       │  |
|  |                                       |  |
|  |  ┌─────────┐                          |  |
|  |  |         |  John Doe                |  |
|  |  | Profile |  Developer               |  |
|  |  |   img   |  johndoe@gamil.com       |  |
|  |  └─────────┘  +1234567890             |  |
|  |                                       |  |
|  :                                       :  |
|  └───────────────────────────────────────┘  |
│                                             |
│                                             │
│  Saved on: Dec 1, 2025                      │
│  Last updated: Dec 3, 2025                  │
└─────────────────────────────────────────────┘
```

### C. Profile Viewing & Saving

#### External Profile (Not Saved)
```
┌─────────────────────────────────────┐
│  @john_smith                        │
│                                     │
│  [Profile Content]                  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  💾 Save to Dashboard       │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

#### External Profile (Already Saved)
```
┌─────────────────────────────────────┐
│  @john_smith                        │
│                                     │
│  [Profile Content]                  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  ✓ Saved to Dashboard       │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### D. Access Management Panel

#### Your Card's Access List
```
┌─────────────────────────────────────────────┐
│  Who Has Your Card                          │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ @john_smith - John Smith            │    │
│  │ Shared on: Dec 1, 2025 2:45 PM      │    │
│  │ [Revoke Access]                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ @sarah_k - Sarah Johnson            │    │
│  │ Shared on: Nov 28, 2025 10:30 AM    │    │
│  │ [Revoke Access]                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  Total: 18 people                           │
└─────────────────────────────────────────────┘
```

---

## 🔐 Security & Privacy Architecture

### Access Control Model

#### Mutual Access System
```
User A scans User B's QR code
        ↓
User B's profile displayed to User A
        ↓
User A clicks "Save to Dashboard"
        ↓
System creates TWO-WAY access:
  - User A can view User B's profile
  - User B can view User A's profile
        ↓
Both users can see each other in "Access List"
```

#### Revocation Flow
```
User A revokes User B's access
        ↓
System removes BOTH directions:
  - User B loses access to User A's profile
  - User A loses access to User B's profile
        ↓
Saved cards remain in dashboard but show:
  "Access revoked - Cannot view profile"
        ↓
Optional: Delete from dashboard permanently
```

### Security Measures

1. **Authentication Required**
   - Cannot save profiles without being logged in
   - QR codes only accessible to authenticated users

2. **Access Tracking**
   - Every profile access logged with timestamp
   - IP address and device information recorded
   - Suspicious activity alerts

3. **Data Encryption**
   - QR code URLs expire after scan
   - One-time tokens for card drop sessions
   - Encrypted storage of access relationships

4. **Privacy Controls**
   - Users can make profiles "unshareable"
   - Limit who can initiate card drops
   - Block specific users from saving your card

---

## 🗄️ Database Schema

### New Tables

#### 1. `profile_access`
Tracks mutual access between users.

```sql
CREATE TABLE profile_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationship
  owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  viewer_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Card Information
  card_id UUID REFERENCES digital_cards(id) ON DELETE SET NULL,
  
  -- Access Details
  shared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_viewed_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  revoked_at TIMESTAMP WITH TIME ZONE,
  revoked_by UUID REFERENCES auth.users(id),
  
  -- Metadata
  sharing_method VARCHAR(50) DEFAULT 'qr_scan', -- qr_scan, link, manual
  device_info JSONB,
  location_info JSONB, -- optional geolocation
  
  -- Constraints
  UNIQUE(owner_user_id, viewer_user_id, card_id),
  CHECK (owner_user_id != viewer_user_id)
);

-- Indexes
CREATE INDEX idx_profile_access_owner ON profile_access(owner_user_id);
CREATE INDEX idx_profile_access_viewer ON profile_access(viewer_user_id);
CREATE INDEX idx_profile_access_active ON profile_access(is_active);
```

#### 2. `saved_profiles`
User's dashboard of saved profiles.

```sql
CREATE TABLE saved_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationship
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  saved_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Organization
  folder_name VARCHAR(100),
  tags TEXT[],
  notes TEXT,
  
  -- Timestamps
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  access_count INTEGER DEFAULT 0,
  is_favorite BOOLEAN DEFAULT FALSE,
  
  -- Constraints
  UNIQUE(user_id, saved_user_id)
);

-- Indexes
CREATE INDEX idx_saved_profiles_user ON saved_profiles(user_id);
CREATE INDEX idx_saved_profiles_saved_user ON saved_profiles(saved_user_id);
CREATE INDEX idx_saved_profiles_favorite ON saved_profiles(is_favorite);
```

#### 3. `card_drop_sessions`
Temporary QR code generation sessions.

```sql
CREATE TABLE card_drop_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- User
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id UUID REFERENCES digital_cards(id) ON DELETE CASCADE,
  
  -- Session Info
  session_token VARCHAR(255) UNIQUE NOT NULL,
  qr_code_url TEXT,
  
  -- Validity
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '30 minutes',
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Usage
  scan_count INTEGER DEFAULT 0,
  max_scans INTEGER DEFAULT 10,
  
  -- Metadata
  device_info JSONB,
  ip_address INET
);

-- Indexes
CREATE INDEX idx_card_drop_sessions_token ON card_drop_sessions(session_token);
CREATE INDEX idx_card_drop_sessions_active ON card_drop_sessions(is_active, expires_at);
```

#### 4. `access_revocation_history`
Audit log for access revocations.

```sql
CREATE TABLE access_revocation_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Original Access
  access_id UUID REFERENCES profile_access(id),
  owner_user_id UUID NOT NULL REFERENCES auth.users(id),
  viewer_user_id UUID NOT NULL REFERENCES auth.users(id),
  
  -- Revocation
  revoked_by UUID NOT NULL REFERENCES auth.users(id),
  revoked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reason TEXT,
  
  -- Metadata
  original_shared_at TIMESTAMP WITH TIME ZONE,
  total_views INTEGER DEFAULT 0
);

-- Index
CREATE INDEX idx_revocation_history_owner ON access_revocation_history(owner_user_id);
```

---

## 🔌 API Endpoints

### 1. Card Drop Session Management

#### `POST /api/card-drop/create-session`
Create a new card drop session and generate QR code.

**Request:**
```json
{
  "cardId": "uuid",
  "maxScans": 10,
  "expiryMinutes": 30
}
```

**Response:**
```json
{
  "sessionId": "uuid",
  "sessionToken": "unique-token",
  "qrCodeUrl": "https://patra.app/:username?card?token=xxx",
  "qrCodeDataUrl": "data:image/png;base64,...",
  "expiresAt": "2025-12-04T20:32:00Z"
}
```

#### `POST /api/card-drop/scan`
Process QR code scan and return profile data.

**Request:**
```json
{
  "sessionToken": "unique-token",
  "scannerUserId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "profileData": { /* Full card data */ },
  "ownerUserId": "uuid",
  "canSave": true,
  "alreadySaved": false
}
```

#### `DELETE /api/card-drop/end-session`
End an active card drop session.

**Request:**
```json
{
  "sessionId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Session ended"
}
```

### 2. Profile Saving

#### `POST /api/profiles/save`
Save a scanned profile to dashboard.

**Request:**
```json
{
  "savedUserId": "uuid",
  "cardId": "uuid",
  "sharingMethod": "qr_scan",
  "folderName": "Conference 2025",
  "tags": ["networking", "conference"]
}
```

**Response:**
```json
{
  "success": true,
  "savedProfileId": "uuid",
  "mutualAccessCreated": true,
  "message": "Profile saved to dashboard"
}
```

#### `GET /api/profiles/saved`
Get all saved profiles for current user.

**Response:**
```json
{
  "profiles": [
    {
      "id": "uuid",
      "user": {
        "id": "uuid",
        "username": "john_smith",
        "fullName": "John Smith",
        "avatar": "url"
      },
      "cardCount": 2,
      "savedAt": "2025-12-01T14:30:00Z",
      "lastAccessed": "2025-12-03T10:15:00Z",
      "tags": ["conference"],
      "isActive": true
    }
  ],
  "total": 24,
  "statistics": {
    "totalSaved": 24,
    "thisWeek": 3,
    "favorites": 5
  }
}
```

#### `GET /api/profiles/saved/:userId/cards`
Get all cards for a specific saved user.

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "username": "john_smith",
    "fullName": "John Smith"
  },
  "cards": [
    {
      "id": "uuid",
      "cardName": "Business Card",
      "username": "john_smith",
      "thumbnail": "url",
      "lastUpdated": "2025-12-03T08:00:00Z"
    }
  ]
}
```

#### `DELETE /api/profiles/saved/:savedProfileId`
Remove a saved profile from dashboard.

**Request Query:**
```
?maintainAccess=true // Keep mutual access or revoke
```

**Response:**
```json
{
  "success": true,
  "accessRevoked": false,
  "message": "Profile removed from dashboard"
}
```

### 3. Access Management

#### `GET /api/access/who-has-my-card`
Get list of users who have access to your profile.

**Response:**
```json
{
  "accessList": [
    {
      "id": "uuid",
      "viewer": {
        "id": "uuid",
        "username": "john_smith",
        "fullName": "John Smith",
        "avatar": "url"
      },
      "sharedAt": "2025-12-01T14:45:00Z",
      "lastViewed": "2025-12-03T10:20:00Z",
      "viewCount": 5,
      "sharingMethod": "qr_scan",
      "cardId": "uuid"
    }
  ],
  "total": 18
}
```

#### `GET /api/access/my-access`
Get list of profiles you have access to.

**Response:**
```json
{
  "accessList": [
    {
      "id": "uuid",
      "owner": {
        "id": "uuid",
        "username": "sarah_k",
        "fullName": "Sarah Johnson",
        "avatar": "url"
      },
      "sharedAt": "2025-11-28T10:30:00Z",
      "isActive": true
    }
  ],
  "total": 12
}
```

#### `POST /api/access/revoke`
Revoke someone's access to your profile (mutual revocation).

**Request:**
```json
{
  "viewerUserId": "uuid",
  "reason": "No longer wish to share"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Access revoked for both parties",
  "mutualRevocation": true,
  "affectedAccessIds": ["uuid1", "uuid2"]
}
```

#### `GET /api/access/check/:userId`
Check if you have access to a specific user's profile.

**Response:**
```json
{
  "hasAccess": true,
  "accessId": "uuid",
  "sharedAt": "2025-12-01T14:45:00Z",
  "savedToDashboard": true
}
```

---

## 🚀 Implementation Phases

### Phase 1: Database & Backend (Week 1)
**Priority: High**

- [ ] Create database tables and migrations
- [ ] Set up Row Level Security (RLS) policies
- [ ] Implement API endpoints for card drop sessions
- [ ] Create QR code generation utility (using `qrcode` library)
- [ ] Build access management API endpoints
- [ ] Write database triggers for mutual access creation
- [ ] Implement session expiry cleanup job

**Deliverables:**
- Fully functional backend API
- Database schema with proper relationships
- API documentation

### Phase 2: Card Drop UI (Week 2)
**Priority: High**

- [ ] Create `CardDropModal` component
  - Send mode with QR display
  - Receive mode with camera scanner
  - Mode toggle switch
  - Brightness control API
- [ ] Implement QR scanner using `react-qr-scanner` or `html5-qrcode`
- [ ] Add "Card Drop" button to header/quick access
- [ ] Create success/error states for scanning
- [ ] Add loading states and animations
- [ ] Implement camera permissions handling

**Deliverables:**
- Working card drop interface
- QR generation and scanning
- Smooth user experience

### Phase 3: Dashboard UI (Week 3)
**Priority: High**

- [ ] Create `ProfileDashboard` page component
- [ ] Build folder-style main dashboard view
  - Latest card preview "popped out"
  - Statistics display
  - Quick actions
- [ ] Create profile collection grid view
  - Search and filter functionality
  - Sort options (recent, name, tags)
- [ ] Build user card collection view
  - Display all cards for a user
  - Navigation between cards
- [ ] Add dashboard to header dropdown
- [ ] Add dashboard to sidebar quick access
- [ ] Implement responsive design for mobile

**Deliverables:**
- Complete dashboard interface
- Multi-level navigation
- Responsive layouts

### Phase 4: Profile Viewing & Saving (Week 4)
**Priority: Medium**

- [ ] Add "Save to Dashboard" button to external profiles
  - Conditional rendering (not saved vs saved)
  - Different states and messaging
- [ ] Create save profile flow
  - Optional tags/folder input
  - Confirmation modal
  - Success animation
- [ ] Implement profile viewing from dashboard
  - Access check before displaying
  - "Access revoked" state
- [ ] Add "Saved to Dashboard" indicator
- [ ] Create share confirmation notifications

**Deliverables:**
- Save/unsave functionality
- Profile access validation
- User feedback mechanisms

### Phase 5: Access Management UI (Week 5)
**Priority: Medium**

- [ ] Create "Access Management" page
  - "Who has my card" section
  - "My saved profiles" section
- [ ] Build access list components
  - User cards with actions
  - Sort and filter options
- [ ] Implement revoke access flow
  - Confirmation modal with warning
  - Reciprocal revocation explanation
  - Success/error handling
- [ ] Add access statistics dashboard
- [ ] Create revocation history view (admin only)

**Deliverables:**
- Access management interface
- Revocation flows
- User transparency features

### Phase 6: Polish & Optimization (Week 6)
**Priority: Low**

- [ ] Add animations and transitions
  - Page transitions
  - Card animations
  - Modal animations
- [ ] Implement caching strategies
  - Cache saved profiles locally
  - Optimize API calls
- [ ] Add offline support
  - Show cached profiles when offline
  - Queue save actions
- [ ] Performance optimization
  - Lazy loading for profile collections
  - Image optimization
- [ ] Accessibility improvements
  - ARIA labels
  - Keyboard navigation
  - Screen reader support
- [ ] Analytics integration
  - Track card drops
  - Monitor save rates
  - Access analytics

**Deliverables:**
- Smooth animations
- Optimized performance
- Accessibility compliance

### Phase 7: Testing & Launch (Week 7)
**Priority: High**

- [ ] Unit tests for utilities and helpers
- [ ] Integration tests for API endpoints
- [ ] E2E tests for user flows
  - Card drop flow
  - Save profile flow
  - Revoke access flow
- [ ] Security audit
  - Access control testing
  - Permission validation
- [ ] User acceptance testing (UAT)
- [ ] Bug fixes and refinements
- [ ] Documentation updates
- [ ] Production deployment

**Deliverables:**
- Comprehensive test coverage
- Security validation
- Production-ready feature

---

## 🎨 Design Specifications

### Color Palette
```css
/* Card Drop Mode */
--card-drop-primary: #3b82f6; /* Blue for send mode */
--card-drop-secondary: #10b981; /* Green for receive mode */
--card-drop-bg: #f9fafb;
--card-drop-border: #e5e7eb;

/* Dashboard */
--dashboard-accent: #8b5cf6; /* Purple for folder */
--dashboard-card-bg: #ffffff;
--dashboard-card-hover: #f3f4f6;

/* Access Management */
--access-active: #10b981; /* Green */
--access-revoked: #ef4444; /* Red */
--access-warning: #f59e0b; /* Amber */
```

### Typography
- **Headings**: Inter / Poppins (Bold)
- **Body**: Inter (Regular)
- **Monospace** (for usernames): JetBrains Mono

### Spacing & Layout
- **Container Max Width**: 1200px
- **Grid Gap**: 24px (desktop), 16px (mobile)
- **Card Padding**: 24px
- **Border Radius**: 12px (cards), 8px (buttons)

### Animations
```css
/* Card entrance */
@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Folder pop-out effect */
@keyframes popOut {
  0% {
    transform: scale(1) translateY(0);
  }
  50% {
    transform: scale(1.05) translateY(-10px);
  }
  100% {
    transform: scale(1.02) translateY(-5px);
  }
}

/* QR code pulse */
@keyframes qrPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
}
```

---

## 📱 Mobile Considerations

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-Specific Features

1. **Card Drop**
   - Full-screen modal on mobile
   - Native camera access
   - Vibration feedback on successful scan
   - Auto-brightness detection and adjustment

2. **Dashboard**
   - Single column layout
   - Swipe gestures for navigation
   - Bottom sheet for profile details
   - Sticky header with back button

3. **Profile Viewing**
   - Drawer-style save button (bottom)
   - Touch-optimized controls
   - Pull-to-refresh

---

## 🧪 Testing Strategy

### Unit Tests
- QR code generation logic
- Access control helpers
- Date/time utilities
- Data transformation functions

### Integration Tests
- API endpoint responses
- Database queries
- Authentication flows
- Mutual access creation

### E2E Tests

1. **Card Drop Flow**
   ```
   - User A clicks "Card Drop"
   - User A selects "Send Mode"
   - QR code generates
   - User B clicks "Card Drop"
   - User B selects "Receive Mode"
   - User B scans User A's QR
   - User B sees User A's profile
   - User B clicks "Save to Dashboard"
   - Both users now have mutual access
   ```

2. **Access Revocation Flow**
   ```
   - User A navigates to "Access Management"
   - User A sees User B in access list
   - User A clicks "Revoke Access" for User B
   - Confirmation modal appears with warning
   - User A confirms revocation
   - Both-way access is removed
   - User B's saved profile shows "Access Revoked"
   ```

3. **Dashboard Navigation**
   ```
   - User opens Dashboard
   - Sees folder with latest card preview
   - Clicks folder
   - Sees grid of all saved profiles
   - Clicks on a profile
   - Sees all cards for that user
   - Clicks a card
   - Views full profile
   ```

---

## 🔒 Privacy & Compliance

### GDPR Compliance
- [ ] Users can export their access data
- [ ] Users can delete all saved profiles
- [ ] Clear privacy policy for card sharing
- [ ] Consent required before saving profiles

### Data Retention
- Inactive card drop sessions: Delete after 30 minutes
- Revoked access records: Archive after 90 days
- Deleted user cleanup: Remove all access records

### User Control
- Make profile "unshareable"
- Disable QR code generation
- Private mode (profile not visible even with access)
- Bulk revoke access

---

## 📊 Analytics & Metrics

### Track These Metrics
1. **Engagement**
   - Daily active card drops
   - Average scans per session
   - Save rate (scans → saves)

2. **Growth**
   - Total profiles saved (cumulative)
   - New connections per week
   - Reactivation rate (returning users)

3. **Quality**
   - Access revocation rate
   - Profile view frequency
   - Dashboard engagement time

4. **Technical**
   - QR scan success rate
   - Camera permission grant rate
   - Session timeout rate

---

## 🎯 Success Criteria

### Must Have (MVP)
- ✅ Working QR code generation and scanning
- ✅ Mutual access creation
- ✅ Dashboard with saved profiles
- ✅ Access revocation
- ✅ Responsive design

### Should Have
- ✅ Access management interface
- ✅ Statistics and insights
- ✅ Search and filter profiles
- ✅ Tags and organization

### Nice to Have
- Bulk operations
- Profile export
- Advanced analytics
- Sharing recommendations
- NFC support (tap to share)

---

## 🛠️ Technology Stack

### Frontend
- **React** (with TypeScript)
- **TailwindCSS** (styling)
- **Framer Motion** (animations)
- **react-qr-code** (QR generation)
- **html5-qrcode** (QR scanning)
- **Zustand** (state management)

### Backend
- **Supabase** (database + auth)
- **PostgreSQL** (database)
- **Row Level Security** (access control)
- **Supabase Functions** (API endpoints)

### External Services
- **Screen Wake Lock API** (brightness control)
- **Vibration API** (haptic feedback)
- **Camera API** (QR scanning)

---

## 🚨 Risk Mitigation

### Potential Risks & Solutions

1. **Risk**: QR scanning fails in low light
   - **Solution**: Add manual username entry fallback

2. **Risk**: Users abuse card sharing (spam)
   - **Solution**: Rate limiting + report feature

3. **Risk**: Privacy concerns with mutual access
   - **Solution**: Clear UI warnings + granular controls

4. **Risk**: Database bloat with access records
   - **Solution**: Archive old records + cleanup jobs

5. **Risk**: Camera permissions denied
   - **Solution**: Guide users + alternative methods

6. **Risk**: User's using desktop cant scan QR code
   - **Solution**: Add manual username entry fallback

---

## 📝 Next Steps

### Immediate Actions
1. **Review & Approve** this plan
2. **Prioritize** features (MVP vs future)
3. **Assign** development resources
4. **Set timeline** for each phase
5. **Create** design mockups in Figma (optional)

### Questions to Answer
- Should card drop be available for all users or premium only?
- Maximum number of saved profiles per user?
- Should we support NFC in the future?
- Analytics: privacy-first or detailed tracking?

---

## 📚 References & Inspiration

### Similar Features
- **LinkedIn**: Connection system
- **Instagram**: QR code profile sharing
- **WhatsApp**: QR code contact sharing
- **Venmo**: QR code for payments

### Design Inspiration
- Apple Wallet card organization
- Google Contacts material design
- Notion database views
- iOS Files app folder structure

---

## 🎉 Conclusion

The **Card Dropping** feature transforms Patra from a static digital business card platform into a dynamic networking tool. By enabling instant profile sharing, organized management, and transparent access control, we empower users to build meaningful professional connections effortlessly.

This feature aligns with modern networking behaviors while maintaining strong privacy and security standards. The mutual access model ensures trust, while the dashboard provides organization at scale.

**Estimated Total Development Time**: 7 weeks  
**Team Required**: 2-3 developers + 1 designer  
**Priority**: High (differentiating feature)

---

**Document Version**: 1.0  
**Last Updated**: December 4, 2025  
**Author**: Antigravity AI  
**Status**: Awaiting Approval ⏳
