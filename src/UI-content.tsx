import { useState } from "react"
import type { ReactNode } from "react"
import ArrowIcon from "./arrow-icon"

/* ---------- Types ---------- */
type Row = (string | number)[]
type Block = { kind: "swatches"; title: string; colors: [string, string][] } | {
  kind: "table"
  head: string[]
  rows: Row[]
} | {
  kind: "type-table"
} | { kind: "list"; title: string; items: string[]; ordered?: boolean } | {
  kind: "code"
  code: string
} | { kind: "logo-preview"; title: string } | {
  kind: "icon-preview"
  title: string
} | { kind: "preview"; name: "kpi" | "table" }
type Section = { label: string; title: string; blocks: Block[]; open?: boolean }
type DocPage = {
  id: string
  group: string
  title: string
  intro: ReactNode
  sections: Section[]
}

/* ---------- Content (Pertamina Digital Hub UI standards, in English) ---------- */
const PRIMARY: [string, string][] = [
  ["Primary Navy", "#0D2B4E"],
  ["Primary Blue", "#1B5FAD"],
  ["Mid Blue", "#2B7DC0"],
  ["Sky / Highlight", "#D5E8F6"],
  ["White / BG", "#FFFFFF"],
]
const SECONDARY: [string, string][] = [
  ["Alert / Red", "#EE1A2E"],
  ["Success / Green", "#3DAE2B"],
  ["Lime / Accent", "#A9C437"],
  ["Warning / Orange", "#E07B00"],
  ["Text / Gray", "#595959"],
]
const TYPE_SCALE: [string, string, number, number, string, string][] = [
  ["Display / Hero", "32–40", 36, 700, "24–30", "Page title, KPI numbers"],
  ["H1 — Page Title", "24–28", 26, 700, "18–21", "Main section title"],
  ["H2 — Section", "20–22", 21, 600, "15–17", "Sub-section, panel title"],
  ["H3 — Subsection", "16–18", 17, 500, "12–14", "Group label, accordion"],
  ["Body / Regular", "14–16", 15, 400, "10–12", "Paragraphs, descriptions"],
  ["Caption / Label", "12", 12, 400, "9", "Chart label, tooltip, footnote"],
  ["Menu / Navigation", "13–14", 13, 500, "10", "Sidebar menu, breadcrumb"],
  ["Table Content", "13", 13, 400, "9.5", "Table cells, data lists"],
]
const tokens = [...PRIMARY, ...SECONDARY]
  .map(
    ([n, h]) => `  --color-${n.toLowerCase().replace(/[^a-z]+/g, "-")}: ${h};`,
  )
  .join("\n")

const specs = (head: string[], rows: Row[]): Block => ({
  kind: "table",
  head,
  rows,
})
const S = ["Element", "Specification"]

