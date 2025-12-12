# Component Architecture Map

## Application Flow

```
App.jsx (Root Component)
│
├── AppProvider (Context Wrapper)
│   │
│   ├── Global State:
│   │   ├── theme (light/dark)
│   │   ├── user (authentication)
│   │   ├── cart (shopping cart)
│   │   ├── rechargeHistory (transactions)
│   │   └── notifications (toast messages)
│   │
│   └── Components Tree:
│       │
│       ├── Notifications (Toast System)
│       │   └── Uses: notifications, removeNotification
│       │
│       ├── Navbar (Navigation)
│       │   ├── Props: logo, showAuth
│       │   ├── State: mobileMenuOpen, profileDropdown
│       │   └── Uses: theme, toggleTheme, user, logoutUser, cart, notifications
│       │
│       ├── Hero (Landing Section)
│       │   ├── Props: title, subtitle, showAnimation
│       │   └── State: currentOffer (auto-rotating)
│       │
│       ├── RechargeForm (Main Feature)
│       │   ├── Props: operators
│       │   ├── State: formData, errors, isProcessing, showPlans
│       │   └── Uses: addRecharge, addNotification, user
│       │
│       ├── Offers (Deals Section)
│       │   ├── Props: title, showFilter
│       │   ├── State: selectedCategory, copiedCode
│       │   └── Uses: addNotification
│       │
│       ├── RechargeHistory (Transactions)
│       │   ├── Props: maxItems
│       │   ├── State: filter, searchTerm
│       │   └── Uses: rechargeHistory, user
│       │
│       ├── Features Section (Static)
│       │   └── Why Choose Us cards
│       │
│       ├── Operators Section (Static)
│       │   └── Supported operators grid
│       │
│       ├── Testimonials Section (Static)
│       │   └── User reviews
│       │
│       ├── Footer (Bottom Section)
│       │   ├── Props: companyName, showNewsletter
│       │   ├── State: email (newsletter)
│       │   └── Uses: addNotification
│       │
│       └── AuthModal (Login/Signup)
│           ├── Props: isOpen, onClose
│           ├── State: isLogin, formData, errors
│           └── Uses: loginUser, addNotification
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      AppContext (Global State)               │
├─────────────────────────────────────────────────────────────┤
│  State:                                                      │
│  • theme: 'light' | 'dark'                                  │
│  • user: { name, email, mobile, joinedDate } | null         │
│  • cart: Array<CartItem>                                    │
│  • rechargeHistory: Array<Recharge>                         │
│  • notifications: Array<Notification>                       │
│                                                              │
│  Actions:                                                    │
│  • toggleTheme()                                            │
│  • loginUser(userData)                                      │
│  • logoutUser()                                             │
│  • addToCart(item), removeFromCart(id), clearCart()        │
│  • addRecharge(recharge)                                    │
│  • addNotification(msg, type), removeNotification(id)      │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────┴─────────────────────┐
        ↓                     ↓                      ↓
┌──────────────┐    ┌──────────────┐      ┌──────────────┐
│   Navbar     │    │ RechargeForm │      │   History    │
├──────────────┤    ├──────────────┤      ├──────────────┤
│ Reads:       │    │ Reads:       │      │ Reads:       │
│ • theme      │    │ • user       │      │ • user       │
│ • user       │    │              │      │ • history    │
│ • cart       │    │ Writes:      │      │              │
│ • notifs     │    │ • addRecharge│      │ Filters:     │
│              │    │ • addNotif   │      │ • status     │
│ Actions:     │    │              │      │ • search     │
│ • toggleTheme│    │ Validates &  │      │              │
│ • logout     │    │ Submits Form │      │ Displays     │
└──────────────┘    └──────────────┘      │ Transactions │
                                           └──────────────┘
```

---

## Component Interaction Flow

### 1. User Login Flow
```
User clicks Login
    ↓
App.jsx sets showAuthModal = true
    ↓
AuthModal opens (isOpen prop)
    ↓
User fills form (local state: formData)
    ↓
Form validation (local state: errors)
    ↓
Submit → loginUser(userData) [Context Action]
    ↓
Context updates user state
    ↓
addNotification('Login successful') [Context Action]
    ↓
Navbar shows user profile (reads user from Context)
    ↓
AuthModal closes (onClose callback)
```

