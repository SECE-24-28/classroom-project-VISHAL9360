# Mobile Recharge App (Day 5 Task)

A small front-end project that demonstrates fetching and displaying mobile recharge plans from a dummy API (MockAPI.io). This repo contains a minimal UI, data-fetching logic, and plan selection flow intended for a short hands-on exercise.

## Problem Statement
Integrate a dummy API using MockAPI.io to display recharge plans and allow a user to select a plan and proceed to a mock payment interaction.

## Objectives
- Create a dummy API with recharge plan data on MockAPI.io.
- Fetch data using JavaScript (fetch + async/await).
- Display plans dynamically using Tailwind CSS for styling.
- Implement user interaction for plan selection and a simple payment flow stub.

## Features
- Fetches recharge plans from a configurable MockAPI endpoint.
- Responsive plan grid built with Tailwind CSS.
- Plan selection and a simple confirmation/payment UI.

## Technologies
- HTML, CSS (Tailwind utility classes), JavaScript (ES6+)
- MockAPI.io for dummy REST endpoints

## Setup & How to Run
1. Clone or download this folder.
2. Create a MockAPI project and add a resource that contains recharge plan objects (fields: id, name, price, validity, benefits).
3. In `planselection.js`, replace the placeholder `<your-mockapi-project>` with your MockAPI endpoint URL. (This project includes an example import file `mockapi-plans.json` you can use as a starting point — see `mockapi-plans.json`.)
4. Open `index.html` in a browser (live-server or just double-click is fine).

## File structure
- `index.html` — main HTML file and UI skeleton
- `planselection.js` — JavaScript that fetches plans and handles user interactions
- `style.css` — any custom CSS (Tailwind utilities are used inline)
- `read.md` — this project README

## Usage
- Browse the list of plans.
- Click a plan to view details and choose to proceed to the mock payment.

## Notes & Tips
- Make sure CORS is allowed by MockAPI (it generally is for public mock endpoints).
- If plans don't appear, confirm the endpoint URL and that your resource returns JSON array of plan objects.

Created on: 2025-12-08

---

If you want, I can also:
- add a small CONTRIBUTING section,
- include an example MockAPI schema you can import,
- or create a minimal Live Server setup instructions.

Live Server / quick preview
- If you have the Live Server extension in VS Code, open the folder and click "Go Live" to serve `index.html` locally. Or simply open `index.html` in your browser.

Author: (optional) Your Name / Team