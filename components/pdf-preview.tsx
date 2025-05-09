"use client"

import { useState, useEffect } from "react"
import type { ResumeData } from "@/lib/types"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer"
import { formatDate } from "@/lib/utils"

/*
  =============================================================================
  PdfPreviewImproved.jsx
  -----------------------------------------------------------------------------
  🎯 Key improvements over the original component
  -----------------------------------------------------------------------------
  1. **Cleaner header & horizontal contact row**
     ▸ Contacts sit on a single line with icons for fast scanning.
  2. **Re‑ordered sections for recruiter impact**
     ▸ Summary → Experience → Projects → Skills → Education
     (Languages, Awards, etc. remain on page‑2.)
  3. **Project limit for page‑1 focus**
     ▸ Only the first `maxProjects` (default 3) show on page‑1.
       Remaining projects flow to page‑2 if any.
  4. **Utility helpers**
     ▸ `Section`, `Entry` components reduce repetition & improve clarity.
  5. **Theme palette extracted**
     ▸ `getThemeColors` moved outside component to avoid re‑creation.
  =============================================================================
*/

// ---------------------------------------------------------------------------
// Font registration (unchanged)
// ---------------------------------------------------------------------------
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: "medium",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
})

// ---------------------------------------------------------------------------
// 🎨 Palette helper (extracted outside component)
// ---------------------------------------------------------------------------
const themePalettes: Record<
  string,
  { primary: string; secondary: string; light: string; medium: string; border: string }
> = {
  emerald: {
    primary: "#0369a1",
    secondary: "#0284c7",
    light: "#f0f9ff",
    medium: "#7dd3fc",
    border: "#bae6fd",
  },
  rose: {
    primary: "#be123c",
    secondary: "#e11d47",
    light: "#fff1f2",
    medium: "#fda4af",
    border: "#fecdd3",
  },
  amber: {
    primary: "#b45309",
    secondary: "#d97706",
    light: "#fffbeb",
    medium: "#fcd34d",
    border: "#fde68a",
  },
  sky: {
    primary: "#0369a1",
    secondary: "#0284c7",
    light: "#f0f9ff",
    medium: "#7dd3fc",
    border: "#bae6fd",
  },
  purple: {
    primary: "#7e22ce",
    secondary: "#9333ea",
    light: "#faf5ff",
    medium: "#d8b4fe",
    border: "#e9d5ff",
  },
  indigo: {
    primary: "#4338ca",
    secondary: "#4f46e5",
    light: "#eef2ff",
    medium: "#a5b4fc",
    border: "#c7d2fe",
  },
}

const getThemeColors = (theme: string) => themePalettes[theme] ?? themePalettes["indigo"]

// ---------------------------------------------------------------------------
// 🛠️ Re‑usable UI primitives
// ---------------------------------------------------------------------------
const Bullet = ({ text, styles }: { text: string; styles: any }) => (
  <View style={styles.bulletItem}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
)

const Entry = ({
  item,
  styles,
  subtitleKey = "name",
  dateStartKey = "startDate",
  dateEndKey = "endDate",
  highlightsKey = "highlights",
}: {
  item: any
  styles: any
  subtitleKey?: string
  dateStartKey?: string
  dateEndKey?: string
  highlightsKey?: string
}) => (
  <View style={styles.entryContainer}>
    <View style={styles.entryHeader}>
      <Text style={styles.entryTitle}>{item.position || item.title || item.name}</Text>
      {item[dateStartKey] && (
        <Text style={styles.entryDate}>
          {formatDate(item[dateStartKey])} – {item[dateEndKey] ? formatDate(item[dateEndKey]) : "Present"}
        </Text>
      )}
    </View>
    {item[subtitleKey] && <Text style={styles.entrySubtitle}>{item[subtitleKey]}</Text>}
    {item.summary && <Text style={styles.entrySummary}>{item.summary}</Text>}
    {item[highlightsKey] && item[highlightsKey].length > 0 && (
      <View style={styles.bulletList}>
        {item[highlightsKey].map((h: string, i: number) => (
          <Bullet key={i} text={h} styles={styles} />
        ))}
      </View>
    )}
  </View>
)

const Section = ({ title, children, styles }: { title: string; children: any; styles: any }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
)

