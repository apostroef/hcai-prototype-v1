PERTAMINA DIGITAL HUB GUIDELINES
================================

Overview
--------
This web application is a guidebook hub for exploring Pertamina Digital Hub
design, UX, and human-centered AI (HCAI) guidance.

The application contains:

- HCAI Design Library
- UI Guidelines
- UX Flow guidance
- Floating Pertamina Copilot chatbot


Opening the Web App
-------------------
When the app opens, the landing page displays the available guidebooks.

Select a guidebook card to open it:

- HCAI Design Library
- UI Guidelines
- UX Flow

Use the back navigation provided at the top of each page to return to the
previous guidebook level or the main page.


UI Guidelines
-------------
The UI Guidelines area is organized into categories:

- Identity
- Design Standards
- UI Patterns

Breadcrumb navigation
~~~~~~~~~~~~~~~~~~~~~
When viewing a UI guideline page, the header displays breadcrumbs:

    All guidebooks > [Category]

Select the category breadcrumb to open a dropdown and switch between:

- Identity
- Design Standards
- UI Patterns

Page navigation
~~~~~~~~~~~~~~~
Categories with multiple pages display a side navigation rail instead of an
accordion. For example, Design Standards contains:

- Color System
- Typography
- Iconography

Select a page in the side rail to switch pages.

On this page
~~~~~~~~~~~~
The active page contains an indented "On this page" subsection with links to
its sections.

For example, Color System contains:

- Palette
- Color usage by function
- Color tokens

Select a section link to jump directly to that section.


UX Flow
-------
The UX Flow guidebook contains UX process topics and supporting guidance.

Select a topic from the available navigation to view its:

- Description
- Introduction
- Process sections
- Supporting lists and tables

Use the back button to return to the UX Flow landing view or the main
guidebook hub.


HCAI Design Library
-------------------
The HCAI Design Library can be filtered by:

- Goals
- Guidelines
- Principles
- Product context
- Capabilities

Multiple filters can be selected at the same time. Matching feature examples
are displayed in the results area.

Use "Clear all" to remove active filters.

Select a guideline or feature example to view additional details.


Pertamina Copilot
-----------------
The Copilot is a dummy chatbot interface for demonstrating how an assistant
could support users while they browse the guidebooks.

Opening the Copilot
~~~~~~~~~~~~~~~~~~~
Select the floating Copilot icon in the bottom-right corner of the screen.

The chat drawer includes:

- Pertamina Copilot identity and status
- Knowledge and context pills:
  - UI Guidelines
  - UX Flow
  - HCAI
- HCAI-focused starter questions
- Message composer
- Send button

Starter questions
~~~~~~~~~~~~~~~~~
Example questions include:

- How do I achieve a reliable design for a Dashboard AI product?
- What HCAI principles should guide an AI dashboard?
- How can I make an AI product feel trustworthy and easy to use?

Select a starter question to place it in the message composer.

Sending messages
~~~~~~~~~~~~~~~~
Type a message into the composer and select the send button.

You can also press Enter to send a message. Use Shift+Enter to create a new
line.

The chatbot is currently a visual and interaction prototype. It does not
connect to a real AI service, retrieve live knowledge, or generate actual
answers.

Expanded Copilot mode
~~~~~~~~~~~~~~~~~~~~~
Select the expand icon in the Copilot header to enlarge the experience.

On desktop screens, expanded mode changes the layout to:

- Guidebook content on the left
- A full-height Copilot panel on the right

This allows the user to browse the guidebook while keeping the Copilot panel
visible.

Select the collapse icon to return to the compact floating drawer.
Select the close button, the floating Copilot icon, or press Escape to close
the chat.

On small screens, the Copilot remains a responsive overlay so that it fits
within the viewport.


Local Development
-----------------
Requirements:

- Node.js
- npm

Install dependencies:

    npm install

Start the development server:

    npm run dev

Create a production build:

    npm run build

Preview the production build:

    npm run preview

Format the project:

    npm run format


Project Entry Points
--------------------

- src/main.tsx
  React entry point that mounts the application.

- src/App.tsx
  Main application routing, landing pages, HCAI library, and Copilot chat.

- src/UI-content.tsx
  UI Guidelines content, breadcrumb navigation, page rail, and section links.

- src/UX-content.tsx
  UX Flow content and topic navigation.

- src/index.css
  Global styles, responsive layout, UI guideline navigation, and Copilot
  styling.


Notes
-----
- The application is a client-side React application.
- Page navigation is handled in application state rather than a server-side
  router.
- Copilot content is dummy content intended for interface demonstration.
- The application uses React, Vite, Tailwind CSS, TypeScript, and oxfmt.
