# 🧪 Testing Guide - Mobile Recharge Application

## Quick Start

The application is currently running at: **http://localhost:5173/**

Open your browser and navigate to the URL to see the application in action!

---

## 🎯 Feature Testing Checklist

### 1. Tailwind CSS & Responsive Design

#### Desktop View (1920x1080)
- [ ] Check gradient backgrounds on Hero section
- [ ] Verify smooth animations on page load
- [ ] Hover over cards to see elevation effects
- [ ] Check navigation bar layout
- [ ] Verify footer multi-column layout

#### Tablet View (768px)
- [ ] Resize browser to tablet width
- [ ] Check grid layouts adjust (2 columns)
- [ ] Verify navigation remains functional
- [ ] Test form layout responsiveness

#### Mobile View (375px)
- [ ] Resize to mobile width
- [ ] Click hamburger menu icon (☰)
- [ ] Verify mobile menu slides in
- [ ] Check single-column layouts
- [ ] Test form usability on mobile

#### Dark Mode
- [ ] Click moon icon (🌙) in navbar
- [ ] Verify entire app switches to dark theme
- [ ] Check all sections have proper dark colors
- [ ] Click sun icon (☀️) to switch back
- [ ] Verify theme persists on page reload

---

### 2. Props Testing

#### Test Different Props Values

**Navbar Component**:
```javascript
// Try changing in App.jsx:
<Navbar logo="MyRecharge" showAuth={false} />
```
- [ ] Logo text changes
- [ ] Auth button disappears when showAuth=false

**Hero Component**:
```javascript
<Hero 
  title="Custom Title"
  subtitle="Custom Subtitle"
  showAnimation={false}
/>
```
- [ ] Title and subtitle update
- [ ] Offer rotation stops when showAnimation=false

**Offers Component**:
```javascript
<Offers title="Special Deals" showFilter={false} />
```
- [ ] Title changes
- [ ] Category filters hide when showFilter=false

**RechargeHistory Component**:
```javascript
<RechargeHistory maxItems={5} />
```
- [ ] Only 5 items display (after making recharges)

---

### 3. State Management (useState) Testing

#### Navbar State
- [ ] Click hamburger menu → menu opens
- [ ] Click again → menu closes
- [ ] Click profile icon → dropdown appears
- [ ] Click outside → dropdown closes

#### Hero State
- [ ] Watch offer banner rotate every 3 seconds
- [ ] Verify smooth transitions between offers
- [ ] Check 4 different offers cycle

#### RechargeForm State
- [ ] Type in mobile number field
- [ ] Select an operator (Jio/Airtel/Vi/BSNL)
- [ ] Verify plans appear after operator selection
- [ ] Select a circle from dropdown
- [ ] Click quick amount buttons
- [ ] Type custom amount
- [ ] Click a plan card
- [ ] Verify form data updates in real-time

#### Offers State
- [ ] Click "Cashback" filter
- [ ] Verify only cashback offers show
- [ ] Click "Discount" filter
- [ ] Click "All Offers" to reset
- [ ] Click "Copy" on a coupon code
- [ ] Verify button shows "✓ Copied"
- [ ] Wait 2 seconds → button resets

#### RechargeHistory State
- [ ] Click "Completed" filter
- [ ] Click "Pending" filter
- [ ] Type mobile number in search
- [ ] Verify filtered results

#### AuthModal State
- [ ] Click "Login" button in navbar
- [ ] Modal opens
- [ ] Click "Sign Up" link
- [ ] Form switches to signup mode
- [ ] Click "Login" link
- [ ] Form switches back
- [ ] Click X button → modal closes

#### Footer State
- [ ] Type email in newsletter field
- [ ] Click Subscribe
- [ ] Verify notification appears

---

### 4. Context API Testing

#### Theme Context
- [ ] Toggle dark mode in navbar
- [ ] Verify all components update
- [ ] Reload page
- [ ] Verify theme persists (localStorage)

#### User Context
**Login Flow**:
- [ ] Open auth modal
- [ ] Fill in email: test@example.com
- [ ] Fill in password: password123
- [ ] Click Login
- [ ] Verify success notification
- [ ] Check navbar shows user profile
- [ ] Verify profile dropdown shows user info

**Logout Flow**:
- [ ] Click profile dropdown
- [ ] Click Logout
- [ ] Verify user profile disappears
- [ ] Verify Login button reappears

#### Recharge History Context
**Create Recharge**:
- [ ] Fill recharge form completely:
  - Mobile: 9876543210
  - Operator: Jio
  - Circle: Delhi NCR
  - Amount: 299
- [ ] Click "⚡ Recharge Now"
- [ ] Verify success notification
- [ ] Scroll to History section
- [ ] Verify new recharge appears
- [ ] Check statistics updated

**Persistence**:
- [ ] Make a recharge
- [ ] Reload page
- [ ] Verify recharge still in history (localStorage)

#### Notifications Context
- [ ] Copy a coupon code → notification appears
- [ ] Subscribe to newsletter → notification appears
- [ ] Submit recharge → notification appears
- [ ] Verify notifications auto-dismiss after 3s
- [ ] Click X on notification → dismisses immediately
- [ ] Verify max 5 notifications show at once

#### Cart Context (if implementing)
- [ ] Add item to cart
- [ ] Check cart badge updates
- [ ] Verify cart count increases

---

### 5. Form Validation Testing

#### Mobile Number Validation
- [ ] Leave empty → shows "Mobile number is required"
- [ ] Type "123" → shows "Invalid mobile number"
- [ ] Type "5123456789" → shows error (must start with 6-9)
- [ ] Type "9876543210" → no error ✓

