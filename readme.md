# HCAI Prototype

## Key Features

This guidebook hub is divided into four main sections, accessible right from the landing page:

*   **🎨 UI Guidelines:** Explore Identity, Design Standards (like Colors & Typography), and UI Patterns. Navigate easily using breadcrumbs, side-rails, and page-specific section links.
*   **🗺️ UX Flow:** Discover UX process topics, introductions, and supporting guidance tables.
*   **🧠 HCAI Design Library:** Search and filter human-centered AI guidelines by Goals, Principles, Product context, or Capabilities. 
*   **🤖 Pertamina Copilot (Demo):** A floating, responsive chatbot prototype located in the bottom-right corner. *Note: This is currently a visual UI prototype and does not connect to a live AI backend.*

## 🚀 Local Development

To get this project running on your local machine, ensure you have **Node.js** and **npm** installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

### 3. Build & Preview
```bash
# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

### 4. Format Code
```bash
npm run format
```

## 📁 Project Structure

Here are the main entry points and structural files for the project:

*   `src/main.tsx` - React entry point that mounts the application.
*   `src/App.tsx` - Main application state routing, landing pages, HCAI library, and Copilot chat.
*   `src/UI-content.tsx` - Contains UI Guidelines content and navigation logic.
*   `src/UX-content.tsx` - Contains UX Flow content and topic navigation.
*   `src/index.css` - Global styles, responsive layouts, and Copilot styling.

## 🛠️ Tech Stack & Notes
*   **Built with:** React, Vite, Tailwind CSS, TypeScript, and oxfmt.
*   **Architecture:** This is a fully client-side React application. Page navigation is handled via application state rather than a server-side router.
*   **Demo Content:** The Copilot chatbot utilizes dummy content intended for interface demonstration purposes only.
