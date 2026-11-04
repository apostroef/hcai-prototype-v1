import { useEffect, useState, type ReactNode } from "react"

import ArrowIcon from "./arrow-icon"

import UIContent from "./UI-content"

import UXContent from "./UX-content"

import dashboardContextAvoidImage from "../assets/06498.png"
import feedbackDoImage from "../assets/84f61.png"
import dashboardUsabilityDoImage from "../assets/85016.png"
import contextAvoidImage from "../assets/9b335.png"
import dashboardUsabilityAvoidImage from "../assets/a4ba4.png"
import contextDoImage from "../assets/ad8ba.png"
import feedbackAvoidImage from "../assets/b1dea.png"
import dashboardContextDoImage from "../assets/bd38a.png"
import usabilityAvoidImage from "../assets/c357f.png"
import usabilityDoImage from "../assets/e4642.png"

type Guideline = {
  id: string

  title: string

  description: string

  patterns: string[]

  goals: string[]
}

const hcaiGoals = ["Reliability", "Safety", "Trustworthiness"]

const guidelines: Guideline[] = [
  {
    id: "user-experience",
    title: "User Experience",
    description:
      "Create AI experiences that understand the user’s context, remain easy to use, and provide meaningful feedback throughout the interaction.",
    patterns: ["Context-Awareness", "Usability", "Feedback"],
    goals: ["Reliability"],
  },

  {
    id: "ethical-alignment",

    title: "Ethical Alignment",

    description:
      "Align AI behavior with human values, social wellbeing, inclusion, fairness, legal obligations, diversity, and trustworthy practice.",

    patterns: [
      "Social Well-being",

      "Inclusion",

      "Fairness",

      "Legal Compliance",

      "Diversity",

      "Trustworthiness",
    ],

    goals: ["Reliability", "Trustworthiness"],
  },

  {
    id: "safety-reliability",

    title: "Safety & Reliability",

    description:
      "Maintain accurate, secure, and resilient AI behavior across expected use, edge cases, disruption, and recovery.",

    patterns: ["Accuracy", "Security", "Resilience"],

    goals: ["Reliability", "Safety"],
  },

  {
    id: "transparency-explainability",

    title: "Transparency & Explainability",

    description:
      "Help people understand when AI is involved, how it behaves, and why it produces a particular output or recommendation.",

    patterns: ["Interpretability", "Transparency", "Explainability"],

    goals: ["Reliability"],
  },

  {
    id: "accountability-responsibility",

    title: "Accountability & Responsibility",

    description:
      "Make responsibility explicit and preserve the evidence needed to review decisions, investigate issues, and provide remedy.",

    patterns: ["Accountability", "Auditability", "Traceability"],

    goals: ["Reliability", "Trustworthiness"],
  },

  {
    id: "human-augmentation",

    title: "Human Augmentation",

    description:
      "Use AI to expand human capability and agency while preserving meaningful choice and ownership.",

    patterns: ["User Empowerment"],

    goals: ["Reliability"],
  },

  {
    id: "human-led-collaboration",

    title: "Human-Led Collaboration",

    description:
      "Keep people actively involved in directing, monitoring, and intervening in human-AI collaboration.",

    patterns: ["Oversight"],

    goals: ["Trustworthiness"],
  },

  {
    id: "sustainability",

    title: "Sustainability",

    description:
      "Balance the value of AI with its environmental, social, and economic impacts over the system lifecycle.",

    patterns: ["Sustainability"],

    goals: ["Safety"],
  },

  {
    id: "human-controllability",

    title: "Human Controllability",

    description:
      "Set appropriate boundaries for machine autonomy and ensure people can direct, override, pause, or reverse AI actions.",

    patterns: ["Machine Autonomy"],

    goals: ["Safety"],
  },
]

const principleGuidance: Record<string, {
  guideline: string
  why: string
  how: string
}> = {
  Interpretability: {
    guideline:
      "Make AI behavior understandable so people can correctly interpret its inputs, outputs, and limitations.",

    why: "People need an accurate mental model of the system before they can make a responsible decision.",

    how: "Surface influential inputs, confidence, assumptions, and known limitations alongside the AI output.",
  },

  Transparency: {
    guideline:
      "Clearly communicate when AI is being used, what information it relies on, and how it affects outcomes.",

    why: "Visibility gives people the context needed to question, verify, or reject AI assistance.",

    how: "Label AI-generated content, identify relevant data sources, and preserve a record of human and AI actions.",
  },

  Explainability: {
    guideline:
      "Provide meaningful reasons for AI recommendations or decisions in language people can understand.",

    why: "Clear reasons help people detect mistakes and explain consequential decisions to others.",

    how: "Present contributing factors, meaningful alternatives, and a path to correction or appeal.",
  },

  "Machine Autonomy": {
    guideline:
      "Set clear boundaries for independent AI action while preserving meaningful human oversight.",

    why: "Explicit limits prevent automation from overreaching and keep accountability with people.",

    how: "Use approval gates, configurable thresholds, pause controls, overrides, and reversible actions.",
  },

  Diversity: {
    guideline:
      "Design for a broad range of people, contexts, abilities, and lived experiences.",

    why: "AI experiences built around a narrow user model can exclude people and amplify existing gaps.",

    how: "Research diverse users, test edge cases, and support multiple interaction and content needs.",
  },

  Usability: {
    guideline:
      "Make AI interactions clear, efficient, learnable, and consistent with user expectations.",

    why: "People cannot exercise meaningful control when the interface is confusing or unpredictable.",

    how: "Use familiar patterns, plain language, visible system status, and recoverable actions.",
  },

  Feedback: {
    guideline:
      "Give people timely feedback and ways to improve, correct, or contest AI output.",

    why: "Feedback closes the loop between user intent, system behavior, and future outcomes.",

    how: "Confirm actions, explain changes, collect corrections, and show how feedback will be used.",
  },

  "Context-Awareness": {
    guideline:
      "Adapt AI behavior to the user’s task, environment, risk, and current needs.",

    why: "The same automated behavior can be helpful in one context and unsafe in another.",

    how: "Use relevant contextual signals, confirm uncertain assumptions, and let people adjust context.",
  },

  Oversight: {
    guideline:
      "Provide continuous visibility and intervention points for people responsible for the system.",

    why: "Human oversight is necessary to identify drift, misuse, and unexpected outcomes.",

    how: "Provide monitoring, alerts, review queues, escalation paths, and accessible override controls.",
  },

  "Social Well-being": {
    guideline:
      "Consider how AI affects individual wellbeing, relationships, communities, and society.",

    why: "An efficient system can still create harmful social or behavioral consequences.",

    how: "Assess social impacts, monitor harmful patterns, and include affected communities in reviews.",
  },

  Accuracy: {
    guideline:
      "Communicate and maintain the level of accuracy appropriate for the task and its consequences.",

    why: "People may over-rely on outputs when error rates and uncertainty are hidden.",

    how: "Validate against representative data, show uncertainty, and route low-confidence cases to review.",
  },

  Security: {
    guideline:
      "Protect AI systems, data, and interactions from unauthorized access, manipulation, and misuse.",

    why: "Security failures can compromise both system behavior and the people who depend on it.",

    how: "Apply least privilege, secure sensitive data, log access, and design safe failure responses.",
  },

  Resilience: {
    guideline:
      "Ensure the experience can respond safely to errors, changing conditions, and system disruption.",

    why: "AI systems will encounter unexpected inputs and failures in real-world use.",

    how: "Design fallbacks, graceful degradation, recovery paths, monitoring, and tested incident plans.",
  },

  Inclusion: {
    guideline:
      "Ensure people can access and benefit from the AI experience without avoidable exclusion.",

    why: "Barriers in data, language, ability, or access can systematically disadvantage users.",

    how: "Follow accessibility standards, support varied needs, and test with underserved groups.",
  },

  Fairness: {
    guideline:
      "Evaluate and reduce unjust differences in AI performance, treatment, and outcomes.",

    why: "Seemingly neutral systems can reproduce or intensify historical inequities.",

    how: "Measure outcomes across groups, investigate disparities, and provide review and remedy paths.",
  },

  "Legal Compliance": {
    guideline:
      "Design and operate AI in accordance with applicable laws, rights, and regulatory duties.",

    why: "Compliance protects people’s rights and reduces operational and reputational risk.",

    how: "Map obligations to interface requirements, document decisions, and support consent and appeals.",
  },

  Sustainability: {
    guideline:
      "Balance AI value with its environmental, social, and economic costs over time.",

    why: "AI can consume significant resources and create impacts beyond the immediate user experience.",

    how: "Measure resource use, choose proportionate models, and communicate sustainability tradeoffs.",
  },

  "User Empowerment": {
    guideline:
      "Give people the knowledge, choices, and controls needed to pursue their own goals.",

    why: "Human-centered AI should expand agency rather than create dependence or remove meaningful choice.",

    how: "Offer configurable assistance, informed choices, editable outputs, and clear opt-out paths.",
  },

  Accountability: {
    guideline:
      "Make responsibility for AI decisions, operation, and remediation explicit.",

    why: "People need to know who owns an outcome and who can resolve a problem.",

    how: "Assign owners, expose support paths, document decisions, and define escalation responsibilities.",
  },

  Auditability: {
    guideline:
      "Preserve sufficient evidence to independently review AI behavior and decisions.",

    why: "Teams cannot investigate harm or demonstrate responsible practice without reliable records.",

    how: "Log inputs, outputs, model versions, human interventions, and decision context securely.",
  },

  Traceability: {
    guideline:
      "Connect AI outcomes to their data, model, workflow, and responsible human decisions.",

    why: "Traceability helps teams identify where an error originated and how it affected an outcome.",

    how: "Use stable identifiers, provenance records, version history, and end-to-end decision trails.",
  },

  Trustworthiness: {
    guideline:
      "Ensure AI behavior consistently merits confidence through evidence, integrity, and responsible operation.",

    why: "Trust should be calibrated to demonstrated system qualities rather than persuasive presentation.",

    how: "Publish limitations, monitor performance, respond to incidents, and verify claims with evidence.",
  },
}