// ---------------------------------------------------------------------------
// 📄 Main component
// ---------------------------------------------------------------------------
export function PdfPreview({
  data,
  theme = "indigo",
  printVersion = false,
  maxProjects = 3,
}: {
  data: ResumeData
  theme?: string
  printVersion?: boolean
  maxProjects?: number
}) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])

  const themeColors = getThemeColors(theme)

  // -------------------------------------------------------------------------
  // Styles 🚀 (unchanged except header/contact tweaks)
  // -------------------------------------------------------------------------
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Roboto",
      fontSize: 10,
      lineHeight: 1.4,
      color: "#333",
    },
    section: { marginBottom: 6 },
    /* ----- Header ----- */
    header: {
      marginBottom: 12,
      paddingBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: themeColors.primary,
      borderBottomStyle: "solid",
      backgroundColor: themeColors.light,
      padding: 10,
      borderRadius: 4,
    },
    headerTop: {
      height: 6,
      backgroundColor: themeColors.medium,
      marginBottom: 10,
      marginHorizontal: -10,
      marginTop: -10,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    name: { fontSize: 24, fontWeight: "bold", color: themeColors.primary },
    label: { fontSize: 12, color: "#4b5563", marginTop: 2 },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 4,
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      fontSize: 9,
      color: "#4b5563",
      marginRight: 12,
      marginBottom: 2,
    },
    contactIcon: { marginRight: 4 },
    /* ----- Section titles & entries ----- */
    sectionTitle: {
      fontSize: 13,
      fontWeight: "bold",
      borderBottomWidth: 1,
      borderBottomColor: themeColors.primary,
      borderBottomStyle: "solid",
      paddingBottom: 2,
      marginBottom: 4,
      color: themeColors.primary,
    },
    entryContainer: {
      marginBottom: 8,
      paddingLeft: 8,
      borderLeftWidth: 2,
      borderLeftColor: themeColors.border,
      borderLeftStyle: "solid",
    },
    entryHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    entryTitle: { fontWeight: "bold", fontSize: 11, color: themeColors.primary },
    entryDate: { fontSize: 9, color: "#6b7280" },
    entrySubtitle: { fontSize: 10, marginTop: 1, fontWeight: "medium" },
    entrySummary: { fontSize: 9, marginTop: 2, color: "#4b5563" },
    /* ----- Bullets ----- */
    bulletList: { marginLeft: 10, marginTop: 2 },
    bulletItem: { flexDirection: "row", marginBottom: 1 },
    bullet: { width: 10, fontSize: 9, color: themeColors.primary },
    bulletText: { flex: 1, fontSize: 9, color: "#4b5563" },
    /* ----- Skills grid ----- */
    skillsGrid: { flexDirection: "row", flexWrap: "wrap" },
    skillItem: {
      width: "47%",
      marginRight: "2%",
      marginBottom: 6,
      backgroundColor: themeColors.light,
      padding: 5,
      borderRadius: 3,
    },
    skillName: { fontWeight: "bold", fontSize: 10, color: themeColors.primary, marginBottom: 2 },
    skillKeywords: { fontSize: 9, color: "#4b5563" },
    /* ----- Page numbering ----- */
    pageNumber: {
      position: "absolute",
      bottom: 20,
      right: 20,
      fontSize: 8,
      color: "#9ca3af",
    },
  })

  // -------------------------------------------------------------------------
  // Data preparation 🧮
  // -------------------------------------------------------------------------
  const {
    basics,
    work = [],
    education = [],
    skills = [],
    projects = [],
    volunteer = [],
    awards = [],
    certificates = [],
    publications = [],
    languages = [],
    interests = [],
    references = [],
  } = data

  const combinedWork = printVersion
    ? work
    : [
        ...work,
        ...volunteer.map((v) => ({ ...v, position: v.position + " (Volunteer)" })),
      ]

  const topProjects = projects.slice(0, maxProjects)
  const remainingProjects = projects.slice(maxProjects)

  // -------------------------------------------------------------------------
  // Early SSR guard
  // -------------------------------------------------------------------------
  if (!isClient) {
    return <div className="h-[600px] flex items-center justify-center">Generating PDF preview…</div>
  }

  // -------------------------------------------------------------------------
  // JSX – 2‑page resume
  // -------------------------------------------------------------------------
  return (
    <div className="h-[600px]">
      <PDFViewer width="100%" height="100%" className="border rounded">
        <Document title={`${basics.name} – Resume`}>
          {/* -----------------------------------------------------------------*/}
          {/*  Page‑1  */}
          {/* -----------------------------------------------------------------*/}
          <Page size="Letter" style={styles.page}>
            {/* ===== Header ===== */}
            <View style={styles.header}>
              <View style={styles.headerTop} />
              <Text style={styles.name}>{basics.name}</Text>
              {basics.label && <Text style={styles.label}>{basics.label}</Text>}

              {/* Contact Row */}
              <View style={styles.contactRow}>
                {basics.email && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactIcon}>✉</Text>
                    <Text>{basics.email}</Text>
                  </View>
                )}
                {basics.phone && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactIcon}>☎</Text>
                    <Text>{basics.phone}</Text>
                  </View>
                )}
                {basics.url && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactIcon}>🔗</Text>
                    <Text>{basics.url.replace(/^https?:\/\/(www\.)?/, "")}</Text>
                  </View>
                )}
                {basics.location && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactIcon}>📍</Text>
                    <Text>
                      {[basics.location.city, basics.location.region, basics.location.countryCode]
                        .filter(Boolean)
                        .join(", ")}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* ===== Summary ===== */}
            {basics.summary && (
              <Section title="Summary" styles={styles}>
                <Text style={styles.entrySummary}>{basics.summary}</Text>
              </Section>
            )}

            {/* ===== Experience ===== */}
            {combinedWork.length > 0 && (
              <Section title="Experience" styles={styles}>
                {combinedWork.map((job, i) => (
                  <Entry key={i} item={job} styles={styles} subtitleKey="name" />
                ))}
              </Section>
            )}

            {/* ===== Top Projects ===== */}
            {topProjects.length > 0 && (
              <Section title="Projects" styles={styles}>
                {topProjects.map((p, i) => (
                  <Entry
                    key={i}
                    item={{ ...p, name: p.url }}
                    styles={styles}
                    subtitleKey="url"
                    dateStartKey="startDate"
                    dateEndKey="endDate"
                  />
                ))}
              </Section>
            )}

            {/* ===== Skills ===== */}
            {skills.length > 0 && (
              <Section title="Skills" styles={styles}>
                <View style={styles.skillsGrid}>
                  {skills.map((skill, i) => (
                    <View key={i} style={styles.skillItem}>
                      <Text style={styles.skillName}>{skill.name}</Text>
                      {skill.keywords && skill.keywords.length > 0 && (
                        <Text style={styles.skillKeywords}>{skill.keywords.join(", ")}</Text>
                      )}
                    </View>
                  ))}
                </View>
              </Section>
            )}

            {/* ===== Education ===== */}
            {education.length > 0 && (
              <Section title="Education" styles={styles}>
                {education.map((edu, i) => (
                  <Entry
                    key={i}
                    item={{
                      ...edu,
                      name: `${edu.studyType}${edu.area ? ", " + edu.area : ""}`,
                    }}
                    styles={styles}
                    subtitleKey="institution"
                  />
                ))}
              </Section>
            )}

            {/* Page # */}
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
              fixed
            />
          </Page>

          {/* -----------------------------------------------------------------*/}
          {/*  Page‑2  – (optional extra sections)                          */}
          {/* -----------------------------------------------------------------*/}
          {(remainingProjects.length > 0 ||
            languages.length > 0 ||
            awards.length > 0 ||
            certificates.length > 0 ||
            publications.length > 0 ||
            interests.length > 0 ||
            references.length > 0) && (
            <Page size="Letter" style={styles.page}>
              {/* Remaining Projects */}
              {remainingProjects.length > 0 && (
                <Section title="Additional Projects" styles={styles}>
                  {remainingProjects.map((p, i) => (
                    <Entry
                      key={i}
                      item={{ ...p, name: p.url }}
                      styles={styles}
                      subtitleKey="url"
                      dateStartKey="startDate"
                      dateEndKey="endDate"
                    />
                  ))}
                </Section>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <Section title="Languages" styles={styles}>
                  <View style={styles.skillsGrid}>
                    {languages.map((l, i) => (
                      <View key={i} style={styles.skillItem}>
                        <Text style={styles.skillName}>{l.language}</Text>
                        <Text style={styles.skillKeywords}>{l.fluency}</Text>
                      </View>
                    ))}
                  </View>
                </Section>
              )}

              {/* Awards */}
              {awards.length > 0 && (
                <Section title="Awards" styles={styles}>
                  {awards.map((a, i) => (
                    <Entry key={i} item={a} styles={styles} subtitleKey="awarder" dateStartKey="date" />
                  ))}
                </Section>
              )}

              {/* Certificates */}
              {certificates.length > 0 && (
                <Section title="Certifications" styles={styles}>
                  {certificates.map((c, i) => (
                    <Entry key={i} item={c} styles={styles} subtitleKey="issuer" dateStartKey="date" />
                  ))}
                </Section>
              )}

              {/* Publications */}
              {publications.length > 0 && (
                <Section title="Publications" styles={styles}>
                  {publications.map((p, i) => (
                    <Entry key={i} item={p} styles={styles} subtitleKey="publisher" dateStartKey="releaseDate" />
                  ))}
                </Section>
              )}

              {/* Interests */}
              {interests.length > 0 && (
                <Section title="Interests" styles={styles}>
                  <View style={styles.skillsGrid}>
                    {interests.map((int, i) => (
                      <View key={i} style={styles.skillItem}>
                        <Text style={styles.skillName}>{int.name}</Text>
                        {int.keywords && int.keywords.length > 0 && (
                          <Text style={styles.skillKeywords}>{int.keywords.join(", ")}</Text>
                        )}
                      </View>
                    ))}
                  </View>
                </Section>
              )}

              {/* References */}
              {references.length > 0 && (
                <Section title="References" styles={styles}>
                  {references.map((r, i) => (
                    <Entry key={i} item={r} styles={styles} subtitleKey="name" highlightsKey="reference" />
                  ))}
                </Section>
              )}

              <Text
                style={styles.pageNumber}
                render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                fixed
              />
            </Page>
          )}
        </Document>
      </PDFViewer>
    </div>
  )
}
