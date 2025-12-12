# Mobile Recharge Web Application — React + Vite Frontend

A modern frontend setup for a Mobile Recharge Web Application built with **React 19** and **Vite**, featuring core React concepts, reusable component architecture, and proper folder structuring.

---

## Project Overview

This project demonstrates a complete React + Vite setup with:
- ✅ Functional components (Navbar, Sidebar, Footer)
- ✅ Props and State management
- ✅ Component hierarchy and composition
- ✅ Proper folder structure (`src/components/`)
- ✅ Virtual DOM optimization
- ✅ JSX templating
- ✅ Fast refresh (HMR) during development
- ✅ Production-ready build configuration

---

## Core React Concepts — Learning Notes

### 1. JSX
JSX is a syntax extension for JavaScript that looks like HTML and is used to describe UI structure inside React components. Under the hood, JSX is transpiled into `React.createElement(...)` calls that produce virtual DOM elements. JSX supports embedding JavaScript expressions inside curly braces `{}` and allows passing props to components. It is not required but widely used because it makes component structure readable and concise.

### 2. Virtual DOM
The virtual DOM (VDOM) is an in-memory representation of the UI; React maintains it to optimize rendering. When component state or props change, React computes a diff between previous VDOM and new VDOM. Only the minimal set of real DOM updates required by that diff are applied, which improves performance. This approach reduces expensive direct DOM operations and makes UI updates predictable.

### 3. Functional Components
Functional components are plain JavaScript functions that return JSX and are the modern preferred component type. They can use React Hooks (e.g., `useState`, `useEffect`) to manage state and lifecycle logic. They are typically easier to read and test than class components and encourage composition. For presentational logic or small stateful pieces, functional components are lightweight and reusable.

### 4. Props & State
Props (short for properties) are read-only data passed from parent to child components to configure them. State is internal, mutable data local to a component (managed via Hooks like `useState`) that triggers re-renders when updated. Use props to make components reusable and state to manage UI changes over time (user input, async results). Keep state minimal and prefer lifting state up when multiple components must share it.

### 5. Component Hierarchy
Components are composed in a tree/hierarchy; parent components render children and pass props downward. Organize components by responsibility: pages/layouts at top, smaller widgets as leaves. Keep each component focused on a single responsibility to make the hierarchy easy to reason about. Favor composition (children/slots) over deep inheritance.

### 6. Folder Structuring
Keep source files under `src/`, group reusable UI components in `src/components/`. Split pages or routes into `src/pages/`, shared assets in `src/assets/`, and global styles in `src/styles/` or `src/index.css`. Use clear file naming (PascalCase for components) and keep components small and focused. This structure helps scale the project and makes onboarding easier.

---

## Project Structure

```
vite-project/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        ← Header/navigation (accepts title prop)
│   │   ├── Sidebar.jsx       ← Service menu (accepts items prop)
│   │   └── Footer.jsx        ← Footer (accepts company prop)
│   ├── assets/
│   │   └── react.svg
│   ├── App.jsx               ← Main app component (imports all 3 above)
│   ├── App.css               ← App-level styles
│   ├── index.css             ← Global styles
│   └── main.jsx              ← React entry point
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## Components

### Navbar.jsx
- **Type**: Functional component
- **Props**: `title` (string, default: "Mobile Recharge")
- **Features**: Navigation links (Home, Recharge, Plans), logo placeholder, gradient background
- **Usage**: `<Navbar title="My App" />`

### Sidebar.jsx
- **Type**: Functional component
- **Props**: `items` (array, default: ['Prepaid', 'Postpaid', 'DTH', 'Electricity'])
- **Features**: Service list, clickable links, styled box
- **Usage**: `<Sidebar items={['Custom1', 'Custom2']} />`

### Footer.jsx
- **Type**: Functional component
- **Props**: `company` (string, default: "Recharge Inc.")
- **Features**: Copyright year auto-updated, attribution
- **Usage**: `<Footer company="MyCompany Ltd." />`

All components are **reusable**, accept **custom props**, and return **meaningful JSX**. They are imported and composed inside `App.jsx`.

---

## Running the Project

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

**Output**: The app will start on **http://localhost:5174** (or the next available port).

Access it in your browser and you'll see:
- Navbar at the top (with "Mobile Recharge" title and navigation links)
- Sidebar on the left (with service options)
- Main content area (Vite + React logos and demo counter)
- Footer at the bottom (copyright notice)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

---

## How the Components Work Together

1. **App.jsx** (parent) imports all three components
2. **Navbar** renders at the top with custom or default title
3. **Sidebar** and main content area render side-by-side (flex layout)
4. **Footer** renders at the bottom with auto-updated copyright year

Each component can be reused in different pages/layouts by simply importing and using it with custom props.

---

## Key Features

- ⚡ **Fast Refresh (HMR)**: Changes reflect instantly in the browser
- 🎨 **Modern Styling**: Inline styles + CSS modules ready
- 📱 **Responsive Design**: Mobile-friendly layout
- 🧩 **Reusable Components**: Navbar, Sidebar, Footer can be used anywhere
- 🛠️ **ESLint Integration**: Code quality checks built-in
- 📦 **Production Ready**: Optimized build process with Vite

---

## Technologies Used

- **React 19.2** — UI library
- **Vite 7.2.5** — Frontend build tool & dev server
- **ESLint 9.39** — Code linting
- **Node.js** — JavaScript runtime

---

## Assignment Completion Checklist

✅ Set up React project using Vite  
✅ Run development server and verify setup  
✅ Explore and document project structure  
✅ Demonstrate understanding of 6 core React concepts  
✅ Create 3 reusable functional components: Navbar.jsx, Sidebar.jsx, Footer.jsx  
✅ Import and use all components in App.jsx  
✅ Return meaningful JSX from each component  
✅ Components accept custom props and are reusable across pages