type GuidelineKey = "context" | "usability" | "feedback"

type GuidelineContent = {
  label: string
  title: string
  intro: string[]
  pattern: string[]
  doImage: string
  avoidImage: string
  doItems: string[]
  avoidItems: string[]
  references: string[]
}

const guidelineContent: Record<GuidelineKey, GuidelineContent> = {
  context: {
    label: "Context-Aware",
    title: "Set expectations for adaptation",
    intro: [
      "Context-awareness is the capacity of an AI system to use information about a user’s situation to adapt what it presents or does [1] [2]. Designers should set expectations for adaptation by telling users in advance what the system will learn from their context and how its behavior will change over time, so that adaptation feels predictable rather than surprising [5].",
      "Context-aware behavior should also be grounded in an understood and specified context of use to make AI feel relevant [3]. Good relevance design makes complex AI feel simple by hiding unnecessary complexity [5].",
    ],
    pattern: [
      "Practical patterns for designing context-aware AI that makes its inputs, reasoning, and limitations clear. AI systems learn from their environments. Sometimes, they keep track of whether or not an output was useful and adapt accordingly.",
      "Clarify how input influences results. Don’t forget to communicate changes in accuracy as conditions change [5].",
    ],
    doImage: contextDoImage,
    avoidImage: contextAvoidImage,
    doItems: [
      "“How this panel adapts” says what it uses and how behavior will change over time. It has Manage and Turn off actions. It appears before the system adapts.",
      "Add sources so users can see what the AI is reading and change it.",
      "Apply progressive disclosure where only relevant readings are shown.",
    ],
    avoidItems: [
      "Persona branding replaces the functional title. This sets a wrong expectation and creates a black box.",
      "Missing explanation because there is no basis, confidence value, or info icon.",
      "A dense list of nine sensor rows is shown with no context.",
    ],
    references: [
      "[1] Dey, A. K. (2001). Understanding and using context. Personal and Ubiquitous Computing, 5(1), 4–7.",
      "[2] Göbels, V. P., et al. (2026). Aligning AI with human values: Design principles for human-centered AI.",
      "[3] International Organization for Standardization. (2020). Ergonomics of human-system interaction — Part 110.",
      "[4] Kore, A. (2022). Designing human-centric AI experiences.",
    ],
  },
  usability: {
    label: "Usability",
    title: "Support effective and easy-to-learn operation",
    intro: [
      "Usability describes how easy and pleasant a product’s features are to use [4]. It extends to the degree to which specific users can reach specific goals with a system, product, or service effectively, efficiently, and with satisfaction [1][2].",
      "Interfaces should be intuitive, easy to understand, and easy to navigate, so people can find AI features and make sense of them without specialist knowledge. These features should also be easy to learn and efficient to use in real work [1].",
    ],
    pattern: [
      "AI outputs can be uncertain, can differ from one attempt to the next, and can be wrong. Usability should put clarity, trust, and user control first [3]. Marking AI-generated content with a subtle but distinct cue helps people recognize it right away [3][5].",
      "People should also be able to undo actions, leave a state they did not want, and stay in charge throughout. The design should always let them override the AI [5].",
    ],
    doImage: usabilityDoImage,
    avoidImage: usabilityAvoidImage,
    doItems: [
      "“Ask AI” sits in the header, next to search, in the same place on every page.",
      "The panel opens as a dropdown anchored to the button.",
      "Input has a visible label, placeholder, and suggested questions in everyday language.",
      "A “Talk to a person” link is always shown.",
    ],
    avoidItems: [
      "Header has no AI entry, current-page indicator, or breadcrumb.",
      "It says nothing about what it can or can’t do, and quick actions use jargon.",
      "The close button and text are tiny, and there is no way to reach a person.",
    ],
    references: [
      "Göbels, V. P., et al. (2026). Aligning AI with human values.",
      "International Organization for Standardization. (2018). Usability: Definitions and concepts.",
      "Joseph, A. M. (2026). Designing for AI features: 6 UX principles.",
      "Nielsen, J. (2012). Usability 101: Introduction to usability.",
    ],
  },
  feedback: {
    label: "Feedback",
    title: "Provide users with an efficient, flexible, and positive feedback-giving experience",
    intro: [
      "Feedback involves gathering, analyzing, and applying user input to enhance a system’s intelligence. This process, which is always initiated by the user, effectively allows them to teach the AI [1], [2]. Feedback mechanisms must be seamless and never disrupt the user’s primary workflow.",
      "Users are driven to provide feedback for various reasons. Designers can tie internal feedback mechanisms directly into the product’s reward systems [2].",
    ],
    pattern: [
      "Make feedback entry points highly visible and inviting. Use appreciative language that explains how providing input benefits the user.",
      "Offer flexible engagement options and provide clear system status signals confirming submission and explaining how the data will be used.",
    ],
    doImage: feedbackDoImage,
    avoidImage: feedbackAvoidImage,
    doItems: [
      "Floating panel directly next to the AI feature, easily dismissible.",
      "Clearly states how the user benefits from helping.",
      "Binary choices, quick chips, or detailed text.",
      "Explains what happens to the data and notes.",
    ],
    avoidItems: [
      "Screen-blocking modal that stops the user workflow.",
      "Demanding language with no clear benefit to the user.",
      "Forces users to write detailed text with no quick options.",
      "Vague wording about where the data goes.",
    ],
    references: [
      "SAP, “Feedback loop in intelligent systems,” SAP Fiori Design Guidelines.",
      "A. Kore, Designing Human-Centric AI Experiences.",
      "A. Frik et al. (2026). arXiv preprint.",
    ],
  },
}