### 2. Recharge Flow
```
User fills RechargeForm
    ↓
Local state updates: formData
    ↓
Selects operator → showPlans = true
    ↓
Displays available plans (local state)
    ↓
User selects plan → updates formData
    ↓
Submit → Validation (local state: errors)
    ↓
isProcessing = true (local state)
    ↓
addRecharge(data) [Context Action]
    ↓
Context updates rechargeHistory
    ↓
addNotification('Recharge successful') [Context Action]
    ↓
RechargeHistory component auto-updates (reads from Context)
    ↓
Form resets (local state cleared)
```

### 3. Theme Toggle Flow
```
User clicks theme button in Navbar
    ↓
toggleTheme() [Context Action]
    ↓
Context updates theme state
    ↓
useEffect in Context updates localStorage
    ↓
useEffect adds/removes 'dark' class on document
    ↓
All components re-render with new theme
    ↓
Tailwind dark: classes apply automatically
```

### 4. Offer Copy Flow
```
User clicks Copy on Offers component
    ↓
handleCopyCode(code) [Local function]
    ↓
navigator.clipboard.writeText(code)
    ↓
setCopiedCode(code) [Local state]
    ↓
addNotification('Code copied') [Context Action]
    ↓
Button shows "✓ Copied" (conditional rendering)
    ↓
setTimeout → setCopiedCode(null) after 2s
```

---

## State Management Strategy

### Local State (useState)
**Use for**: Component-specific UI state
- Form inputs
- Toggle states (menus, dropdowns)
- Temporary UI feedback
- Filters and search

**Examples**:
- `mobileMenuOpen` in Navbar
- `formData` in RechargeForm
- `selectedCategory` in Offers
- `filter` in RechargeHistory

### Global State (Context)
**Use for**: Shared application state
- User authentication
- Theme preferences
- Shopping cart
- Transaction history
- Notifications

**Examples**:
- `user` - accessed by Navbar, RechargeForm, History
- `theme` - accessed by all components via Tailwind
- `notifications` - managed globally, displayed by Notifications component

---

## Props Flow

```
App.jsx (Parent)
    │
    ├─→ Navbar
    │   └─ logo="RechargeNow", showAuth=true
    │
    ├─→ Hero
    │   └─ title="...", subtitle="...", showAnimation=true
    │
    ├─→ RechargeForm
    │   └─ operators={[...]} (optional)
    │
    ├─→ Offers
    │   └─ title="...", showFilter=true
    │
    ├─→ RechargeHistory
    │   └─ maxItems=10
    │
    ├─→ Footer
    │   └─ companyName="...", showNewsletter=true
    │
    └─→ AuthModal
        └─ isOpen={state}, onClose={callback}
```

---

## Styling Architecture

```
index.css (Global Styles)
    │
    ├── @tailwind base
    ├── @tailwind components
    ├── @tailwind utilities
    │
    ├── CSS Variables
    │   ├── --primary
    │   ├── --secondary
    │   ├── --accent
    │   └── ...
    │
    ├── Custom Animations
    │   ├── @keyframes fadeIn
    │   ├── @keyframes slideIn
    │   └── @keyframes pulse
    │
    └── Utility Classes
        ├── .gradient-text
        ├── .glass
        └── .card-hover

Components use Tailwind classes:
    │
    ├── Layout: flex, grid, container
    ├── Spacing: p-4, m-2, gap-4
    ├── Colors: bg-indigo-500, text-white
    ├── Typography: text-2xl, font-bold
    ├── Effects: shadow-lg, rounded-xl
    ├── Responsive: md:grid-cols-2, lg:flex-row
    ├── Dark Mode: dark:bg-gray-800
    └── Transitions: transition-all, duration-300
```

---

## File Dependencies

```
main.jsx
    └─→ App.jsx
        ├─→ context/AppContext.jsx
        │   └─ Provides global state to all children
        │
        └─→ components/
            ├─→ Navbar.jsx (uses AppContext)
            ├─→ Hero.jsx
            ├─→ RechargeForm.jsx (uses AppContext)
            ├─→ Offers.jsx (uses AppContext)
            ├─→ RechargeHistory.jsx (uses AppContext)
            ├─→ Footer.jsx (uses AppContext)
            ├─→ AuthModal.jsx (uses AppContext)
            └─→ Notifications.jsx (uses AppContext)

All components import:
    └─→ index.css (Tailwind + custom styles)
```

---

## Summary

- **8 Components**: Each with specific responsibility
- **1 Context**: Centralized state management
- **Props**: Component customization and reusability
- **Local State**: UI-specific interactions
- **Global State**: Shared application data
- **Tailwind CSS**: Consistent, responsive styling
- **Clean Architecture**: Separation of concerns

This architecture ensures:
- Maintainability
- Reusability
- Scalability
- Performance
- Developer Experience