#### Email Validation (Auth Modal)
- [ ] Leave empty → shows "Email is required"
- [ ] Type "invalid" → shows "Invalid email address"
- [ ] Type "test@example.com" → no error ✓

#### Password Validation (Auth Modal)
- [ ] Leave empty → shows "Password is required"
- [ ] Type "123" → shows "Password must be at least 6 characters"
- [ ] Type "password123" → no error ✓

#### Operator Selection
- [ ] Submit without selecting → shows "Please select an operator"
- [ ] Select operator → error clears

#### Circle Selection
- [ ] Submit without selecting → shows "Please select a circle"
- [ ] Select circle → error clears

#### Amount Validation
- [ ] Leave empty → shows "Please enter or select an amount"
- [ ] Type "5" → shows "Minimum recharge amount is ₹10"
- [ ] Type "100" → no error ✓

---

### 6. User Interaction Testing

#### Smooth Animations
- [ ] Page load → elements fade in sequentially
- [ ] Hover over cards → elevate with shadow
- [ ] Click buttons → smooth color transitions
- [ ] Open modals → fade in animation
- [ ] Mobile menu → slide in from left

#### Accessibility
- [ ] Tab through form fields
- [ ] Verify focus indicators visible
- [ ] Test keyboard navigation
- [ ] Check ARIA labels on buttons

#### Performance
- [ ] Check page loads quickly
- [ ] Verify smooth scrolling
- [ ] No lag when typing in forms
- [ ] Animations run at 60fps

---

### 7. Component Integration Testing

#### Full User Journey
1. **Landing**:
   - [ ] Page loads with hero section
   - [ ] Offers rotate automatically
   - [ ] Stats display correctly

2. **Authentication**:
   - [ ] Click Login
   - [ ] Switch to Sign Up
   - [ ] Fill form and submit
   - [ ] Verify login successful

3. **Recharge**:
   - [ ] Scroll to recharge form
   - [ ] Fill all fields
   - [ ] Select a plan
   - [ ] Submit recharge
   - [ ] Verify success

4. **Browse Offers**:
   - [ ] Scroll to offers section
   - [ ] Filter by category
   - [ ] Copy coupon code
   - [ ] Verify notification

5. **View History**:
   - [ ] Scroll to history section
   - [ ] See recent recharge
   - [ ] Filter by status
   - [ ] Search by number

6. **Newsletter**:
   - [ ] Scroll to footer
   - [ ] Enter email
   - [ ] Subscribe
   - [ ] Verify notification

7. **Theme Toggle**:
   - [ ] Switch to dark mode
   - [ ] Verify entire journey works in dark mode

---

### 8. Edge Cases Testing

#### Empty States
- [ ] View history without login → shows login prompt
- [ ] View history with no recharges → shows empty state
- [ ] Filter offers with no results → shows "No offers" message

#### Error Handling
- [ ] Submit form with all fields empty
- [ ] Verify all error messages show
- [ ] Fill one field → verify that error clears
- [ ] Submit invalid data → verify validation

#### Boundary Testing
- [ ] Type 11-digit mobile number → only accepts 10
- [ ] Make 10+ recharges → verify maxItems works
- [ ] Create 10+ notifications → only shows 5

---

### 9. Browser Compatibility

Test in different browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

---

### 10. LocalStorage Testing

#### Theme Persistence
- [ ] Toggle dark mode
- [ ] Reload page
- [ ] Verify still in dark mode

#### User Persistence
- [ ] Login
- [ ] Reload page
- [ ] Verify still logged in

#### History Persistence
- [ ] Make recharge
- [ ] Reload page
- [ ] Verify recharge in history

#### Clear Storage
- [ ] Open DevTools → Application → LocalStorage
- [ ] Clear all
- [ ] Reload page
- [ ] Verify app resets to defaults

---

## 🐛 Known Features to Test

### Context API Features
1. **Global theme** - used by all components
2. **User authentication** - shared across Navbar, Form, History
3. **Notifications** - triggered from multiple components
4. **Recharge history** - persisted and displayed
5. **Cart** - badge updates in navbar

### Props Features
1. **Dynamic branding** - change logo/company name
2. **Conditional rendering** - showAuth, showFilter, showNewsletter
3. **Content customization** - titles, subtitles
4. **Behavior control** - showAnimation, maxItems

### State Features
1. **Form management** - real-time validation
2. **UI toggles** - menus, dropdowns, modals
3. **Filters** - category, status, search
4. **Temporary feedback** - copied, processing

---

## 📸 Visual Checklist

Take screenshots of:
- [ ] Light mode homepage
- [ ] Dark mode homepage
- [ ] Mobile responsive view
- [ ] Recharge form with validation errors
- [ ] Offers section with filters
- [ ] History section with data
- [ ] Auth modal (login & signup)
- [ ] Notifications appearing
- [ ] Profile dropdown
- [ ] Mobile menu open

---

## ✅ Success Criteria

Your testing is complete when:
- ✅ All Tailwind styles render correctly
- ✅ All props change component behavior
- ✅ All useState hooks update UI
- ✅ Context API shares state globally
- ✅ Forms validate properly
- ✅ Animations run smoothly
- ✅ Responsive on all screen sizes
- ✅ Dark mode works perfectly
- ✅ LocalStorage persists data
- ✅ No console errors

---

## 🎉 Congratulations!

If all tests pass, you have successfully implemented:
- ✅ Tailwind CSS with custom utilities
- ✅ Props for dynamic components
- ✅ useState for local state management
- ✅ Context API for global state
- ✅ Complete component architecture
- ✅ Professional UI/UX

**Day 7 Assignment: COMPLETE! 🚀**