function GuidelineCard({
  guideline,

  number,

  onOpen,

  disabled = false,
}: {
  guideline: Guideline

  number: number

  onOpen?: () => void

  disabled?: boolean
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-5">
        <span className="card-number">{String(number).padStart(2, "0")}</span>
        <span className="card-arrow">
          <ArrowIcon />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {guideline.goals.map((goal) => (
          <span className="goal-tag-dark" key={goal}>
            {goal}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-14">
        <h3 className="max-w-[22ch] text-xl leading-[1.15] font-semibold tracking-[-0.025em] text-white sm:text-[1.35rem]">
          {guideline.title}
        </h3>
        <p className="mt-4 max-w-[48ch] text-sm leading-6 text-white/90">
          {guideline.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {guideline.patterns.map((pattern) => (
            <span className="pattern-tag" key={pattern}>
              {pattern}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <article
      className={`guideline-card group ${
        onOpen && !disabled ? "guideline-card-interactive" : ""
      } ${disabled ? "guideline-card-disabled" : ""}`}
    >
      {onOpen && !disabled && (
        <button
          aria-label={`Open guideline: ${guideline.title}`}
          className="guideline-card-link"
          onClick={onOpen}
          type="button"
        />
      )}
      {content}
    </article>
  )
}

function BackIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
      <path
        d="m12 5-5 5 5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
      <path
        d="M3.5 5.5h13m-13 4.5h13m-13 4.5h13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function PageHeader({
  breadcrumbs,
}: {
  breadcrumbs: Array<{
    label: string
    onClick?: () => void
  }>
}) {
  return (
    <header className="page-navigation-header">
      <div className="page-navigation-inner">
        <nav aria-label="Breadcrumb" className="page-breadcrumbs">
          {breadcrumbs.map((breadcrumb, index) => (
            <span className="page-breadcrumb-part" key={`${breadcrumb}-${index}`}>
              {index > 0 && <span aria-hidden="true">{">"}</span>}
              {breadcrumb.onClick ? (
                <button onClick={breadcrumb.onClick} type="button">
                  {breadcrumb.label}
                </button>
              ) : (
                <span aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}>
                  {breadcrumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </header>
  )
}

function DetailedGuidelineSection({
  content,
  number,
}: {
  content: GuidelineContent
  number: number
}) {
  return (
    <article className="design-guideline">
      <div className="design-guideline-heading">
        <span className="design-guideline-number">
          {String(number).padStart(2, "0")}
        </span>
        <h4 className="text-lg font-semibold text-[#006cb8]">
          {content.label}
        </h4>
      </div>
      <div className="design-guideline-content">
        <h5 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[#082542] sm:text-3xl">
          {content.title}
        </h5>
        <div className="detail-section-copy mt-5 grid gap-4">
          {content.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {content.pattern.map((paragraph) => (
            <p className="detail-section-copy" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="do-avoid-grid is-compact">
          <section className="example-card do-card">
            <p className="example-label">Do</p>
            <img alt={`${content.label} recommended pattern`} src={content.doImage} />
            <ul>
              {content.doItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="example-card avoid-card">
            <p className="example-label">Avoid</p>
            <img alt={`${content.label} pattern to avoid`} src={content.avoidImage} />
            <ul>
              {content.avoidItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <div className="mt-6">
          <p className="detail-section-label">References</p>
          <ul className="mt-2 grid gap-2 text-sm leading-6 text-[#49647d]">
            {content.references.map((reference) => (
              <li key={reference}>{reference}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

function GuidelineDetail({
  category,

  guideline,

  number,

  onBack,

  onBackToMain,

  onBackToGuidebooks,

  onOpenExamples,
}: {
  category: string

  guideline: Guideline

  number: number

  onBack: () => void

  onBackToMain: () => void

  onBackToGuidebooks: () => void

  onOpenExamples: (principle: string, guidelineId: string) => void
}) {
  const detailedContent =
    guideline.id === "user-experience"
      ? {
          "Context-Awareness": guidelineContent.context,
          Usability: guidelineContent.usability,
          Feedback: guidelineContent.feedback,
        }
      : null

  return (
    <main className="min-h-screen bg-[#f7faff] text-[#09233f]">
      <PageHeader
        breadcrumbs={[
          { label: "Guidelines", onClick: onBackToGuidebooks },
          { label: "HCAI", onClick: onBackToMain },
          { label: "Principles", onClick: onBack },
          { label: guideline.title },
        ]}
      />
      <div className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        <div className="mt-10">
          <article className="max-w-none">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-[#006cb8] uppercase">
              <span className="h-2.5 w-2.5 rounded-full bg-[#006cb8]" />
              {category} · Guideline {String(number).padStart(2, "0")}
            </div>
            <h1 className="mt-7 text-4xl leading-[1.05] font-semibold tracking-[-0.045em] text-[#082542] sm:text-5xl lg:text-6xl">
              {guideline.title}
            </h1>
            <div className="detail-copy mt-10">
              <p>{guideline.description}.  Use the following design principles to translate this guideline
                into concrete interface decisions, interaction patterns, and
                implementation requirements.</p>
            </div>
            <button
              className="design-guideline-link mt-8"
              onClick={() =>
                onOpenExamples(guideline.patterns[0], guideline.id)
              }
              type="button"
            >
              Check examples in Pattern Library
              <ArrowIcon />
            </button>

            <section className="mt-14 border-t border-[#bfd8eb] pt-10">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#082542] sm:text-3xl">
                Design guidelines to follow
              </h3>
              <div className="mt-7 grid gap-4">
                {guideline.patterns.map((principle, index) => {
                  const content = detailedContent?.[principle as keyof typeof detailedContent]

                  if (content) {
                    return (
                      <DetailedGuidelineSection
                        content={content}
                        key={principle}
                        number={index + 1}
                      />
                    )
                  }

                  const guidance = principleGuidance[principle]

                  return (
                    <article className="design-guideline" key={principle}>
                      <div className="design-guideline-heading">
                        <span className="design-guideline-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h4 className="text-lg font-semibold text-[#006cb8]">
                          {principle}
                        </h4>
                      </div>
                      <div className="design-guideline-content">
                        <dl className="mt-5 grid gap-5">
                          <div>
                            <dt className="detail-section-label">
                              Design guideline
                            </dt>
                            <dd className="detail-section-copy">
                              {guidance.guideline}
                            </dd>
                          </div>
                          <div>
                            <dt className="detail-section-label">Why</dt>
                            <dd className="detail-section-copy">
                              {guidance.why}
                            </dd>
                          </div>
                          <div>
                            <dt className="detail-section-label">How</dt>
                            <dd className="detail-section-copy">
                              {guidance.how}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>
  )
}

function GuidelinesPage({
  onBack,

  onBackToMain,

  onBackToGuidebooks,

  onOpenExamples,
}: {
  onBack: () => void

  onBackToMain: () => void

  onBackToGuidebooks: () => void

  onOpenExamples: (principle: string, guidelineId: string) => void
}) {
  const [activeGuidelineId, setActiveGuidelineId] = useState<string | null>(
    null,
  )

  const guidelineEntries = guidelines.map((guideline) => ({
    category: guideline.goals.join(" · "),

    guideline,
  }))

  const activeGuideline = guidelineEntries.find(
    (entry) => entry.guideline.id === activeGuidelineId,
  )

  if (activeGuideline) {
    return (
      <GuidelineDetail
        category={activeGuideline.category}
        guideline={activeGuideline.guideline}
        number={guidelineEntries.indexOf(activeGuideline) + 1}
        onBack={() => {
          setActiveGuidelineId(null)

          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        onBackToMain={onBackToMain}
        onBackToGuidebooks={onBackToGuidebooks}
        onOpenExamples={onOpenExamples}
      />
    )
  }

  return (
    <main className="min-h-screen bg-[#f7faff] text-[#09233f]">
      <PageHeader
        breadcrumbs={[
          { label: "Guidelines", onClick: onBackToGuidebooks },
          { label: "HCAI", onClick: onBack },
          { label: "Principles" },
        ]}
      />
      <header className="mx-auto max-w-[1480px] px-5 pt-8 pb-11 sm:px-8 sm:pt-12 lg:px-12 lg:pt-16 lg:pb-16">
        <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-[#006cb8] uppercase">
          <span className="h-2.5 w-2.5 rounded-full bg-[#006cb8]" />
          Human-centered AI
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] lg:items-end">
          <h1 className="max-w-4xl text-5xl leading-[0.98] font-semibold tracking-[-0.055em] text-[#082542] sm:text-6xl lg:text-[5.4rem]">
            Principles for
            <br />
            responsible AI.
          </h1>
          <p className="max-w-xl border-l border-[#a9cde8] pl-5 text-base leading-7 text-[#49647d] lg:mb-1">
            Principles for creating reliable, safe, and trustworthy AI
            experiences that keep people at the center of every decision.
          </p>
        </div>
      </header>

      <section
        aria-label="AI guidelines"
        className="mx-auto max-w-[1480px] px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24"
      >
        <div className="overflow-hidden rounded-[28px] border border-[#bfd8eb] bg-[#89b9dc] shadow-[0_24px_70px_rgba(0,63,110,0.10)]">
          <div className="grid gap-px md:grid-cols-2 xl:grid-cols-3">
            {guidelines.map((guideline, index) => (
              <GuidelineCard
                guideline={guideline}
                key={guideline.title}
                number={index + 1}
                disabled={guideline.id !== "user-experience"}
                onOpen={() => {
                  setActiveGuidelineId(guideline.id)

                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

type Page = "gateway" | "main" | "guidelines" | "library" | "ui" | "ux"

const aiTypes = [
  "Machine Learning",

  "NLP",

  "Text & Speech",

  "Computer Vision",

  "Robotics",

  "Planning",

  "Expert System",
]

const aiCapabilities = [
  "Descriptive",

  "Diagnostic",

  "Predictive",

  "Prescriptive",

  "Generative",
]

const aiProducts = ["Dashboard", "IoT/Robotics", "Drone"]

const aiProductFilterOptions = [
  "Dashboard",
  "Website",
  "Drone",
  "Platform",
  "Agentic AI",
  "Geospatial",
  "VR/AR",
  "IoT/Robotics",
]

const analyticsMatrix: Record<string, Partial<Record<string, string[]>>> = {
  Dashboard: {
    "Machine Learning": [
      "Predictive",

      "Prescriptive",

      "Descriptive",

      "Diagnostic",
    ],

    NLP: [
      "Descriptive",

      "Diagnostic",

      "Predictive",

      "Prescriptive",

      "Generative",
    ],

    "Expert System": ["Descriptive"],
  },

  Website: {
    "Machine Learning": ["Predictive", "Prescriptive"],

    NLP: ["Prescriptive", "Generative"],

    "Text & Speech": ["Generative"],
  },

  Platform: {
    "Machine Learning": [
      "Diagnostic",

      "Predictive",

      "Prescriptive",

      "Generative",
    ],

    NLP: ["Generative"],
  },

  Drone: {
    NLP: ["Generative"],

    "Computer Vision": ["Diagnostic", "Predictive"],

    Robotics: ["Prescriptive"],

    Planning: ["Prescriptive"],
  },

  "VR/AR": {
    NLP: ["Prescriptive", "Generative"],

    "Text & Speech": ["Generative"],

    "Computer Vision": ["Diagnostic", "Generative"],

    "Expert System": ["Prescriptive"],
  },

  Geospatial: {
    "Machine Learning": ["Descriptive", "Diagnostic", "Predictive"],

    NLP: ["Generative"],

    "Computer Vision": ["Diagnostic"],

    Planning: ["Prescriptive"],
  },

  "Remote Sensing": {
    "Machine Learning": ["Descriptive", "Diagnostic", "Predictive"],

    NLP: ["Generative"],

    "Computer Vision": ["Diagnostic", "Predictive"],
  },

  "Digital Twin": {
    "Machine Learning": ["Diagnostic", "Predictive", "Prescriptive"],

    NLP: ["Generative"],

    Planning: ["Prescriptive"],

    "Expert System": ["Prescriptive"],
  },

  "IoT/Robotics": {
    "Machine Learning": ["Diagnostic", "Predictive", "Prescriptive"],

    "Expert System": ["Descriptive", "Diagnostic", "Prescriptive"],
  },
}

const indexedGuidelines = guidelines.map((guideline) => ({
  ...guideline,

  category: guideline.goals.join(" · "),
}))

const getPrincipleFilterId = (guidelineId: string, principle: string) =>
  `${guidelineId}::${principle}`

const featureExamples = aiProducts.flatMap((product, productIndex) =>
  aiTypes.flatMap((type, typeIndex) => {
    const analyticsGoals = analyticsMatrix[product]?.[type]

    if (!analyticsGoals) {
      return []
    }

    const firstGuideline =
      indexedGuidelines[(typeIndex + productIndex) % indexedGuidelines.length]

    const secondGuideline =
      indexedGuidelines[
        (typeIndex + productIndex + 3) % indexedGuidelines.length
      ]

    const appliedGuidelines = [firstGuideline, secondGuideline].map(
      (guideline, guidelineIndex) => ({
        id: guideline.id,

        title: guideline.title,

        goals: guideline.goals,

        designGuideline:
          guideline.patterns[
            (typeIndex + productIndex + guidelineIndex) %
              guideline.patterns.length
          ],
      }),
    )

    return [
      {
        id: `${type}-${product}`,

        title: `${type} for ${product}`,

        description: `A ${product.toLowerCase()} pattern that applies ${type.toLowerCase()} capabilities while keeping AI behavior visible, reviewable, and human-centered.`,

        type,

        product,

        guidelineIds: [firstGuideline.id, secondGuideline.id],

        appliedGuidelines,
      },
    ]
  }),
)

type FeatureExample = typeof featureExamples[number]

const faqs = [
  {
    question: "Who is this toolkit for?",

    answer:
      "It is designed for product designers, UX practitioners, researchers, product managers, and engineering teams working on AI-enabled products.",
  },

  {
    question: "Do I need to use every guideline?",

    answer:
      "No. Start with your product context and risk, then prioritize the goals and principles that are relevant to the people and decisions affected.",
  },

  {
    question: "Are the feature examples prescriptive?",

    answer:
      "They are starting points rather than fixed solutions. Adapt each pattern to your users, domain, technical constraints, and level of risk.",
  },

  {
    question: "When should the toolkit be used?",

    answer:
      "Use it during early concept work, design reviews, implementation planning, and recurring product evaluations as the AI system changes.",
  },
]

function GuidebookHub({
  onOpenHcai,

  onOpenUi,

  onOpenUx,
}: {
  onOpenHcai: () => void

  onOpenUi: () => void

  onOpenUx: () => void
}) {
  const guidebooks = [
    {
      code: "UI",

      title: "UI Guidelines",

      description:
        "Interface foundations for creating clear, consistent, and accessible digital products.",

      status: "Interface design",

      tone: "ui",

      action: onOpenUi,
    },

    {
      code: "UX",

      title: "UX Guidelines",

      description:
        "Experience principles for shaping useful, usable, and coherent end-to-end journeys.",

      status: "Experience design",

      tone: "ux",

      action: onOpenUx,
    },

    {
      code: "AI",

      title: "HCAI Guidelines",

      description:
        "Human-centered guidance, design principles, and examples for responsible AI products.",

      status: "Open toolkit",

      tone: "hcai",

      action: onOpenHcai,
    },

    {
      code: "AU",

      title: "Audit Guidebook",

      description:
        "A structured guide for reviewing products against design, accessibility, and AI criteria.",

      status: "Currently unavailable",

      tone: "audit",

      action: null,
    },
  ]

  return (
    <main className="min-h-screen bg-[#f7faff] text-[#09233f]">
      <nav className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3 font-semibold tracking-[-0.02em]">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#006cb8] text-xs font-bold text-white">
            DG
          </span>
          Design Guidebooks
        </div>
        <span className="text-xs font-semibold tracking-[0.15em] text-[#557087] uppercase">
          Resource library
        </span>
      </nav>

      <header className="mx-auto max-w-[1480px] px-5 pt-16 pb-12 sm:px-8 sm:pt-24 lg:px-12 lg:pt-28 lg:pb-16">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#006cb8] uppercase">
          Design knowledge hub
        </p>
        <div className="mt-7 max-w-4xl">
          <h1 className="max-w-4xl text-5xl leading-[0.98] font-semibold tracking-[-0.055em] text-[#082542] sm:text-6xl lg:text-[5.4rem]">
            Practical guidance for designing better products.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#49647d]">
            Choose a guidebook to explore focused principles, patterns, and
            tools for your current design challenge.
          </p>
        </div>
      </header>

      <section
        aria-label="Design guidebooks"
        className="mx-auto max-w-[1480px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {guidebooks.map((guidebook, index) => (
            <article
              aria-disabled={guidebook.tone === "audit" || undefined}
              className={`guidebook-card guidebook-card-${guidebook.tone}`}
              key={guidebook.title}
            >
              <div className="guidebook-visual">
                <span className="guidebook-code">{guidebook.code}</span>
                <span className="guidebook-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="guidebook-orbit" />
              </div>
              <div className="mt-7 flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`guidebook-status guidebook-status-${guidebook.tone}`}
                  >
                    {guidebook.status}
                  </span>
                  <h2 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-[#082542]">
                    {guidebook.title}
                  </h2>
                </div>
                {guidebook.action && (
                  <span className="landing-arrow">
                    <ArrowIcon />
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-[#5a7186]">
                {guidebook.description}
              </p>
              {guidebook.action && (
                <button
                  aria-label={`Open ${guidebook.title}`}
                  className="guidebook-card-link"
                  onClick={guidebook.action}
                  type="button"
                />
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#d7e7f2] bg-white">
        <div className="mx-auto grid max-w-[1480px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-12 lg:py-28">
          <div>
            <p className="toolkit-eyebrow">FAQ</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#082542]">
              Questions before you begin.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <details className="toolkit-faq" key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function MainPage({
  onBack,

  onNavigate,
}: {
  onBack: () => void

  onNavigate: (page: Page) => void
}) {
  const tools = [
    {
      title: "Guidelines for HCAI",

      description:
        "Explore practical principles for creating reliable, safe, and trustworthy AI experiences and the corresponding design guidelines.",

      label: "Guidelines",

      page: "guidelines" as Page,

      accent: "01",

      items: [
        "9 human-centered guidelines",

        "Design principles with Why and How guidance",

        "Direct links to relevant product examples",
      ],
    },

    {
      title: "Design Pattern Library",

      description:
        "Filter guidelines and discover feature examples across AI types and products.",

      label: "Design library",

      page: "library" as Page,

      accent: "02",

      items: [
        "Product, AI type, and capability filters",

        "Guideline and design-principle matching",

        "Feature examples with implementation guidance",
      ],
    },
  ]

  const useCases = [
    {
      number: "01",

      title: "Shape an AI product concept",

      description:
        "Start with a product type, identify the relevant human-centered goals, and turn them into interface requirements.",

      outcome: "Output: prioritized design principles",
    },

    {
      number: "02",

      title: "Review an interface direction",

      description:
        "Use the guidelines to question control, transparency, safety, and accountability before committing to a design.",

      outcome: "Output: design review prompts",
    },

    {
      number: "03",

      title: "Find an implementation pattern",

      description:
        "Filter the Design Library by product, capability, and principle to find a concrete feature example.",

      outcome: "Output: implementation guidance",
    },
  ]

  return (
    <main className="min-h-screen bg-[#f7faff] text-[#09233f]">
      <PageHeader
        breadcrumbs={[
          { label: "Guidelines", onClick: onBack },
          { label: "HCAI" },
        ]}
      />

      <header
        className="mx-auto max-w-[1480px] px-5 pt-14 pb-16 sm:px-8 sm:pt-20 lg:px-12 lg:pt-28 lg:pb-24"
        id="main-content"
      >
        <div className="max-w-5xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#006cb8] uppercase">
            Human-centered AI toolkit
          </p>
          <h1 className="font-inter mt-7 text-5xl leading-[0.98] font-semibold tracking-[-0.055em] text-[#082542] sm:text-6xl lg:text-[5.4rem]">
            Hands-on tools for building effective human-AI experiences.
          </h1>
          <p className="font-inter mt-8 max-w-3xl p-0 text-lg leading-8 text-[#49647d]">
            A focused collection of guidelines and design resources for teams
            creating AI products that work with people, not around them.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              className="toolkit-secondary-action"
              onClick={() =>
                document

                  .getElementById("about-toolkit")

                  ?.scrollIntoView({ behavior: "smooth" })
              }
              type="button"
            >
              How it works
            </button>
          </div>
        </div>
      </header>

      <section
        className="mx-auto max-w-[1480px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28"
        id="toolkit-resources"
      >
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-[#bfd8eb] pb-6">
          <div>
            <p className="toolkit-eyebrow">Toolkit resources</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#082542] sm:text-4xl">
              Choose where to begin.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-[#557087]">
            Learn the principles first, or start from your product context and
            work backward from a feature example.
          </p>
        </div>

        <div className="mt-8 grid gap-6">
          {tools.map((tool, index) => (
            <article className="hcai-resource-panel" key={tool.title}>
              <div
                className={`hcai-resource-number ${
                  index === 1 ? "hcai-resource-number-alt" : ""
                }`}
              >
                <span>{tool.accent}</span>
                <strong>{tool.label}</strong>
              </div>
              <div className="hcai-resource-content">
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#082542] sm:text-3xl">
                    {tool.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#49647d]">
                    {tool.description}
                  </p>
                </div>
                <ul className="grid gap-3">
                  {tool.items.map((item) => (
                    <li className="hcai-resource-item" key={item}>
                      <span aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  className="hcai-resource-action"
                  onClick={() => onNavigate(tool.page)}
                  type="button"
                >
                  Open {tool.title}
                  <ArrowIcon />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="toolkit-about-section" id="about-toolkit">
        <div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="toolkit-eyebrow toolkit-eyebrow-light">
                About the toolkit
              </p>
              <h2 className="mt-4 text-4xl leading-tight font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Guidance that connects principles to interface decisions.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[1.4rem] bg-white/20 md:grid-cols-3">
              {[
                {
                  number: "01",

                  title: "What is this toolkit?",

                  copy: "A connected set of HCAI guidelines and product examples for responsible interface design.",
                },

                {
                  number: "02",

                  title: "Why use this toolkit?",

                  copy: "To make abstract AI principles actionable, reviewable, and relevant to a specific product context.",
                },

                {
                  number: "03",

                  title: "How do I use it?",

                  copy: "Choose a goal, review its principles, then explore examples that show how those principles can appear in a product.",
                },
              ].map((item) => (
                <article className="toolkit-about-item" key={item.title}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="toolkit-eyebrow">Use cases and examples</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#082542]">
            Use the toolkit throughout the design process.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <article className="toolkit-use-case" key={useCase.title}>
              <span className="toolkit-use-case-number">{useCase.number}</span>
              <h3>{useCase.title}</h3>
              <p>{useCase.description}</p>
              <strong>{useCase.outcome}</strong>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-[#082542] text-white">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="flex items-center gap-3 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-xs font-bold text-[#006cb8]">
              HC
            </span>
            Human-Centered AI Toolkit
          </div>
          <p className="text-sm text-white/90">
            Practical guidance for responsible human-AI experiences.
          </p>
        </div>
      </footer>
    </main>
  )
}

function DoAvoid({
  content,
}: {
  content: GuidelineContent
}) {
  return (
    <div className="do-avoid-grid is-compact">
      <section className="example-card do-card">
        <p className="example-label">Do</p>
        <img alt={`${content.label} recommended pattern`} src={content.doImage} />
        <ul>
          {content.doItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="example-card avoid-card">
        <p className="example-label">Avoid</p>
        <img alt={`${content.label} pattern to avoid`} src={content.avoidImage} />
        <ul>
          {content.avoidItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function Divider() {
  return <hr className="my-10 border-0 border-t border-[#bfd8eb]" />
}

function DashboardPage({
  onBack,
  onBackToHcai,
  onBackToGuidebooks,
  openPrinciple,
  openGuideline,
}: {
  onBack: () => void
  onBackToHcai: () => void
  onBackToGuidebooks: () => void
  openPrinciple: (guidelineId: string) => void
  openGuideline: (key: GuidelineKey) => void
}) {
  const dashboardSections = [
    {
      key: "context" as GuidelineKey,
      content: {
        ...guidelineContent.context,
        doImage: dashboardContextDoImage,
        avoidImage: dashboardContextAvoidImage,
        doItems: [
          "AI label and confidence badge sit next to the title.",
          "An info icon opens a tooltip saying what the forecast is based on.",
        ],
        avoidItems: guidelineContent.context.avoidItems.slice(0, 2),
      },
    },
    {
      key: "usability" as GuidelineKey,
      content: {
        ...guidelineContent.usability,
        doImage: dashboardUsabilityDoImage,
        avoidImage: dashboardUsabilityAvoidImage,
        doItems: [
          "A labelled “Ask AI” button sits in the widget header, in a consistent place.",
          "Suggested questions use everyday language.",
        ],
        avoidItems: [
          "AI entry is an unlabelled sparkle icon among identical icon-only buttons.",
          "Missing explanation because there is no basis, confidence value, or info icon.",
        ],
      },
    },
    {
      key: "feedback" as GuidelineKey,
      content: {
        ...guidelineContent.feedback,
        doItems: [
          "Floating panel directly next to the AI feature, easily dismissible.",
          "Clearly states how the user benefits from helping.",
          "Offers binary choices, quick chips, or a detailed text option.",
          "Explains what happens to the submitted data and notes.",
        ],
        avoidItems: [
          "Screen-blocking modal that stops the user workflow.",
          "Demanding language with no clear benefit to the user.",
          "Forces users to write detailed text without quick options.",
          "Uses vague wording about where the feedback data goes.",
        ],
      },
    },
  ]

  return (
    <main className="site-page">
      <div className="page-shell dashboard-shell">
        <header className="dashboard-header">
          <h1>Dashboard Design Pattern</h1>
          <p>
            Pattern guides to design a Human Centered Dashboard with AI-infused
            features. Choose one of the principles, check the guidelines and
            use it to compass your design.
          </p>
        </header>
        <div className="dashboard-layout">
          <aside className="guideline-sidebar dashboard-sidebar">
            <strong>Principles</strong>
            {guidelines.map((guideline, index) => (
              <button
                className={index === 0 ? "active" : ""}
                key={guideline.id}
                onClick={() => openPrinciple(guideline.id)}
                type="button"
              >
                {guideline.title}
              </button>
            ))}
          </aside>
          <div className="dashboard-content">
            <article className="dashboard-principle">
              <h2>User Experience</h2>
              <div className="dark-pills mt-2">
                {guidelines[0].patterns.map((pattern) => (
                  <span key={pattern}>{pattern}</span>
                ))}
              </div>
              <p>{guidelines[0].description}</p>
            </article>
            {dashboardSections.map(({ key, content }, index) => (
              <section className="dashboard-pattern" key={key}>
                <div className="pattern-heading">
                  <h2>{content.title}</h2>
                  <button onClick={() => openGuideline(key)} type="button">
                    {content.label}
                    <ArrowIcon />
                  </button>
                </div>
                <DoAvoid content={content} />
                {index < dashboardSections.length - 1 && <Divider />}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function ProductPage({
  examples,

  onBack,

  onOpenExample,

  product,

  selectedCapabilities,

  selectedGuidelines,

  selectedPrinciples,
}: {
  examples: FeatureExample[]

  onBack: () => void

  onOpenExample: (example: FeatureExample, capability: string) => void

  product: string

  selectedCapabilities: string[]

  selectedGuidelines: string[]

  selectedPrinciples: string[]
}) {
  const capabilities = aiCapabilities.filter(
    (capability) =>
      (selectedCapabilities.length === 0 ||
        selectedCapabilities.includes(capability)) &&
      examples.some((example) =>
        analyticsMatrix[product]?.[example.type]?.includes(capability),
      ),
  )

  const hasGuidelineFilters =
    selectedGuidelines.length > 0 || selectedPrinciples.length > 0

  return (
    <div>
      <section className="rounded-[1.4rem] border border-[#cfe1ee] bg-white p-6 sm:p-8">
        <button className="back-button" onClick={onBack} type="button">
          <BackIcon />
          Back to all products
        </button>
        <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-[#006cb8] uppercase">
          Product type
        </p>
        <div className="mt-4 grid gap-5 xl:grid-cols-[1fr_400px] xl:items-end">
          <h1 className="text-4xl font-semibold tracking-[-0.045em] text-[#082542] sm:text-5xl">
            {product}
          </h1>
          <p className="text-base leading-7 text-[#557087]">
            Explore interface examples organized by the AI capabilities this
            product can support. Each example combines an AI type with its
            relevant HCAI design principles.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {capabilities.map((capability) => (
            <span className="capability-tag" key={capability}>
              {capability}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-12">
        {capabilities.map((capability, capabilityIndex) => {
          const capabilityExamples = examples.filter((example) =>
            analyticsMatrix[product]?.[example.type]?.includes(capability),
          )

          if (capabilityExamples.length === 0) {
            return null
          }

          return (
            <section key={capability}>
              <div className="flex items-end justify-between gap-5 border-b border-[#cfe1ee] pb-5">
                <div className="flex items-center gap-4">
                  <span className="product-accordion-number">
                    {String(capabilityIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-bold tracking-[0.14em] text-[#557087] uppercase">
                      AI capability
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#082542]">
                      {capability}
                    </h2>
                  </div>
                </div>
                <span className="text-sm text-[#557087]">
                  {capabilityExamples.length} example
                  {capabilityExamples.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {capabilityExamples.map((example) => {
                  const appliedGuidelines = example.appliedGuidelines.filter(
                    (guideline) =>
                      !hasGuidelineFilters ||
                      selectedGuidelines.includes(guideline.id) ||
                      selectedPrinciples.includes(
                        getPrincipleFilterId(
                          guideline.id,

                          guideline.designGuideline,
                        ),
                      ),
                  )

                  return (
                    <article
                      className="feature-example-card"
                      key={`${capability}-${example.id}`}
                    >
                      <button
                        aria-label={`Open ${example.type} for ${product} implementation`}
                        className="feature-card-link"
                        onClick={() => onOpenExample(example, capability)}
                        type="button"
                      />
                      <div className="flex flex-wrap gap-2">
                        {appliedGuidelines.map((guideline) => (
                          <span
                            className="feature-design-tag"
                            key={guideline.id}
                          >
                            {guideline.designGuideline}
                          </span>
                        ))}
                        <span className="feature-tag">{example.type}</span>
                      </div>
                      <h3 className="mt-7 text-lg font-semibold tracking-[-0.02em] text-[#082542]">
                        {example.type} for {product}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#5a7186]">
                        {example.description}
                      </p>
                      <div className="mt-5 border-t border-[#dcebe4] pt-4">
                        <p className="text-[0.68rem] font-bold tracking-[0.12em] text-[#557087] uppercase">
                          Supports
                        </p>
                        {appliedGuidelines.map((guideline) => (
                          <p
                            className="mt-2 text-sm leading-5 text-[#294b68]"
                            key={guideline.id}
                          >
                            {guideline.title}
                          </p>
                        ))}
                      </div>
                      <span className="feature-card-action">
                        View implementation
                        <ArrowIcon />
                      </span>
                    </article>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

const principleImplementation: Record<string, string[]> = {
  Interpretability: [
    "Show the inputs and factors that most influenced the result.",

    "Communicate confidence, uncertainty, and known limitations.",

    "Let users inspect the source information behind the output.",
  ],

  Transparency: [
    "Clearly label AI-generated recommendations and content.",

    "Identify the data sources and system status used for the result.",

    "Keep a visible record of AI and human actions.",
  ],

  Explainability: [
    "Explain the result in language appropriate for the user.",

    "Present key reasons, alternatives, and consequences.",

    "Provide a path to question, correct, or appeal the result.",
  ],

  "Machine Autonomy": [
    "Require human approval before consequential actions.",

    "Provide pause, override, and rollback controls.",

    "Make autonomous boundaries and escalation rules visible.",
  ],
}

function FeatureDetailPage({
  capability,

  example,

  onBack,
  onBackToHcai,
  onBackToGuidebooks,
}: {
  capability: string

  example: FeatureExample

  onBack: () => void
  onBackToHcai: () => void
  onBackToGuidebooks: () => void
}) {
  return (
    <main className="min-h-screen bg-[#f7faff] text-[#09233f]">
      <PageHeader
        breadcrumbs={[
          { label: "Guidelines", onClick: onBackToGuidebooks },
          { label: "HCAI", onClick: onBackToHcai },
          { label: "Examples", onClick: onBack },
          { label: example.product },
          { label: `${example.type} implementation` },
        ]}
      />
      <div className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        <header className="mt-10 max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <span className="capability-tag">{capability}</span>
            <span className="feature-tag">{example.type}</span>
          </div>
          <p className="mt-7 text-xs font-semibold tracking-[0.18em] text-[#006cb8] uppercase">
            Feature implementation
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-semibold tracking-[-0.045em] text-[#082542] sm:text-5xl">
            {example.type} for {example.product}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#557087]">
            A reference interface showing how this feature can communicate AI
            output while preserving meaningful human understanding and control.
          </p>
        </header>

        <section className="mt-12">
          <div
            aria-label={`Example interface for ${example.type} in a ${example.product}`}
            className="feature-screenshot"
            role="img"
          >
            <div className="feature-screenshot-bar">
              <span />
              <span />
              <span />
              <strong>{example.product} intelligence</strong>
            </div>
            <div className="feature-screenshot-body">
              <div className="feature-screenshot-nav">
                <span className="feature-screenshot-logo">AI</span>
                <span className="feature-screenshot-nav-line" />
                <span className="feature-screenshot-nav-line" />
                <span className="feature-screenshot-nav-line" />
              </div>
              <div className="feature-screenshot-content">
                <div>
                  <p className="feature-screenshot-kicker">{capability} view</p>
                  <h2>Decision overview</h2>
                </div>
                <div className="feature-screenshot-grid">
                  <div className="feature-screenshot-chart">
                    <div className="feature-screenshot-chart-header">
                      <span>AI analysis</span>
                      <strong>84% confidence</strong>
                    </div>
                    <div className="feature-screenshot-bars">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="feature-screenshot-factors">
                      <span>Primary factor</span>
                      <span>Context</span>
                      <span>Historical signal</span>
                    </div>
                  </div>
                  <div className="feature-screenshot-recommendation">
                    <span className="feature-screenshot-ai-label">
                      AI recommendation
                    </span>
                    <h3>Review before applying</h3>
                    <p>
                      Inspect the contributing factors and confirm the result
                      before continuing.
                    </p>
                    <div className="feature-screenshot-actions">
                      <span>View reasoning</span>
                      <strong>Approve</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-[#557087]">
            Illustrative feature screenshot for implementation guidance.
          </p>
        </section>

        <section className="mt-14 border-t border-[#bfd8eb] pt-10">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#006cb8] uppercase">
            Guidelines implementation
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#082542]">
            How the feature supports HCAI principles
          </h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {example.appliedGuidelines.map((guideline) => (
              <article className="implementation-card" key={guideline.id}>
                <span className="feature-design-tag">
                  {guideline.designGuideline}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-[#082542]">
                  {guideline.title}
                </h3>
                <ul className="mt-5 grid gap-3">
                  {(
                    principleImplementation[guideline.designGuideline] ?? [
                      "Make the principle visible at the point of interaction.",

                      "Provide clear feedback and an actionable user control.",

                      "Test the implementation with the people affected by it.",
                    ]
                  )

                    .map((step) => (
                      <li className="implementation-step" key={step}>
                        <span aria-hidden="true" />
                        {step}
                      </li>
                    ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function DesignLibraryPage({
  initialGoals,

  initialGuidelineId,

  initialPrinciple,

  onBack,
  onBackToGuidebooks,
}: {
  initialGoals?: string[]

  initialGuidelineId?: string

  initialPrinciple?: string

  onBack: () => void

  onBackToGuidebooks: () => void
}) {
  const [selectedGuidelines, setSelectedGuidelines] = useState<string[]>(
    initialGuidelineId && !initialPrinciple ? [initialGuidelineId] : [],
  )

  const [selectedPrinciples, setSelectedPrinciples] = useState<string[]>(
    initialGuidelineId && initialPrinciple
      ? [getPrincipleFilterId(initialGuidelineId, initialPrinciple)]
      : [],
  )

  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    initialGoals ?? [],
  )

  const [openGuidelineFilters, setOpenGuidelineFilters] = useState<string[]>(
    initialGuidelineId ? [initialGuidelineId] : [],
  )

  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([])

  const [activeProduct, setActiveProduct] = useState<string | null>(null)

  const [filterOpen, setFilterOpen] = useState(false)

  const [activeFeature, setActiveFeature] = useState<{
    capability: string

    example: FeatureExample
  } | null>(null)

  const [activeLibraryGuidelineId, setActiveLibraryGuidelineId] =
    useState<string | null>(null)

  useEffect(() => {
    if (!initialGuidelineId) {
      return
    }

    requestAnimationFrame(() => {
      document

        .getElementById("feature-examples")

        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [initialGuidelineId])

  const toggleGuideline = (id: string) => {
    const guideline = indexedGuidelines.find((item) => item.id === id)

    const isSelected = selectedGuidelines.includes(id)

    setSelectedGuidelines((current) =>
      isSelected
        ? current.filter((guidelineId) => guidelineId !== id)
        : [...current, id],
    )

    if (!guideline) {
      return
    }

    if (!isSelected) {
      setOpenGuidelineFilters((current) =>
        current.includes(id) ? current : [...current, id],
      )
    }

    const principleIds = guideline.patterns.map((principle) =>
      getPrincipleFilterId(id, principle),
    )

    setSelectedPrinciples((current) =>
      isSelected
        ? current.filter((principleId) => !principleIds.includes(principleId))
        : [...new Set([...current, ...principleIds])],
    )
  }

  const togglePrinciple = (guidelineId: string, principle: string) => {
    const filterId = getPrincipleFilterId(guidelineId, principle)

    if (selectedGuidelines.includes(guidelineId)) {
      setSelectedGuidelines((current) =>
        current.filter((id) => id !== guidelineId),
      )
    }

    setSelectedPrinciples((current) =>
      current.includes(filterId)
        ? current.filter((id) => id !== filterId)
        : [...current, filterId],
    )
  }

  const toggleFilter = (
    value: string,

    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
  }

  const filteredExamples = featureExamples.filter(
    (example) =>
      (selectedTypes.length === 0 || selectedTypes.includes(example.type)) &&
      (selectedProducts.length === 0 ||
        selectedProducts.includes(example.product)) &&
      (selectedCapabilities.length === 0 ||
        selectedCapabilities.some((capability) =>
          analyticsMatrix[example.product]?.[example.type]?.includes(
            capability,
          ),
        )),
  )

  const hasAiFilters =
    selectedTypes.length > 0 ||
    selectedProducts.length > 0 ||
    selectedCapabilities.length > 0

  const relevantGuidelineIds = new Set(
    filteredExamples.flatMap((example) => example.guidelineIds),
  )

  const hasSpecificGuidelineFilters =
    selectedGuidelines.length > 0 || selectedPrinciples.length > 0

  const hasGoalFilters = selectedGoals.length > 0

  const hasGuidelineFilters = hasSpecificGuidelineFilters || hasGoalFilters

  const matchesGuidelineFilter = (guideline: {
    id: string

    designGuideline: string

    goals: string[]
  }) =>
    (!hasSpecificGuidelineFilters ||
      selectedGuidelines.includes(guideline.id) ||
      selectedPrinciples.includes(
        getPrincipleFilterId(guideline.id, guideline.designGuideline),
      )) &&
    (!hasGoalFilters ||
      guideline.goals.some((goal) => selectedGoals.includes(goal)))

  const displayedGuidelines = indexedGuidelines.filter(
    (guideline) =>
      (!hasSpecificGuidelineFilters ||
        selectedGuidelines.includes(guideline.id) ||
        guideline.patterns.some((principle) =>
          selectedPrinciples.includes(
            getPrincipleFilterId(guideline.id, principle),
          ),
        )) &&
      (!hasGoalFilters ||
        guideline.goals.some((goal) => selectedGoals.includes(goal))) &&
      (!hasAiFilters || relevantGuidelineIds.has(guideline.id)),
  )

  const displayedExamples = filteredExamples.filter(
    (example) =>
      !hasGuidelineFilters ||
      example.appliedGuidelines.some(matchesGuidelineFilter),
  )

  const hasFilters = hasGuidelineFilters || hasAiFilters

  const selectedFilterPills = [
    ...selectedGoals.map((value) => ({
      label: value,
      onRemove: () =>
        setSelectedGoals((current) => current.filter((item) => item !== value)),
    })),
    ...selectedGuidelines.map((value) => ({
      label: guidelines.find((guideline) => guideline.id === value)?.title ?? value,
      onRemove: () =>
        setSelectedGuidelines((current) =>
          current.filter((item) => item !== value),
        ),
    })),
    ...selectedPrinciples.map((value) => ({
      label: value.split("::")[1] ?? value,
      onRemove: () =>
        setSelectedPrinciples((current) =>
          current.filter((item) => item !== value),
        ),
    })),
    ...selectedProducts.map((value) => ({
      label: value,
      onRemove: () =>
        setSelectedProducts((current) => current.filter((item) => item !== value)),
    })),
    ...selectedTypes.map((value) => ({
      label: value,
      onRemove: () =>
        setSelectedTypes((current) => current.filter((item) => item !== value)),
    })),
    ...selectedCapabilities.map((value) => ({
      label: value,
      onRemove: () =>
        setSelectedCapabilities((current) =>
          current.filter((item) => item !== value),
        ),
    })),
  ]

  if (activeFeature) {
    return (
      <FeatureDetailPage
        capability={activeFeature.capability}
        example={activeFeature.example}
        onBack={() => setActiveFeature(null)}
        onBackToHcai={onBack}
        onBackToGuidebooks={onBackToGuidebooks}
      />
    )
  }

  const activeLibraryGuideline = indexedGuidelines.find(
    (guideline) => guideline.id === activeLibraryGuidelineId,
  )

  if (activeLibraryGuideline) {
    return (
      <GuidelineDetail
        category={activeLibraryGuideline.category}
        guideline={activeLibraryGuideline}
        number={indexedGuidelines.indexOf(activeLibraryGuideline) + 1}
        onBack={() => {
          setActiveLibraryGuidelineId(null)

          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        onBackToMain={onBack}
        onBackToGuidebooks={onBackToGuidebooks}
        onOpenExamples={(principle, guidelineId) => {
          const sourceGuideline = indexedGuidelines.find(
            (guideline) => guideline.id === guidelineId,
          )

          setSelectedGuidelines([])

          setSelectedPrinciples([getPrincipleFilterId(guidelineId, principle)])

          setSelectedGoals(sourceGuideline?.goals ?? [])

          setOpenGuidelineFilters((current) =>
            current.includes(guidelineId) ? current : [...current, guidelineId],
          )

          setActiveLibraryGuidelineId(null)

          requestAnimationFrame(() => {
            document

              .getElementById("feature-examples")

              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          })
        }}
      />
    )
  }

  return (
    <main className="min-h-screen bg-[#f7faff] text-[#09233f]">
      <PageHeader
        breadcrumbs={[
          { label: "Guidelines", onClick: onBackToGuidebooks },
          { label: "HCAI", onClick: onBack },
          { label: "Examples" },
        ]}
      />
      <div
        className={`mx-auto grid max-w-[1480px] gap-8 px-5 py-8 sm:px-8 lg:px-12 lg:py-12 ${
          activeProduct ? "" : "lg:grid-cols-[310px_minmax(0,1fr)]"
        }`}
      >
        {!activeProduct && (
          <div className="mobile-filter-controls">
            <button
              className="filter-toggle-button"
              onClick={() => setFilterOpen(true)}
              type="button"
            >
              <MenuIcon />
              Filter
            </button>
            {selectedFilterPills.length > 0 && (
              <div aria-label="Selected filters" className="selected-filter-pills">
                {selectedFilterPills.map(({ label, onRemove }) => (
                  <button
                    className="selected-filter-pill"
                    key={label}
                    onClick={onRemove}
                    type="button"
                  >
                    <span>{label}</span>
                    <span aria-hidden="true">x</span>
                    <span className="sr-only">Remove {label} filter</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {!activeProduct && (
          <>
            {filterOpen && (
              <button
                aria-label="Close filter panel"
                className="filter-drawer-backdrop"
                onClick={() => setFilterOpen(false)}
                type="button"
              />
            )}
            <aside className={`filter-panel ${filterOpen ? "is-open" : ""}`}>
              <div className="filter-mobile-header">
                <h2 className="text-lg font-semibold tracking-[-0.02em]">
                  Refine results
                </h2>
                <button
                  aria-label="Close filter panel"
                  className="filter-close-button"
                  onClick={() => setFilterOpen(false)}
                  type="button"
                >
                  Close
                </button>
              </div>
          <div className="filter-desktop-header flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold tracking-[-0.02em]">
              Refine results
            </h2>
            {hasFilters && (
              <button
                className="min-h-11 rounded-lg px-2 text-xs font-semibold text-[#006cb8] hover:underline"
                onClick={() => {
                  setSelectedGuidelines([])

                  setSelectedPrinciples([])

                  setSelectedGoals([])

                  setSelectedTypes([])

                  setSelectedProducts([])

                  setSelectedCapabilities([])
                }}
                type="button"
              >
                Clear all
              </button>
            )}
          </div>

          <fieldset className="mt-7">
            <legend className="filter-legend">Goals</legend>
            <p className="mt-3 text-xs leading-5 text-[#557087]">
              Select one or more goals. Results match any selected goal.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {hcaiGoals.map((goal) => (
                <label className="product-option" key={goal}>
                  <input
                    checked={selectedGoals.includes(goal)}
                    onChange={() => toggleFilter(goal, setSelectedGoals)}
                    type="checkbox"
                  />
                  <span>{goal}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8 border-t border-[#d7e7f2] pt-7">
            <legend className="filter-legend">Guidelines</legend>
            <ul className="mt-5 space-y-4">
              {guidelines.map((guideline) => (
                <li className="guideline-filter-group" key={guideline.id}>
                  <div className="guideline-filter-header">
                    <label className="filter-option filter-option-parent">
                      <input
                        checked={
                          selectedGuidelines.includes(guideline.id) ||
                          (guideline.patterns.length === 1 &&
                            selectedPrinciples.includes(
                              getPrincipleFilterId(
                                guideline.id,

                                guideline.patterns[0],
                              ),
                            ))
                        }
                        onChange={() => {
                          const singlePrincipleId =
                            guideline.patterns.length === 1
                              ? getPrincipleFilterId(
                                  guideline.id,

                                  guideline.patterns[0],
                                )
                              : null

                          if (
                            singlePrincipleId &&
                            selectedPrinciples.includes(singlePrincipleId) &&
                            !selectedGuidelines.includes(guideline.id)
                          ) {
                            setSelectedPrinciples((current) =>
                              current.filter(
                                (principleId) =>
                                  principleId !== singlePrincipleId,
                              ),
                            )

                            return
                          }

                          toggleGuideline(guideline.id)
                        }}
                        type="checkbox"
                      />
                      <span>{guideline.title}</span>
                    </label>
                    {guideline.patterns.length > 1 && (
                      <button
                        aria-controls={`guideline-principles-${guideline.id}`}
                        aria-expanded={openGuidelineFilters.includes(
                          guideline.id,
                        )}
                        aria-label={`${
                          openGuidelineFilters.includes(guideline.id)
                            ? "Hide"
                            : "Show"
                        } design principles for ${guideline.title}`}
                        className={`guideline-filter-toggle ${
                          openGuidelineFilters.includes(guideline.id)
                            ? "guideline-filter-toggle-open"
                            : ""
                        }`}
                        onClick={() =>
                          setOpenGuidelineFilters((current) =>
                            current.includes(guideline.id)
                              ? current.filter((id) => id !== guideline.id)
                              : [...current, guideline.id],
                          )
                        }
                        type="button"
                      >
                        <ChevronIcon />
                      </button>
                    )}
                  </div>
                  {guideline.patterns.length > 1 &&
                    openGuidelineFilters.includes(guideline.id) && (
                      <ul
                        className="guideline-principle-list"
                        id={`guideline-principles-${guideline.id}`}
                      >
                        {guideline.patterns.map((principle) => (
                          <li key={principle}>
                            <label className="filter-option">
                              <input
                                checked={selectedPrinciples.includes(
                                  getPrincipleFilterId(guideline.id, principle),
                                )}
                                onChange={() =>
                                  togglePrinciple(guideline.id, principle)
                                }
                                type="checkbox"
                              />
                              <span>{principle}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))}
            </ul>
          </fieldset>

          <fieldset className="mt-8 border-t border-[#d7e7f2] pt-7">
            <legend className="filter-legend">AI Product</legend>
            <div className="mt-5 flex flex-wrap gap-2">
              {aiProductFilterOptions.map((product) => {
                const isAvailable = product === "Dashboard"

                return (
                <label
                  className={`product-option ${
                    !isAvailable ? "product-option-disabled" : ""
                  }`}
                  key={product}
                >
                  <input
                    checked={selectedProducts.includes(product)}
                    onChange={() => toggleFilter(product, setSelectedProducts)}
                    disabled={!isAvailable}
                    type="checkbox"
                  />
                  <span>{product}</span>
                </label>
                )
              })}
            </div>
          </fieldset>

          <details className="filter-disclosure">
            <summary className="filter-disclosure-summary">
              <span>AI Type</span>
              <span className="filter-disclosure-value">
                {selectedTypes.length > 0
                  ? `${selectedTypes.length} selected`
                  : "Any"}
              </span>
              <span className="filter-disclosure-chevron">
                <ChevronIcon />
              </span>
            </summary>
            <fieldset className="filter-disclosure-panel">
              <legend className="sr-only">AI Type</legend>
              <div className="flex flex-wrap gap-2">
                {aiTypes.map((type) => (
                  <label className="product-option" key={type}>
                    <input
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleFilter(type, setSelectedTypes)}
                      type="checkbox"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </details>

          <details className="filter-disclosure">
            <summary className="filter-disclosure-summary">
              <span>AI Capability</span>
              <span className="filter-disclosure-value">
                {selectedCapabilities.length > 0
                  ? `${selectedCapabilities.length} selected`
                  : "Any"}
              </span>
              <span className="filter-disclosure-chevron">
                <ChevronIcon />
              </span>
            </summary>
            <fieldset className="filter-disclosure-panel">
              <legend className="sr-only">AI Capability</legend>
              <div className="flex flex-wrap gap-2">
                {aiCapabilities.map((capability) => (
                  <label className="product-option" key={capability}>
                    <input
                      checked={selectedCapabilities.includes(capability)}
                      onChange={() =>
                        toggleFilter(capability, setSelectedCapabilities)
                      }
                      type="checkbox"
                    />
                    <span>{capability}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </details>
            </aside>
          </>
        )}

        <div>
          {activeProduct === "Dashboard" ? (
            <DashboardPage
              onBack={() => {
                setActiveProduct(null)

                requestAnimationFrame(() => {
                  document
                    .getElementById("feature-examples")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                })
              }}
              onBackToHcai={onBack}
              onBackToGuidebooks={onBackToGuidebooks}
              openPrinciple={(guidelineId) => {
                setActiveProduct(null)
                setActiveLibraryGuidelineId(guidelineId)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              openGuideline={(key) => {
                if (guidelineContent[key]) {
                  setActiveLibraryGuidelineId("user-experience")
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              }}
            />
          ) : activeProduct ? (
            <ProductPage
              examples={displayedExamples.filter(
                (example) => example.product === activeProduct,
              )}
              onBack={() => {
                setActiveProduct(null)

                requestAnimationFrame(() => {
                  document

                    .getElementById("feature-examples")

                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                })
              }}
              onOpenExample={(example, capability) =>
                setActiveFeature({ capability, example })
              }
              product={activeProduct}
              selectedCapabilities={selectedCapabilities}
              selectedGuidelines={selectedGuidelines}
              selectedPrinciples={selectedPrinciples}
            />
          ) : (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-[#006cb8] uppercase">
                    Step 1 · Understand
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em]">
                    Review guidelines
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#557087]">
                    Start with the principles your product should support, then
                    open a guideline for its rationale and implementation
                    advice.
                  </p>
                </div>
                <p className="text-sm text-[#557087]">
                  {displayedGuidelines.length} guideline
                  {displayedGuidelines.length === 1 ? "" : "s"}
                </p>
              </div>

              {displayedGuidelines.length > 0 ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {displayedGuidelines.map((guideline) => (
                    <article
                      className={`library-guideline-card ${
                        guideline.id === "user-experience"
                          ? ""
                          : "library-guideline-card-disabled"
                      }`}
                      key={guideline.id}
                    >
                      <button
                        aria-label={`Open guideline: ${guideline.title}`}
                        className="library-guideline-link"
                        onClick={() => {
                          setActiveLibraryGuidelineId(guideline.id)

                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                        disabled={guideline.id !== "user-experience"}
                        type="button"
                      />
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {guideline.goals.map((goal) => (
                            <span className="goal-tag-dark" key={goal}>
                              {goal}
                            </span>
                          ))}
                        </div>
                        <span className="card-arrow">
                          <ArrowIcon />
                        </span>
                      </div>
                      <h3 className="mt-auto pt-16 text-xl leading-tight font-semibold tracking-[-0.025em] text-white">
                        {guideline.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/90">
                        {guideline.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {guideline.patterns.map((pattern) => (
                          <span className="pattern-tag" key={pattern}>
                            {pattern}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-library-state">
                  No guidelines match this product and selection.
                </div>
              )}

              <div
                className="mt-14 flex scroll-mt-6 flex-wrap items-end justify-between gap-4 border-t border-[#d7e7f2] pt-10"
                id="feature-examples"
              >
                <div>
                  <h2 className="text-3xl font-semibold tracking-[-0.035em]">
                    Design Pattern Library
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#557087]">
                    Explore product-specific patterns that translate
                    human-centered AI principles into practical interface
                    decisions.
                  </p>
                </div>
                <p className="text-sm text-[#557087]">
                  {aiProductFilterOptions.length} products
                </p>
              </div>

              <div className="mt-8 grid gap-10">
                {aiProductFilterOptions.map((product) => {
                  const isAvailable = product === "Dashboard"

                  return (
                    <article
                      className={`library-guideline-card dashboard-product-card ${
                        !isAvailable ? "dashboard-product-card-disabled" : ""
                      }`}
                      key={product}
                    >
                      <button
                        aria-label={`Open ${product} Design Pattern`}
                        className="library-guideline-link"
                        disabled={!isAvailable}
                        onClick={() => {
                          setActiveProduct(product)
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                        type="button"
                      />
                      <div className="flex items-start justify-between gap-4">
                        <span className="goal-tag-dark">
                          Product design pattern
                        </span>
                        <span className="card-arrow">
                          <ArrowIcon />
                        </span>
                      </div>
                      <h3 className="mt-auto pt-12 text-3xl leading-tight font-semibold tracking-[-0.04em] text-white">
                        {product}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90">
                        {isAvailable
                          ? "Explore human-centered AI patterns for dashboard products, including context-aware, usable, and feedback-driven experiences."
                          : "Design patterns for this product are coming soon."}
                      </p>
                    </article>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

function App() {
  const [page, setPage] = useState<Page>("gateway")

  const [copilotExpanded, setCopilotExpanded] = useState(false)

  const [libraryGuidelineId, setLibraryGuidelineId] =
    useState<string | undefined>()

  const [libraryPrinciple, setLibraryPrinciple] = useState<string | undefined>()

  const [libraryGoals, setLibraryGoals] = useState<string[]>([])

  const navigate = (nextPage: Page) => {
    setLibraryGuidelineId(undefined)

    setLibraryPrinciple(undefined)

    setLibraryGoals([])

    setPage(nextPage)

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const openGuidelineExamples = (principle: string, guidelineId: string) => {
    const sourceGuideline = guidelines.find(
      (guideline) => guideline.id === guidelineId,
    )

    setLibraryGuidelineId(guidelineId)

    setLibraryPrinciple(principle)

    setLibraryGoals(sourceGuideline?.goals ?? [])

    setPage("library")
  }

  let content: ReactNode

  if (page === "guidelines") {
    content = (
      <GuidelinesPage
        onBack={() => navigate("main")}
        onBackToMain={() => navigate("main")}
        onBackToGuidebooks={() => navigate("gateway")}
        onOpenExamples={openGuidelineExamples}
      />
    )
  } else if (page === "library") {
    content = (
      <DesignLibraryPage
        initialGoals={libraryGoals}
        initialGuidelineId={libraryGuidelineId}
        initialPrinciple={libraryPrinciple}
        onBack={() => navigate("main")}
        onBackToGuidebooks={() => navigate("gateway")}
      />
    )
  } else if (page === "ux") {
    content = <UXContent onBack={() => navigate("gateway")} />
  } else if (page === "ui") {
    content = <UIContent onBack={() => navigate("gateway")} />
  } else if (page === "main") {
    content = (
      <MainPage onBack={() => navigate("gateway")} onNavigate={navigate} />
    )
  } else {
    content = (
      <GuidebookHub
        onOpenHcai={() => navigate("main")}
        onOpenUi={() => navigate("ui")}
        onOpenUx={() => navigate("ux")}
      />
    )
  }

  return (
    <div className={copilotExpanded ? "app-shell copilot-layout" : "app-shell"}>
      {content}
      <CopilotChat
        expanded={copilotExpanded}
        onExpandedChange={setCopilotExpanded}
      />
    </div>
  )
}

function CopilotChat({
  expanded,

  onExpandedChange,
}: {
  expanded: boolean

  onExpandedChange: (expanded: boolean) => void
}) {
  const [open, setOpen] = useState(false)

  const [draft, setDraft] = useState("")

  const [messages, setMessages] = useState([
    "Hi! I can help you find the right Pertamina guideline.",
  ])

  useEffect(() => {
    if (!open) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)

        onExpandedChange(false)
      }
    }

    window.addEventListener("keydown", closeOnEscape)

    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [open])

  const sendMessage = () => {
    const message = draft.trim()

    if (!message) return

    setMessages((current) => [...current, message])

    setDraft("")
  }

  return (
    <>
      {open && (
        <aside
          aria-label="Pertamina Copilot chat"
          className={`copilot-drawer ${expanded ? "is-expanded" : ""}`}
        >
          <div className="copilot-drawer-header">
            <div className="flex items-center gap-3">
              <span className="copilot-avatar" aria-hidden="true">
                ✦
              </span>
              <div>
                <p className="copilot-title">Pertamina Copilot</p>
                <p className="copilot-status">
                  <span />
                  Ready to help
                </p>
              </div>
            </div>
            <div className="copilot-header-actions">
              <button
                aria-label={
                  expanded
                    ? "Make chat panel smaller"
                    : "Make chat panel larger"
                }
                className="copilot-expand"
                onClick={() => onExpandedChange(!expanded)}
                type="button"
              >
                {expanded ? "↙" : "↗"}
              </button>
              <button
                aria-label="Close chat"
                className="copilot-close"
                onClick={() => {
                  setOpen(false)

                  onExpandedChange(false)
                }}
                type="button"
              >
                ×
              </button>
            </div>
          </div>

          <div className="copilot-context">
            <p className="copilot-context-label">Knowledge &amp; context</p>
            <div className="copilot-pills">
              <span>UI Guidelines</span>
              <span>UX Flow</span>
              <span>HCAI</span>
            </div>
          </div>

          <div aria-live="polite" className="copilot-messages">
            {messages.map((message, index) => (
              <div
                className={
                  index === 0
                    ? "copilot-message copilot-message-bot"
                    : "copilot-message copilot-message-user"
                }
                key={`${message}-${index}`}
              >
                {message}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="copilot-suggestions">
                <button
                  onClick={() =>
                    setDraft(
                      "How do I achieve a reliable design for a Dashboard AI product?",
                    )
                  }
                  type="button"
                >
                  How do I achieve a reliable design for a Dashboard AI product?
                </button>
                <button
                  onClick={() =>
                    setDraft(
                      "What HCAI principles should guide an AI dashboard?",
                    )
                  }
                  type="button"
                >
                  What HCAI principles should guide an AI dashboard?
                </button>
                <button
                  onClick={() =>
                    setDraft(
                      "How can I make an AI product feel trustworthy and easy to use?",
                    )
                  }
                  type="button"
                >
                  How can I make an AI product feel trustworthy and easy to use?
                </button>
              </div>
            )}
          </div>

          <div className="copilot-composer">
            <textarea
              aria-label="Message Pertamina Copilot"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()

                  sendMessage()
                }
              }}
              placeholder="Ask an HCAI question..."
              rows={1}
              value={draft}
            />
            <button
              aria-label="Send message"
              disabled={!draft.trim()}
              onClick={sendMessage}
              type="button"
            >
              ↑
            </button>
          </div>
          <p className="copilot-disclaimer">
            Dummy assistant · Responses are for demonstration
          </p>
        </aside>
      )}
      <button
        aria-expanded={open}
        aria-label={open ? "Close Pertamina Copilot" : "Open Pertamina Copilot"}
        className={`copilot-fab ${open ? "is-open" : ""}`}
        onClick={() => {
          setOpen((current) => {
            const next = !current

            if (!next) onExpandedChange(false)

            return next
          })
        }}
        type="button"
      >
        <span aria-hidden="true">✦</span>
      </button>
    </>
  )
}

export default App
