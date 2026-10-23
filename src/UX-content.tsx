import { useState } from "react";

/* ---------- Types ---------- */
type Row = (string | number)[]
type Block =
  | { kind: "text"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "table"; head: string[]; rows: Row[] }
type Section = { title: string; blocks: Block[] }
type Topic = { id: string; group: string; title: string; description: string; intro: string; sections: Section[] }

/* ---------- Content (ux_written_process.txt, in English) ---------- */
const G1 = "UX Research Process"
const G2 = "UX Writing Standards"
const groups = [
  { name: G1, description: "The research activities in detail: interviews, personas, journey mapping, and user testing." },
  { name: G2, description: "How to write the words users read in an interface, plus the terminology agreed in the April 2026 review." },
]

const topics: Topic[] = [
  {
    id: "immersion", group: G1, title: "Immersion / Interview",
    description: "Interview principles and the 7 core questions.",
    intro: "Immersion/Interview is the crucial starting point of research. This stage aims to understand who the users are, how they work, and what they need from digital systems.",
    sections: [
      { title: "Interview principles", blocks: [{ kind: "list", items: [
        "Use open-ended questions — avoid yes/no questions.",
        "Listen more than you speak.",
        "Note not only the answers, but also body language and emotion.",
        "Validate your understanding by repeating back what you heard.",
        "Record the session with the interviewee's permission.",
      ] }] },
      { title: "Interview question guide", blocks: [{ kind: "table", head: ["No", "Question", "Purpose & probing"], rows: [
        [1, "Who are you and what is your role in the organization?", "Understand the specific responsibilities tied to operational processes."],
        [2, "What habits or routines do you follow when carrying out operational tasks?", "Uncover undocumented informal steps, frequency, and coordination style."],
        [3, "How do you currently carry out operational activities?", "Tools used, steps taken, and collaboration with other teams."],
        [4, "Why do you do this task, and why does it matter to the organization?", "Understand the motivation and business impact of each activity."],
        [5, "What is the hardest part of your current operational process?", "Identify bottlenecks, communication gaps, and unclear responsibilities."],
        [6, "How could the proposed application help you?", "User expectations of the digital solution."],
        [7, "What features or support do you expect from this application?", "Specific needs: ease of use, automation, tracking, integration, reporting."],
      ] }] },
    ],
  },
  {
    id: "persona", group: G1, title: "User Persona",
    description: "What a persona includes and how to document it.",
    intro: "A persona is a fictional but data-based representation of a user archetype. A good persona covers the user's background, goals, pain points, challenges, and real needs — not stereotypes or assumptions.",
    sections: [{ title: "Persona template", blocks: [{ kind: "list", items: [
      "Use the Figma template available in the Design System repository.",
      "Every use case must document at least 2–3 personas, based on different user roles.",
      "Personas must be validated by real interviewees before they are finalized.",
    ] }] }],
  },
  {
    id: "journey", group: G1, title: "User Journey Mapping",
    description: "High-level and low-level journeys, and the 5 required elements.",
    intro: "Journey maps show the user's path through the experience at two levels of detail.",
    sections: [
      { title: "Journey levels", blocks: [{ kind: "table", head: ["Level", "Description & use"], rows: [
        ["High-Level Journey", "The big picture of the user experience phases — shows emotions, main actions, and business impact per phase. Ideal for presentations to non-technical stakeholders."],
        ["Low-Level Journey", "Step-by-step detail per user role — shows specific actions, pain points, emotions, and the tool used at every step. Used as direct input to the wireframe."],
      ] }] },
      { title: "Required journey elements", blocks: [{ kind: "table", head: ["Element", "Description"], rows: [
        ["User Action Layer", "Actions users take at each stage (minimum 2 user roles)."],
        ["Emotions", "Emotion curve (frustrated → neutral → satisfied)."],
        ["Pain Points", "Specific problems that occur (red/yellow sticky notes)."],
        ["Business Impact", "The business impact of each unresolved pain point."],
        ["Opportunity", "Areas of opportunity for design intervention or new features."],
      ] }] },
    ],
  },
  {
    id: "testing", group: G1, title: "User Testing",
    description: "Formal validation and its 5 expected outcomes.",
    intro: "User testing is the formal validation stage before the design is finalized. Testing uses a wireframe or prototype with structured task scenarios.",
    sections: [{ title: "Expected outcomes", blocks: [{ kind: "table", head: ["Outcome", "Detail"], rows: [
      ["Ease of Use", "Confirm whether users can complete core tasks (upload plan, log milestone, submit EOD log) without confusion."],
      ["Adoption Drivers", "Whether in-app notifications and the dashboard are enough to replace reliance on WhatsApp/Excel."],
      ["Clarity of Roles", "Validate that authority boundaries (who uploads, confirms, logs) are clear in the flow."],
      ["Pain Point Coverage", "Whether the MVP features address the main frustrations: version control, missed updates, lack of traceability."],
      ["Feedback for Iteration", "Capture usability issues, missing needs, or enhancements to refine before the final build."],
    ] }] }],
  },
  {
    id: "principles", group: G2, title: "UX Writing Principles",
    description: "The 5 principles for clear interface text.",
    intro: "UX Writing is the craft of writing the text that appears inside digital product interfaces — every word users read and interact with in an app or dashboard. Good UX writing makes users feel guided, not confused.",
    sections: [{ title: "Five principles", blocks: [{ kind: "table", head: ["#", "Principle", "Application"], rows: [
      ["01", "Clear", "Use easy-to-understand words. Avoid technical jargon. Write for the audience, not for developers."],
      ["02", "Concise", "Use as few words as possible. Remove words that add no meaning."],
      ["03", "Useful", "Every text must help users make a decision or take an action."],
      ["04", "Consistent", "Use the same terminology for the same thing across the platform."],
      ["05", "Descriptive", "Labels must describe content or function — not generic names like 'Data' or 'Info'."],
    ] }] }],
  },
  {
    id: "terms", group: G2, title: "Agreed Terminology",
    description: "12 findings and the terminology changes agreed in review.",
    intro: "Findings from the internal UI/UX Review Session (April 2026), with the terminology changes that were agreed and need to be applied across the whole platform.",
    sections: [
      { title: "Findings and agreed changes", blocks: [{ kind: "table", head: ["No", "Finding", "Agreed change", "Priority"], rows: [
        [1, "The main page label is inconsistent.", "Use \"Overview\" as the standard name for the main page.", "High"],
        [2, "The monitoring label does not clearly describe its function.", "Use \"Alert Monitoring\" as the label for the monitoring / exception management page.", "High"],
        [3, "The explainability page name is not standardized.", "Use \"Model Explainability\" as the official label for that page.", "Medium"],
        [4, "\"Last Period\" is ambiguous and confuses users.", "Replace with \"Start Date – End Date\" so the time filter is explicit.", "High"],
        [5, "The usefulness of the Download button needs review.", "Remove the Download button from the current view; review the context of use.", "Medium"],
        [6, "\"Recent Status\" does not accurately reflect the table content.", "Replace with \"Status\" in a clear table format.", "High"],
        [7, "Content mixes Bahasa Indonesia and English.", "Standardize all content in English, consistently.", "High"],
        [8, "Font sizes are not standardized across pages.", "Set a font size standard: Title, Heading, Body, Menu, Sub-menu, Table Content, with Bold/Medium/Regular variants.", "High"],
        [9, "The search placeholder is uninformative (just \"Search\").", "Use the placeholder \"Search by...\" so users know which attributes are searchable.", "Medium"],
        [10, "Subtitles under component titles make the layout feel busy.", "Remove subtitles; use an information icon (ⓘ) for contextual notes instead.", "Medium"],
        [11, "\"Reset\" does not describe the scope of the action.", "Replace with \"Reset Filter\" or \"Default\" for clarity.", "Medium"],
        [12, "Summary cards have no clear filter label.", "Add a label to summary cards to give the data more context.", "Medium"],
      ] }] },
      { title: "Follow-up", blocks: [{ kind: "text", text: "The agreed terminology will be updated in the Design System / Component Library and the UI Guideline by the Pertamina Digital Hub UI/UX team." }] },
    ],
  },
]

