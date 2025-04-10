# **App Name**: GhostType

## Core Features:

- Stealth Modal UI: Create a draggable, transparent modal that can be toggled with a hotkey (Ctrl + Shift + A).
- AI-Powered Responses: Integrate the Gemini API to generate responses based on user input in the text area. The AI model acts as a coding assistant tool.
- Auto-Scroll: Implement auto-scrolling to the latest response in the modal to keep the most recent information in view.
- Screen Sharing Stealth: Ensure the modal is not detectable during screen sharing. (Native screenshot hook)

## Style Guidelines:

- Primary color: Use a dark, muted color (e.g., #2D3748) for the background to enhance the 'stealth' feel.
- Secondary color: Light gray (#A0AEC0) for text to ensure readability against the dark background.
- Accent: Teal (#4DC0B5) for interactive elements like buttons and the submit area to draw attention without being too obvious.
- Maintain a clean and minimal layout to avoid clutter and ensure focus on the AI responses.
- Use subtle fade-in animations for the AI responses to provide a smooth user experience.
- Use simple, outlined icons from a set like Lucide to maintain a clean and unobtrusive look.

## Original User Request:
Project: StealthCoder – Your Invisible AI Interview Buddy
🔥 Concept Summary
A local AI assistant that opens as a transparent, draggable modal.
User can type questions, get instant AI-generated responses, and screen sharing won't show the modal.
Tech Stack
Layer	Tools / Stack
🧠 AI	Gemini api
⚙️ Backend	None (local logic only, API calls)
🧩 Frontend	React + Tailwind + shadcn/ui
📦 Build Tool	Vite or Next.js (App Router)
💾 Storage	Firebase Hosting (for repo preview)

stealthcoder/
├── public/
├── src/
│   ├── components/
│   │   └── Modal.jsx
│   ├── hooks/
│   │   └── useDraggable.js
│   ├── App.jsx
│   ├── main.jsx
│   └── api.js  // Handles the API call to AI
├── .env
├── index.html
├── package.json
└── README.md
📐 Features
🟢 Modal UI
Draggable

Toggle with hotkey (Ctrl + Shift + A)

Styled with shadcn/ui or Tailwind

🧠 AI Logic
Text area → submit → fetches AI response

Powered by Gemini

Auto-scrolls to latest response

🧊 Stealth Mode
backdrop-filter: blur(5px);

opacity: 0.9;

Use window.setAlwaysOnTop() in Electron (optional for native app)

Modal stays out of screen-sharing detection (Electron route or native screenshot hook)
  