const pages: DocPage[] = [
  {
    id: "logo",
    group: "Identity",
    title: "Logo Standards",
    intro:
      "Each use case has its own distinct identity while staying part of one Pertamina brand family. A use-case logo combines the Pertamina logo (symbol + wordmark) with the use-case name set in Futura.",
    sections: [
      {
        label: "Principles",
        title: "Visual identity principles",
        blocks: [
          specs(["Principle", "Meaning"], [
            [
              "Consistent",
              "All use cases share the same logo structure as the Pertamina standard.",
            ],
            [
              "Modular",
              "Each use case gets a distinguishing identity without losing the parent identity.",
            ],
            [
              "Scalable",
              "The system extends to new use cases without designing from scratch.",
            ],
          ]),
        ],
      },
      {
        label: "Specification",
        title: "Use-case logo structure",
        blocks: [
          { kind: "logo-preview", title: "Use-case logo previews" },
          specs(S, [
            [
              "Pertamina symbol",
              "Official PT Pertamina (Persero) logo — must not be modified",
            ],
            [
              "'PERTAMINA' wordmark",
              "Uppercase, set in the official Pertamina typeface",
            ],
            ["Use-case name", "Futura Bold — may use a different accent color"],
            [
              "Placement",
              "Top-left corner of the page, above the navigation bar",
            ],
            ["Minimum size", "No smaller than 120px wide on digital displays"],
            [
              "Clear space",
              "At least the height of the letter 'P' on all sides",
            ],
          ]),
        ],
      },
      {
        label: "Rules",
        title: "Usage rules",
        blocks: [
          {
            kind: "list",
            title: "Do not",
            items: [
              "Change the proportions or colors of the Pertamina logo",
              "Add drop shadows or visual effects to the logo",
              "Place the logo on a low-contrast background",
              "Use a font other than Futura for the use-case name",
              "Create a new logo without following the modular structure",
            ],
          },
          {
            kind: "list",
            title: "Always",
            items: [
              "Use SVG or high-resolution PNG logo files",
              "Leave enough clear space around the logo",
              "Use the monochrome (white/black) version when the background does not support color",
              "Store logo assets in a central design repository (Figma / Design System)",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "color",
    group: "Design Standards",
    title: "Color System",
    intro:
      "The palette grows from Pertamina's core colors (blue, red, green) with shades that suit digital interfaces. Extra blue variations support differentiation between use cases.",
    sections: [
      {
        label: "Preview",
        title: "Palette",
        blocks: [
          { kind: "swatches", title: "Primary", colors: PRIMARY },
          { kind: "swatches", title: "Secondary & accent", colors: SECONDARY },
        ],
      },
      {
        label: "Specification",
        title: "Color usage by function",
        blocks: [
          specs(["Function", "Color"], [
            ["Main page background", "#F5F6FA (Light Gray)"],
            ["Header / App bar", "#0D2B4E (Navy)"],
            ["Navigation sidebar", "#1B5FAD (Blue) for the active item"],
            ["Card / container", "#FFFFFF with #D0D8E8 border"],
            ["Success status", "#3DAE2B (Green)"],
            ["Error status", "#EE1A2E (Red)"],
            ["Warning status", "#E07B00 (Orange)"],
            ["Primary text", "#1C1C1C (Near Black)"],
            ["Secondary text / label", "#595959 (Gray)"],
            ["Highlight / selected", "#D5E8F6 (Sky Blue)"],
          ]),
        ],
      },
      {
        label: "Code",
        title: "Color tokens",
        open: false,
        blocks: [{ kind: "code", code: `:root {\n${tokens}\n}` }],
      },
    ],
  },
  {
    id: "typography",
    group: "Design Standards",
    title: "Typography",
    intro: (
      <>
        <span>Futura</span> is the main typeface across Pertamina Digital Hub
        platforms. <strong>Inter</strong> and <strong>DIN</strong> are chosen for
        screen optimization, high legibility at many sizes, and availability as
        Google Web Fonts that can be uploaded to Power BI.
      </>
    ),
    sections: [
      {
        label: "Specification",
        title: "Typography scale",
        blocks: [{ kind: "type-table" }],
      },
    ],
  },
  {
    id: "icons",
    group: "Design Standards",
    title: "Iconography",
    intro:
      "Icons are outlined and lightweight for performance and adaptability across themes and backgrounds. The chosen library is open source and large enough to support new use cases.",
    sections: [
      {
        label: "Specification",
        title: "Icon attributes",
        blocks: [
          { kind: "icon-preview", title: "Icon showcase" },
          specs(["Attribute", "Standard"], [
            [
              "Style",
              "Outlined (not filled) — consistent with the clean, lightweight principle",
            ],
            ["Grid size", "24×24px base; 16×16px for inline and table use"],
            ["Stroke width", "1.5px for icon outlines"],
            [
              "Color",
              "Follow color tokens — use variables, not hardcoded values",
            ],
            [
              "Reference library",
              "Untitled UI Icons (Figma) — open source, 1,000+ icons",
            ],
            [
              "Categories",
              "General, Arrows, Charts, Communication, Users, Alerts & Feedback, Media",
            ],
            ["Export format", "SVG for web; PNG @2x for Power BI"],
            [
              "Required icons",
              "at-sign, bookmark, eye, filter-funnel, log-in/out, edit, building",
            ],
          ]),
        ],
      },
      {
        label: "Rules",
        title: "Usage rules",
        blocks: [
          {
            kind: "list",
            title: "Icon rules",
            items: [
              "Do not mix icon styles (filled vs outlined) on one page",
              "Always use icons from one library",
              "For Power BI: export as PNG @2x and store in /assets/icons/",
              "Keep icon size consistent across cards and panels",
              "Use one uniform style for the information icon (ⓘ) across the platform",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "left-nav",
    group: "UI Patterns",
    title: "Left Navigation",
    intro:
      "Navigation has two layers: a Left Navigation Bar (main vertical navigation) and a Top Bar (controls, filters, breadcrumb). Both are modular and can be adjusted per use case.",
    sections: [
      {
        label: "Specification",
        title: "Left navigation bar",
        blocks: [
          specs(S, [
            [
              "Layout type",
              "Expanded (with text labels) or Collapsed (icons only)",
            ],
            [
              "Power BI recommendation",
              "Pick ONE main layout type — mixed is not advised because of Power BI limitations",
            ],
            [
              "Active item",
              "#1B5FAD background, white text, with a vertical indicator line",
            ],
            ["Inactive item", "#595959 text, outline icon"],
            ["Sub-menu", "Shown indented under the parent menu when expanded"],
            [
              "Bottom elements",
              "'Last Updated' timestamp, data version, Pertamina Digital Hub copyright",
            ],
            ["Expanded width", "220–240px"],
            ["Collapsed width", "56–64px"],
          ]),
        ],
      },
    ],
  },
  {
    id: "top-bar",
    group: "UI Patterns",
    title: "Top Bar",
    intro:
      "The top bar holds the use-case logo, breadcrumb, page title, filters and contextual actions.",
    sections: [
      {
        label: "Specification",
        title: "Top bar components",
        blocks: [
          specs(["Component", "Function & specification"], [
            ["Use-case logo", "Top-left — consistent on all pages"],
            [
              "Breadcrumb",
              "Shows location: Parent > Current Page, with a back button",
            ],
            ["Page title", "Active page title, bold, H1 size"],
            [
              "Filter controls",
              "Dropdown filters (Area, City, Status, Date) — top right",
            ],
            [
              "Reset button",
              "'Reset Filter' or 'Default' at the end of the filter area",
            ],
            [
              "Action buttons",
              "Contextual actions per page (Download, Refresh, Export)",
            ],
          ]),
        ],
      },
      {
        label: "Rules",
        title: "Breadcrumb standard",
        blocks: [
          {
            kind: "list",
            title: "Breadcrumb",
            items: [
              "Must appear on all pages except Overview/Home",
              "Format: [Parent Section] / [Current Page], e.g. Demand Forecasting / Overview",
              "Use '/' or '>' as the separator",
              "Show the active page in bold",
              "Clicking the parent uses the back button (←) left of the title",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "kpi-card",
    group: "UI Patterns",
    title: "KPI Card",
    intro: "Summary cards show the headline value with its context and trend.",
    sections: [
      {
        label: "Preview",
        title: "Summary card",
        blocks: [{ kind: "preview", name: "kpi" }],
      },
      {
        label: "Specification",
        title: "Card specification",
        blocks: [
          specs(S, [
            ["Main value", "Display size (32–40px Bold) — the main KPI number"],
            [
              "Card label",
              "Short description above or below the value, Caption size",
            ],
            ["Icon", "24px icon top-right, color follows context"],
            ["Background", "White (#FFFFFF) with a thin #D0D8E8 border"],
            ["Border radius", "8px"],
            ["Padding", "16px on all sides"],
            [
              "Context label",
              "Filter/period label under the main value (gray)",
            ],
            ["Trend indicator", "↑↓ arrow icon in green/red"],
          ]),
        ],
      },
    ],
  },
  {
    id: "data-table",
    group: "UI Patterns",
    title: "Data Table",
    intro:
      "Data tables use a navy header, alternating rows, status badges, and mandatory pagination.",
    sections: [
      {
        label: "Preview",
        title: "Data table",
        blocks: [{ kind: "preview", name: "table" }],
      },
      {
        label: "Specification",
        title: "Table specification",
        blocks: [
          specs(S, [
            ["Header row", "#0D2B4E (Navy) background, white bold text"],
            ["Alternating rows", "White and #F5F6FA (Light Gray)"],
            [
              "Pagination",
              "REQUIRED on all data tables — format: < 1 2 3 ... > below the table",
            ],
            [
              "Table search/filter",
              "'Search by...' input above the table, right-aligned",
            ],
            ["Sort column", "↑↓ icon in sortable column headers"],
            [
              "Status badge",
              "Colored pill/badge for status columns (red/green/yellow)",
            ],
            ["Min row height", "40px for readability"],
          ]),
        ],
      },
    ],
  },
  {
    id: "chart",
    group: "UI Patterns",
    title: "Chart & Visualization",
    intro:
      "Charts follow one consistent structure for legend, title, tooltip and grid.",
    sections: [
      {
        label: "Specification",
        title: "Chart specification",
        blocks: [
          specs(S, [
            ["Legend", "ALWAYS below the chart — not beside or above it"],
            [
              "Chart colors",
              "Use the sequential color palette from the Design System",
            ],
            ["Chart title", "Top left of the chart, Bold, H3 size (16–18px)"],
            ["Tooltip", "Appears on hover — shows detail value and label"],
            [
              "Info button",
              "ⓘ icon top-right of the chart — used instead of a subtitle",
            ],
            ["Grid lines", "Horizontal, #D0D8E8 at 50% opacity"],
          ]),
        ],
      },
    ],
  },
  {
    id: "powerbi",
    group: "UI Patterns",
    title: "Power BI Implementation",
    intro:
      "Guidance for applying the design standards in Power BI, working around platform limits.",
    sections: [
      {
        label: "Steps",
        title: "Implementation steps",
        blocks: [
          {
            kind: "list",
            ordered: true,
            title: "Steps",
            items: [
              "Upload the Inter font as a custom font in Power BI Desktop before publishing",
              "Build navigation with Shapes and Buttons — not built-in Power BI visuals",
              "Export all icons as PNG @2x and keep them in an organized asset folder",
              "Choose one navigation layout (expanded/collapsed) at the start — changing mid-project is costly",
              "Use Themes (.json) to keep colors consistent across all report pages",
              "Save a page template as 'Blank Page Template' for the whole team",
            ],
          },
        ],
      },
    ],
  },
]

const groups = [...new Set(pages.map((p) => p.group))]

/* ---------- Small icons ---------- */
const Icon = ({ d }: { d: string }) => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
    <path
      d={d}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
)
const BackIcon = () => <Icon d="m12 5-5 5 5 5" />
const ChevronIcon = () => <Icon d="m5 7.5 5 5 5-5" />

const readableOn = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#082542" : "#ffffff"
}

/* ---------- Live previews (Pertamina tokens are scoped to the sample only) ---------- */
function Preview({ name }: { name: "kpi" | "table" }) {
  if (name === "kpi")
    return (
      <div className="implementation-card grid gap-4">
        <h3 className="detail-section-label">Scorecard types</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {["KPI scorecard", "Trend scorecard", "Status scorecard"].map(
            (label) => (
              <figure className="m-0" key={label}>
                <div
                  aria-label={`${label} dummy preview`}
                  className="grid min-h-32 place-items-center rounded-xl border-2 border-dashed border-[#9bb8d1] bg-[#f7faff] px-4 text-center text-sm font-semibold text-[#557087]"
                  role="img"
                >
                  Dummy rectangle
                </div>
                <figcaption className="mt-2 text-sm font-semibold text-[#082542]">
                  {label}
                </figcaption>
              </figure>
            ),
          )}
        </div>
        <p className="text-sm leading-6 text-[#557087]">
          Placeholder previews for three scorecard patterns. Replace each
          rectangle with the approved scorecard design.
        </p>
      </div>
    )
  const rows: [string, string, string, string][] = [
    ["Surabaya", "1,240", "On track", "#3DAE2B"],
    ["Malang", "860", "Warning", "#E07B00"],
    ["Madiun", "430", "Critical", "#EE1A2E"],
  ]
  return (
    <div className="implementation-card grid gap-3">
      <input
        aria-label="Search by city"
        placeholder="Search by..."
        style={{
          justifySelf: "end",
          border: "1px solid #D0D8E8",
          borderRadius: 8,
          padding: "6px 10px",
          fontSize: 13,
        }}
        type="search"
      />
      <div className="overflow-x-auto">
        <table
          style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ background: "#0D2B4E", color: "#fff" }}>
              {["City ↑↓", "Volume ↑↓", "Status"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  style={{ textAlign: "left", padding: "0 12px", height: 40 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([c, v, s, col], i) => (
              <tr
                key={c}
                style={{ background: i % 2 ? "#F5F6FA" : "#fff", height: 40 }}
              >
                <td style={{ padding: "0 12px" }}>{c}</td>
                <td style={{ padding: "0 12px" }}>{v}</td>
                <td style={{ padding: "0 12px" }}>
                  <span
                    style={{
                      background: col,
                      color: "#fff",
                      borderRadius: 999,
                      padding: "2px 10px",
                      fontSize: 12,
                    }}
                  >
                    {s}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ justifySelf: "center", fontSize: 13, color: "#595959" }}>
        &lt; 1 2 3 ... &gt;
      </p>
    </div>
  )
}

/* ---------- Block renderers ---------- */
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <div className="grid gap-3">
      <pre
        className="overflow-x-auto rounded-2xl bg-[#082542] p-4 text-[0.78rem] leading-relaxed text-[#e7f3fc]"
        tabIndex={0}
      >
        <code>{code}</code>
      </pre>
      <button
        aria-live="polite"
        className="toolkit-secondary-action w-fit"
        onClick={copy}
        type="button"
      >
        {copied ? "Copied" : "Copy code"}
      </button>
    </div>
  )
}

function TypeScaleTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#cfe1ee] bg-white">
      <table className="w-full min-w-[760px] text-left text-sm text-[#49647d]">
        <thead>
          <tr>
            {["Level", "Size (px)", "Weight", "Power BI (pt)", "Use", ""].map(
              (heading) => (
                <th
                  className="bg-[#e7f3fc] px-4 py-3 text-xs font-bold text-[#082542]"
                  key={heading || "copy"}
                  scope="col"
                >
                  {heading}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {TYPE_SCALE.map(([name, , size, weight, powerBi, use]) => (
            <TypeScaleRow
              key={name}
              name={name}
              powerBi={powerBi}
              size={size}
              use={use}
              weight={weight}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TypeScaleRow({
  name,
  powerBi,
  size,
  use,
  weight,
}: {
  name: string
  powerBi: string
  size: number
  use: string
  weight: number
}) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  )
  const token = `font-family: Inter; font-size: ${size}px; font-weight: ${weight};`

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText(token)
      setCopyState("copied")
      window.setTimeout(() => setCopyState("idle"), 1500)
    } catch {
      setCopyState("failed")
      window.setTimeout(() => setCopyState("idle"), 2000)
    }
  }

  return (
    <tr>
      <th
        className="border-t border-[#e2edf4] px-4 py-3 font-semibold text-[#082542]"
        scope="row"
      >
        {name}
      </th>
      <td className="border-t border-[#e2edf4] px-4 py-3">{size}</td>
      <td className="border-t border-[#e2edf4] px-4 py-3">{weight}</td>
      <td className="border-t border-[#e2edf4] px-4 py-3">{powerBi}</td>
      <td className="border-t border-[#e2edf4] px-4 py-3">{use}</td>
      <td className="border-t border-[#e2edf4] px-4 py-3">
        <button
          aria-label={`Copy ${name} font token`}
          className="toolkit-secondary-action whitespace-nowrap px-3 py-2 text-xs"
          onClick={copyToken}
          type="button"
        >
          {copyState === "copied"
            ? "Copied"
            : copyState === "failed"
              ? "Copy failed"
              : "Copy token"}
        </button>
      </td>
    </tr>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "swatches":
      return (
        <div className="implementation-card">
          <h3 className="detail-section-label">{block.title}</h3>
          <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] gap-3">
            {block.colors.map(([name, hex]) => (
              <figure className="m-0" key={hex + name}>
                <div
                  aria-label={`${name} ${hex}`}
                  className="grid h-20 place-items-end rounded-xl border border-[#d0d8e8] p-2 text-xs font-bold"
                  role="img"
                  style={{ background: hex, color: readableOn(hex) }}
                >
                  {hex}
                </div>
                <figcaption className="detail-section-copy">{name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )
    case "table":
      return (
        <div
          className="overflow-x-auto rounded-2xl border border-[#cfe1ee] bg-white"
          tabIndex={0}
        >
          <table className="w-full text-left text-sm text-[#49647d]">
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th
                    className="bg-[#e7f3fc] px-4 py-3 text-xs font-bold text-[#082542]"
                    key={h}
                    scope="col"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={String(row[0])}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th
                        className="border-t border-[#e2edf4] px-4 py-3 font-semibold text-[#082542]"
                        key={i}
                        scope="row"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td
                        className="border-t border-[#e2edf4] px-4 py-3"
                        key={i}
                      >
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case "type-table":
      return <TypeScaleTable />
    case "list": {
      const Tag = block.ordered ? "ol" : "ul"
      const isDoNot = block.title.toLowerCase() === "do not"
      return (
        <div className="implementation-card">
          <h3
            className={`detail-section-label ${
              isDoNot ? "implementation-do-not-title" : ""
            }`}
          >
            {block.title}
          </h3>
          <Tag
            className={`mt-4 grid gap-3 ${
              block.ordered
                ? "list-decimal pl-5 text-sm leading-6 text-[#557087]"
                : ""
            }`}
          >
            {block.items.map((item) =>
              block.ordered ? (
                <li key={item}>{item}</li>
              ) : (
                <li
                  className={`implementation-step ${
                    isDoNot ? "implementation-step-do-not" : ""
                  }`}
                  key={item}
                >
                  <span aria-hidden="true" />
                  {item}
                </li>
              ),
            )}
          </Tag>
        </div>
      )
    }
    case "code":
      return <CodeBlock code={block.code} />
    case "logo-preview":
      return (
        <div className="implementation-card">
          <h3 className="detail-section-label">{block.title}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="place-items-center bg-[#e7f3fc]">
                  <img
                    alt={`Pertamina logo`}
                    className="h-full w-full object-contain"
                    src="/assets/Logo_Pertamina.png"
                  />
                </div>
          </div>
        </div>
      )
    case "icon-preview":
      return (
        <div className="implementation-card">
          <h3 className="detail-section-label">{block.title}</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["at-sign", "M4 10h12M6 7.5h8a2 2 0 0 1 0 4H9a2 2 0 1 1 0-4"],
              ["bookmark", "M6 4.5h8v11l-4-2.5-4 2.5z"],
              [
                "eye",
                "M3.5 10s2.3-3.5 6.5-3.5 6.5 3.5 6.5 3.5-2.3 3.5-6.5 3.5S3.5 10 3.5 10Z M10 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
              ],
              ["edit", "M12.5 4.5 15.5 7.5M5 15l2.5-.5L15 7l-3-3-7.5 7.5z"],
              ["filter-funnel", "M4 5h12l-4.5 5v4l-3 1v-5z"],
              ["log-in", "M10 5h6v10h-6M4 10h8m-3-3 3 3-3 3"],
              [
                "building",
                "M5 15.5h10M6.5 15.5V5h7v10M8.5 7.5h1m1 0h1m-3 3h1m1 0h1",
              ],
              ["info", "M10 9v5m0-8h.01M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"],
            ].map(([label, path]) => (
              <figure
                aria-label={`Dummy ${label} icon`}
                className="m-0 grid min-h-28 place-items-center rounded-xl border border-[#cfe1ee] bg-[#f7faff] p-3 text-center"
                key={label}
                role="img"
              >
                <div className="grid gap-2 justify-items-center">
                  <svg
                    aria-hidden="true"
                    className="h-8 w-8 text-[#006cb8]"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d={path}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <figcaption className="text-xs font-semibold text-[#557087]">
                    {label}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
          <p className="detail-section-copy mt-4">
            Dummy outlined icons with labels for the required icon set.
          </p>
        </div>
      )
    case "preview":
      return <Preview name={block.name} />
  }
}

function SectionContent({
  section,
  index,
}: {
  section: Section
  index: number
}) {
  return (
    <section className="product-result-section" id={`section-${index + 1}`}>
      <div className="product-accordion-header">
        <span className="flex items-center gap-4 text-left">
          <span className="product-accordion-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            <span className="product-accordion-label">{section.label}</span>
            <span className="product-accordion-title">{section.title}</span>
          </span>
        </span>
      </div>
      <div className="product-result-panel grid gap-4">
        {section.blocks.map((b, i) => (
          <BlockView block={b} key={i} />
        ))}
      </div>
    </section>
  )
}

/* ---------- Page ---------- */
export default function UIContent({ onBack }: { onBack: () => void }) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const [activeId, setActiveId] = useState(pages[0].id)
  const page = pages.find((p) => p.id === activeId) ?? pages[0]
  const groups = [...new Set(pages.map((p) => p.group))]
  const previewCards = [
    {
      group: "Identity",
      code: "01",
      description:
        "Logo structure and usage principles for a consistent Pertamina Digital Hub identity.",
    },
    {
      group: "Design Standards",
      code: "02",
      description:
        "Color, typography, and iconography standards for clear and consistent interfaces.",
    },
    {
      group: "UI Patterns",
      code: "03",
      description:
        "Reusable navigation, data, dashboard, and Power BI patterns for digital products.",
    },
  ]

  const openGroup = (group: string) => {
    const firstPage = pages.find((item) => item.group === group)
    if (!firstPage) return
    setActiveGroup(group)
    setActiveId(firstPage.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const selectGroup = (group: string) => {
    const firstPage = pages.find((item) => item.group === group)
    if (!firstPage) return
    setActiveGroup(group)
    setActiveId(firstPage.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const selectPage = (id: string) => {
    setActiveId(id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-[#f7faff] text-[#09233f]">
      <header className="border-b border-[#d7e7f2] bg-white">
        <div className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <nav aria-label="Breadcrumb" className="breadcrumbs">
            <button onClick={onBack} type="button">
              Guidelines
            </button>
            <span className="breadcrumb-part">
              <span aria-hidden="true">›</span>
              <button
                aria-current={activeGroup === null ? "page" : undefined}
                onClick={() => {
                  setActiveGroup(null)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                type="button"
              >
                UI
              </button>
            </span>
            {activeGroup !== null && (
              <span className="breadcrumb-part">
                <span aria-hidden="true">›</span>
                <label className="guideline-breadcrumb-select">
                  <span className="sr-only">Choose a guideline category</span>
                  <select
                    aria-label="Choose a guideline category"
                    onChange={(event) => selectGroup(event.target.value)}
                    value={activeGroup}
                  >
                    {groups.map((group) => (
                      <option key={group}>{group}</option>
                    ))}
                  </select>
                  <ChevronIcon />
                </label>
              </span>
            )}
          </nav>
          <div className="mt-9 max-w-4xl">
            <div>
              <p className="toolkit-eyebrow">
                {activeGroup === null ? "UI Guidelines" : page.group}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-[#082542] sm:text-5xl">
                {activeGroup === null
                  ? "Pertamina Digital Hub UI Standards"
                  : page.title}
              </h1>
            </div>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#557087]">
              {activeGroup === null
                ? "Brand identity, design standards and UX patterns for dashboards, web applications and platforms."
                : page.intro}
            </p>
          </div>
        </div>
      </header>

      {activeGroup === null ? (
        <section
          aria-label="UI guideline categories"
          className="mx-auto max-w-[1480px] px-5 py-8 pb-20 sm:px-8 lg:px-12 lg:py-12 lg:pb-28"
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {previewCards.map((card) => (
              <article
                className="guidebook-card guidebook-card-ui group"
                key={card.group}
              >
                <button
                  aria-label={`Open ${card.group}`}
                  className="guidebook-card-link"
                  onClick={() => openGroup(card.group)}
                  type="button"
                />
                <div className="guidebook-visual">
                  <span className="guidebook-code">UI</span>
                  <span className="guidebook-index">{card.code}</span>
                  <div className="guidebook-orbit" />
                </div>
                <div className="mt-7 flex items-start justify-between gap-4">
                  <div>
                    <span className="guidebook-status guidebook-status-ui">
                      UI standards
                    </span>
                    <h2 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-[#082542]">
                      {card.group}
                    </h2>
                  </div>
                  <span className="landing-arrow">
                    <ArrowIcon />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#5a7186]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <div
          className={`guideline-page-layout mx-auto grid max-w-[1480px] gap-8 px-5 py-8 sm:px-8 lg:px-12 lg:py-12 ${
            pages.filter((p) => p.group === activeGroup).length > 1
              ? "lg:grid-cols-[250px_minmax(0,1fr)]"
              : ""
          }`}
        >
          {pages.filter((p) => p.group === activeGroup).length > 1 && (
            <aside className="guideline-section-rail">
              <p className="guideline-section-rail-label">{activeGroup}</p>
              <nav
                aria-label={`${activeGroup} pages`}
                className="guideline-section-links"
              >
                {pages
                  .filter((p) => p.group === activeGroup)
                  .map((p) => (
                    <div
                      className={
                        activeId === p.id
                          ? "guideline-page-link is-active"
                          : "guideline-page-link"
                      }
                      key={p.id}
                    >
                      <button
                        className={activeId === p.id ? "is-active" : ""}
                        onClick={() => selectPage(p.id)}
                        type="button"
                      >
                        {p.title}
                      </button>
                      {activeId === p.id && page.sections.length > 1 && (
                        <div className="guideline-page-subsection">
                          <nav
                            aria-label={`${page.title} sections`}
                            className="guideline-section-links"
                          >
                            {page.sections.map((section, index) => (
                              <a
                                href={`#section-${index + 1}`}
                                key={section.title}
                              >
                                {section.title}
                              </a>
                            ))}
                          </nav>
                        </div>
                      )}
                    </div>
                  ))}
              </nav>
            </aside>
          )}

          <div className="grid content-start gap-6" key={page.id}>
            {page.sections.map((s, i) => (
              <SectionContent index={i} key={s.title} section={s} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