/* Landing-page explanation section: [step, description] */
const flow: [string, string][] = [
  ["Immersion", "Qualitative data collection through immersion/interviews and focus group discussions to understand users' operational context."],
  ["Business Process Mapping", "Visualizing the as-is business process flow to identify bottlenecks, pain points, and digitalization opportunities."],
  ["User Personas", "Building user archetypes from valid research data, not assumptions."],
  ["User Journey Mapping", "Mapping user journeys (high-level and low-level) to understand emotions, actions, and pain points at each stage."],
  ["Storyboard", "A visual narrative showing product usage scenarios in real contexts."],
  ["Sitemap", "Information architecture showing the hierarchical structure of pages and features."],
  ["Workflow Diagram", "Detailed workflow per user role, including decision points and edge cases."],
  ["Wireframe", "Low-fidelity prototypes to validate content structure and navigation flow before the final UI design."],
  ["User Testing", "Formal design validation with real users using structured task scenarios."],
]

const topicsIn = (group: string) => topics.filter((t) => t.group === group)

/* ---------- Icons & helpers ---------- */
const Icon = ({ d }: { d: string }) => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
    <path d={d} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
)
const BackIcon = () => <Icon d="m12 5-5 5 5 5" />
const ArrowIcon = () => <Icon d="M4 10h12m-5-5 5 5-5 5" />
const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

