<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pertamina Digital Hub Guidelines</title>
</head>
<body>

    <h1>Pertamina Digital Hub Guidelines</h1>
    <p>This web application is a central hub for exploring Pertamina's design, UX, and Human-Centered AI (HCAI) guidelines.</p>

    <h2>📚 Guidebooks</h2>
    <p>Navigate the app using the main landing page to access three core libraries:</p>
    <ul>
        <li><strong>HCAI Design Library:</strong> Search and filter AI guidelines by goals, context, and capabilities.</li>
        <li><strong>UI Guidelines:</strong> Browse Identity, Design Standards, and UI Patterns (includes breadcrumb and side-rail navigation).</li>
        <li><strong>UX Flow:</strong> Step-by-step UX processes and supporting documentation.</li>
    </ul>

    <h2>🤖 Pertamina Copilot</h2>
    <p>A prototype chatbot located in the bottom-right corner to help users browse the guidebooks.</p>
    <ul>
        <li>Includes context pills and starter questions (e.g., "How do I achieve a reliable design?").</li>
        <li>Supports an expanded side-by-side desktop view.</li>
        <li><em>Note: This is currently a visual prototype and does not connect to a live AI backend.</em></li>
    </ul>

    <h2>💻 Local Development</h2>
    <p>Requires Node.js and npm. Run the following commands in your terminal:</p>
    <pre><code>
npm install      <!-- Install dependencies -->
npm run dev      <!-- Start development server -->
npm run build    <!-- Create production build -->
npm run preview  <!-- Preview production build -->
npm run format   <!-- Format the project files -->
    </code></pre>

    <h2>📂 Project Structure & Tech Stack</h2>
    <ul>
        <li><code>src/main.tsx</code> & <code>src/App.tsx</code>: Main entry points, state-based routing, and layout.</li>
        <li><code>src/UI-content.tsx</code> & <code>src/UX-content.tsx</code>: Content data for the guidebooks.</li>
        <li><code>src/index.css</code>: Global styles and responsive layouts.</li>
        <li><strong>Stack:</strong> Client-side React, Vite, Tailwind CSS, TypeScript, and oxfmt.</li>
    </ul>

</body>
</html>