/* ---------- Static content blocks ---------- */
function BlockView({ block }: { block: Block }) {
  if (block.kind === "text") return <p className="detail-copy max-w-3xl">{block.text}</p>

  if (block.kind === "list") {
    const Tag = block.ordered ? "ol" : "ul"
    return (
      <div className="implementation-card">
        <Tag className="grid gap-3">
          {block.items.map((item) => <li className="implementation-step" key={item}><span aria-hidden="true" />{item}</li>)}
        </Tag>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#cfe1ee] bg-white" tabIndex={0}>
      <table className="w-full min-w-[34rem] text-left text-sm leading-6 text-[#49647d]">
        <thead>
          <tr>{block.head.map((h) => <th className="bg-[#e7f3fc] px-4 py-3 text-xs font-bold text-[#082542]" key={h} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={String(row[0]) + String(row[1])}>
              {row.map((cell, i) => {
                const label = block.head[i]
                if (label === "Priority")
                  return (
                    <td className="border-t border-[#e2edf4] px-4 py-3 align-top" key={i}>
                      <span className="rounded-full px-2.5 py-1 text-xs font-bold text-[#082542]" style={{ background: cell === "High" ? "var(--color-error)" : "var(--color-warning)" }}>{cell}</span>
                    </td>
                  )
                return i === 0
                  ? <th className="border-t border-[#e2edf4] px-4 py-3 align-top font-semibold text-[#082542]" key={i} scope="row">{cell}</th>
                  : <td className="border-t border-[#e2edf4] px-4 py-3 align-top" key={i}>{cell}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------- Level 1: groups ---------- */
function Landing({ onBack, onPick }: { onBack: () => void; onPick: (group: string) => void }) {
  return (
    <main className="min-h-screen bg-[#f7faff] text-[#09233f]">
      <header className="mx-auto max-w-[1480px] px-5 pt-8 pb-11 sm:px-8 sm:pt-12 lg:px-12 lg:pt-16 lg:pb-16">
        <button className="back-button mb-8" onClick={onBack} type="button"><BackIcon />All guidebooks</button>
        <p className="toolkit-eyebrow">UX Guidelines</p>
        <div className="mt-8 max-w-4xl">
          <h1 className="max-w-4xl text-5xl leading-[0.98] font-semibold tracking-[-0.055em] text-[#082542] sm:text-6xl lg:text-[5.4rem]">UX research and writing, explained.</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#49647d]">
            Start with how the research flow works, then pick a group to read its full guidance on one page.
          </p>
        </div>
      </header>

      <section aria-label="UX groups" className="mx-auto max-w-[1480px] px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
        <div className="mb-8 border-t border-[#bfd8eb] pt-10">
          <p className="toolkit-eyebrow">Topics</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#082542] sm:text-4xl">Choose a group to begin.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {groups.map((group, index) => (
            <article className="guidebook-card guidebook-card-ux group" key={group.name}>
              <button aria-label={`Open ${group.name}`} className="guidebook-card-link" onClick={() => onPick(group.name)} type="button" />
              <div className="guidebook-visual">
                <span className="guidebook-code">UX</span>
                <span className="guidebook-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="guidebook-orbit" />
              </div>
              <div className="mt-7 flex items-start justify-between gap-4">
                <div>
                  <span className="guidebook-status guidebook-status-ui">{topicsIn(group.name).length} topics</span>
                  <h2 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-[#082542]">{group.name}</h2>
                </div>
                <span className="landing-arrow"><ArrowIcon /></span>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#5a7186]">{group.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {topicsIn(group.name).map((t) => <span className="capability-tag" key={t.id}>{t.title}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

    </main>
  )
}

/* ---------- Topic page: side panel + static content ---------- */
function TopicPage({ topic, onBackToGroups, onSwitch }: { topic: Topic; onBackToGroups: () => void; onSwitch: (topicId: string) => void }) {
  const siblings = topicsIn(topic.group)
  return (
    <main className="min-h-screen bg-[#f7faff] text-[#09233f]">
      <header className="border-b border-[#d7e7f2] bg-white">
        <div className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <button className="back-button" onClick={onBackToGroups} type="button"><BackIcon />Back to groups</button>
          <div className="mt-9 max-w-4xl">
            <p className="toolkit-eyebrow">{topic.group}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-[#082542] sm:text-5xl">{topic.title}</h1>
            <p className="detail-copy mt-5">{topic.intro}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1480px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-12 lg:py-12">
        <nav aria-label={`${topic.group} topics`} className="filter-panel">
          <h2 className="filter-category-title">{topic.group}</h2>
          <div className="mt-4 grid gap-2">
            {siblings.map((t) => (
              <label className="product-option" key={t.id}>
                <input checked={t.id === topic.id} name="ux-topic" onChange={() => onSwitch(t.id)} type="radio" value={t.id} />
                <span className="w-full">{t.title}</span>
              </label>
            ))}
          </div>
        </nav>

        <div className="grid content-start gap-12">
          {topic.sections.map((section, i) => (
            <section key={section.title}>
              <div className="flex items-center gap-4 border-b border-[#cfe1ee] pb-4">
                <span className="product-accordion-number">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#082542]">{section.title}</h2>
              </div>
              <div className="mt-6 grid gap-4">
                {section.blocks.map((block, j) => <BlockView block={block} key={j} />)}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

/* ---------- Entry: group card → topic page (side panel switches topics) ---------- */
export default function UXContent({ onBack }: { onBack: () => void }) {
  const [topicId, setTopicId] = useState<string | null>(null)
  const topic = topics.find((t) => t.id === topicId)

  if (topic)
    return <TopicPage onBackToGroups={() => { setTopicId(null); scrollTop() }} onSwitch={(id) => { setTopicId(id); scrollTop() }} topic={topic} />

  return <Landing onBack={onBack} onPick={(group) => { setTopicId(topicsIn(group)[0]?.id ?? null); scrollTop() }} />
}