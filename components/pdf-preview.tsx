"use client"

import { useState, useEffect } from "react"
import type { ResumeData } from "@/lib/types"
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from "@react-pdf/renderer"
import { formatDate } from "@/lib/utils"

// Register fonts
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

export function PdfPreview({
  data,
  theme = "indigo",
  printVersion = false,
}: { data: ResumeData; theme?: string; printVersion?: boolean }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

const getThemeColors = () => {
  switch (theme) {
    /* ——— Greens: calm, professional ——— */
    case "emerald":
      return {
        primary:  "#006A4E",  // deep teal 700
        secondary:"#009F6B",  // teal 600
        light:    "#F2F9F6",  // mint 50
        medium:   "#A0DABB",  // teal 200
        border:   "#5BB899",  // teal 400
      }

    /* ——— Reds: modern but toned-down ——— */
    case "rose":
      return {
        primary:  "#8C1C32",  // burgundy 700
        secondary:"#C72C48",  // rose 600
        light:    "#FFF5F6",  // rose 50
        medium:   "#F7C9D0",  // rose 200
        border:   "#E8AEB8",  // rose 300
      }

    /* ——— Ambers: warm & subtle ——— */
    case "amber":
      return {
        primary:  "#9A5800",  // amber 700
        secondary:"#C67900",  // amber 600
        light:    "#FFFAF2",  // amber 50
        medium:   "#F7D08A",  // amber 300
        border:   "#EAC27A",  // amber 400
      }

    /* ——— Blues: clear, trustworthy ——— */
    case "sky":
      return {
        primary:  "#005B99",  // sky 700
        secondary:"#007ACC",  // sky 600
        light:    "#F2F8FC",  // sky 50
        medium:   "#A8D4F6",  // sky 200
        border:   "#7DB8E8",  // sky 300
      }

    /* ——— Purples: elegant but legible ——— */
    case "purple":
      return {
        primary:  "#5E2D8C",  // purple 700
        secondary:"#7A3DBD",  // purple 600
        light:    "#F8F5FC",  // purple 50
        medium:   "#D5C4F1",  // purple 200
        border:   "#BCA1E6",  // purple 300
      }

    /* ——— Default (Indigo): classic tech look ——— */
    default:                // "indigo"
      return {
        primary:  "#2C3E8C",  // indigo 700
        secondary:"#4059D1",  // indigo 600
        light:    "#F3F5FF",  // indigo 50
        medium:   "#B7C1FF",  // indigo 200
        border:   "#9CA9FF",  // indigo 300
      }
  }
}


  const themeColors = getThemeColors()

  // Create styles
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Roboto",
      fontSize: 10,
      lineHeight: 1.5,
      color: "#333",
    },
    section: {
      marginBottom: 0,
    },
    header: {
      marginBottom: 10,
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
    name: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 15,
      color: themeColors.primary,
    },
    label: {
      fontSize: 14,
      color: "#4b5563",
      marginBottom: 0,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 8,
      justifyContent: "flex-end",
    },
    contactItem: {
      marginRight: 15,
      fontSize: 10,
      color: "#4b5563",
      flexDirection: "row",
      alignItems: "center",
    },
    contactIcon: {
      width: 12,
      height: 12,
      marginRight: 4,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      borderBottomWidth: 1,
      borderBottomColor: themeColors.primary,
      borderBottomStyle: "solid",
      paddingBottom: 4,
      marginBottom: 6,
      color: themeColors.primary,
    },
    entryContainer: {
      marginBottom: 10,
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
    entryTitle: {
      fontWeight: "bold",
      fontSize: 12,
      color: themeColors.primary,
    },
    entryDate: {
      fontSize: 9,
      color: "#6b7280",
    },
    entrySubtitle: {
      fontSize: 10,
      marginTop: 0.5,
      fontWeight: "medium",
    },
    entrySummary: {
      fontSize: 9,
      marginTop: 1,
      color: "#4b5563",
    },
    bulletList: {
      marginLeft: 10,
      marginTop: 1,
    },
    bulletItem: {
      flexDirection: "row",
      marginBottom: 1,
    },
    bullet: {
      width: 10,
      fontSize: 9,
      color: themeColors.primary,
    },
    bulletText: {
      flex: 1,
      fontSize: 9,
      color: "#4b5563",
    },
    skillsGrid: {
      alignContent: "center",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 0,
    },
    skillItem: {
      width: "47%",
      marginRight: "2%",
      marginBottom: 8,
      backgroundColor: themeColors.light,
      padding: 6,
      borderRadius: 3,
    },
    skillName: {
      fontWeight: "bold",
      fontSize: 10,
      color: themeColors.primary,
      marginBottom: 3,
    },
    skillKeywords: {
      fontSize: 9,
      color: "#4b5563",
    },
    footer: {
      marginTop: 20,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: "#e5e7eb",
      borderTopStyle: "solid",
      fontSize: 8,
      textAlign: "center",
      color: "#9ca3af",
    },
    headerContent: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headerLeft: {
      flex: 1,
    },
    headerRight: {
      width: "40%",
      alignItems: "flex-end",
    },
    profilesRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: -7,
    },
    profileItem: {
      fontSize: 9,
      color: themeColors.primary,
      marginRight: 10,
      marginBottom: -5,
    },
    badge: {
      backgroundColor: "#ffffff",
      borderRadius: 2,
      paddingVertical: 1,
      paddingHorizontal: 4,
      fontSize: 8,
      color: "#4b5563",
      borderWidth: 1,
      borderColor: "#e5e7eb",
      borderStyle: "solid",
    },
    keywordBadge: {
      backgroundColor: "#ffffff",
      borderRadius: 2,
      paddingVertical: 1,
      paddingHorizontal: 4,
      fontSize: 8,
      color: "#4b5563",
      borderWidth: 1,
      borderColor: "#e5e7eb",
      borderStyle: "solid",
      marginRight: 4,
      marginBottom: 4,
    },
    keywordsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 4,
    },
    languageItem: {
      width: "30%",
      marginRight: "2%",
      marginBottom: 8,
      backgroundColor: themeColors.light,
      padding: 6,
      borderRadius: 3,
    },
    languageName: {
      fontWeight: "bold",
      fontSize: 10,
      color: themeColors.primary,
    },
    languageFluency: {
      fontSize: 9,
      color: "#4b5563",
      marginTop: 2,
    },
    skillsContainer: {
      marginTop: 6,
      marginBottom: 10,
    },
    languagesContainer: {
      marginTop: 6,
      marginBottom: 10,
    },
    interestsContainer: {
      marginTop: 6,
      marginBottom: 10,
    },
    interestItem: {
      width: "30%",
      marginRight: "2%",
      marginBottom: 8,
      backgroundColor: themeColors.light,
      padding: 6,
      borderRadius: 3,
    },
    interestName: {
      fontWeight: "bold",
      fontSize: 10,
      color: themeColors.primary,
    },
    interestKeywords: {
      fontSize: 9,
      color: "#4b5563",
      marginTop: 2,
    },
    awardItem: {
      width: "47%",
      marginRight: "2%",
      marginBottom: 8,
      backgroundColor: themeColors.light,
      padding: 6,
      borderRadius: 3,
    },
    awardTitle: {
      fontWeight: "bold",
      fontSize: 10,
      color: themeColors.primary,
    },
    awardDetails: {
      fontSize: 9,
      color: "#4b5563",
      marginTop: 2,
    },
    certificateItem: {
      width: "47%",
      marginRight: "2%",
      marginBottom: 8,
      backgroundColor: themeColors.light,
      padding: 6,
      borderRadius: 3,
    },
    certificateTitle: {
      fontWeight: "bold",
      fontSize: 10,
      color: themeColors.primary,
    },
    certificateDetails: {
      fontSize: 9,
      color: "#4b5563",
      marginTop: 2,
    },
    pageNumber: {
      position: "absolute",
      bottom: 20,
      right: 20,
      fontSize: 8,
      color: "#9ca3af",
    },
  })

  // Bullet component
  const Bullet = ({ text }: { text: string }) => (
    <View style={styles.bulletItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  )

  if (!isClient) {
    return <div className="h-[600px] flex items-center justify-center">Loading PDF preview...</div>
  }

  const {
    basics,
    work,
    education,
    skills,
    projects,
    volunteer,
    awards,
    certificates,
    publications,
    languages,
    interests,
    references,
  } = data

  // For ATS-optimized version, we'll include volunteer experience in the work experience section
  const combinedWork = printVersion
    ? work
    : [
      ...(work || []),
      ...(volunteer?.map((vol) => ({
        name: vol.organization,
        position: vol.position,
        startDate: vol.startDate,
        endDate: vol.endDate,
        summary: vol.summary,
        highlights: vol.highlights,
        url: vol.url,
        isVolunteer: true,
      })) || []),
    ]

  return (
    <div className="h-[600px]">
      <PDFViewer width="100%" height="100%" className="border rounded">
        <Document title={`${basics.name} - Resume`}>
          <Page size="Letter" style={styles.page}>
            {/* Enhanced Header */}
            <View style={styles.header}>
              <View style={styles.headerTop} />
              <View style={styles.headerContent}>
                <View style={styles.headerLeft}>
                  <Text style={styles.name}>{basics.name}</Text>
                  {basics.label && <Text style={styles.label}>{basics.label}</Text>}
                </View>
                <View style={styles.headerRight}>
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

              {basics.profiles && basics.profiles.length > 0 && (
                <View style={styles.profilesRow}>
                  {basics.profiles.map((profile, index) => (
                    <Text key={index} style={styles.profileItem}>
                      {profile.network}: {profile.username}
                    </Text>
                  ))}
                </View>
              )}
            </View>

            {/* Summary */}
            {basics.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text>{basics.summary}</Text>
              </View>
            )}

            {/* Work Experience */}
            {combinedWork && combinedWork.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {combinedWork.map((job, index) => (
                  <View key={index} style={styles.entryContainer}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryTitle}>
                        {job.position}
                        {job.isVolunteer && !printVersion ? " (Volunteer)" : ""}
                      </Text>
                      <Text style={styles.entryDate}>
                        {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : "Present"}
                      </Text>
                    </View>
                    <Text style={styles.entrySubtitle}>{job.name}</Text>
                    {job.summary && <Text style={styles.entrySummary}>{job.summary}</Text>}
                    {job.highlights && job.highlights.length > 0 && (
                      <View style={styles.bulletList}>
                        {job.highlights.map((highlight, i) => (
                          <Bullet key={i} text={highlight} />
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Volunteer Experience - Only in print version */}
            {printVersion && volunteer && volunteer.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Volunteer Experience</Text>
                {volunteer.map((vol, index) => (
                  <View key={index} style={styles.entryContainer}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryTitle}>{vol.position}</Text>
                      <Text style={styles.entryDate}>
                        {formatDate(vol.startDate)} - {vol.endDate ? formatDate(vol.endDate) : "Present"}
                      </Text>
                    </View>
                    <Text style={styles.entrySubtitle}>{vol.organization}</Text>
                    {vol.summary && <Text style={styles.entrySummary}>{vol.summary}</Text>}
                    {vol.highlights && vol.highlights.length > 0 && (
                      <View style={styles.bulletList}>
                        {vol.highlights.map((highlight, i) => (
                          <Bullet key={i} text={highlight} />
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu, index) => (
                  <View key={index} style={styles.entryContainer}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryTitle}>{edu.institution}</Text>
                      <Text style={styles.entryDate}>
                        {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                      <Text style={styles.entrySubtitle}>
                        {edu.studyType}
                        {edu.area ? `, ${edu.area}` : ""}
                      </Text>
                    </View>
                    {edu.courses && edu.courses.length > 0 && (
                      <Text style={styles.entrySummary}>Coursework: {edu.courses.join(", ")}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillsContainer}>
                  <View style={styles.skillsGrid}>
                    {skills.map((skill, index) => (
                      <View key={index} style={styles.skillItem}>
                        <Text style={styles.skillName}>{skill.name}</Text>
                        {skill.keywords && skill.keywords.length > 0 && (
                          <Text style={styles.skillKeywords}>{skill.keywords.join(", ")}</Text>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
              fixed
            />
          </Page>

          {/* Second page for additional sections if needed */}
          {(publications?.length > 0 || awards?.length > 0 || languages?.length > 0) && (
            <Page size="Letter" style={styles.page}>


              {/* Languages */}
              {languages && languages.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Languages</Text>
                  <View style={styles.languagesContainer}>
                    <View style={styles.skillsGrid}>
                      {languages.map((lang, index) => (
                        <View key={index} style={styles.languageItem}>
                          <Text style={styles.languageName}>{lang.language}</Text>
                          <Text style={styles.languageFluency}>{lang.fluency}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              )}

              {/* Awards */}
              {awards && awards.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Awards</Text>
                  <View style={styles.skillsContainer}>
                    <View style={styles.skillsGrid}>
                      {awards.map((award, index) => (
                        <View key={index} style={styles.awardItem}>
                          <Text style={styles.awardTitle}>{award.title}</Text>
                          <Text style={styles.awardDetails}>
                            {award.awarder}
                            {award.date ? ` (${formatDate(award.date)})` : ""}
                          </Text>
                          {award.summary && <Text style={styles.entrySummary}>{award.summary}</Text>}
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              )}
              {/* Publications */}
              {publications && publications.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Publications</Text>
                  {publications.map((pub, index) => (
                    <View key={index} style={styles.entryContainer}>
                      <View style={styles.entryHeader}>
                        <Text style={styles.entryTitle}>{pub.name}</Text>
                        {pub.releaseDate && <Text style={styles.entryDate}>{formatDate(pub.releaseDate)}</Text>}
                      </View>
                      <Text style={styles.entrySubtitle}>{pub.publisher}</Text>
                      {pub.summary && <Text style={styles.entrySummary}>{pub.summary}</Text>}
                    </View>
                  ))}
                </View>
              )}

              {/* Certificates */}
              {certificates && certificates.length > 0 && (
                <View style={styles.section} >
                  <Text style={styles.sectionTitle}>Certifications</Text>
                  <View style={styles.skillsContainer}>
                    <View style={styles.skillsGrid}>
                      {certificates.map((cert, index) => (
                        <View key={index} style={styles.certificateItem}>
                          <Text style={styles.certificateTitle}>{cert.name}</Text>
                          <Text style={styles.certificateDetails}>
                            {cert.issuer}
                            {cert.date ? ` (${formatDate(cert.date)})` : ""}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              )}

              {/* Interests */}
              {interests && interests.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Interests</Text>
                  <View style={styles.interestsContainer}>
                    <View style={styles.skillsGrid}>
                      {interests.map((interest, index) => (
                        <View key={index} style={styles.interestItem}>
                          <Text style={styles.interestName}>{interest.name}</Text>
                          {interest.keywords && interest.keywords.length > 0 && (
                            <Text style={styles.interestKeywords}>{interest.keywords.join(", ")}</Text>
                          )}
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              )}

              {/* References */}
              {references && references.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>References</Text>
                  {references.map((ref, index) => (
                    <View key={index} style={styles.entryContainer}>
                      <Text style={styles.entryTitle}>{ref.name}</Text>
                      {ref.reference && <Text style={styles.entrySummary}>"{ref.reference}"</Text>}
                    </View>
                  ))}
                </View>
              )}

              {/* Projects */}
              {projects && projects.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Projects</Text>
                  {projects.map((project, index) => (
                    <View key={index} style={styles.entryContainer}>
                      <View style={styles.entryHeader}>
                        <Text style={styles.entryTitle}>{project.name}</Text>
                        {(project.startDate || project.endDate) && (
                          <Text style={styles.entryDate}>
                            {project.startDate && formatDate(project.startDate)}
                            {project.startDate && project.endDate && " - "}
                            {project.endDate ? formatDate(project.endDate) : project.startDate ? "Present" : ""}
                          </Text>
                        )}
                      </View>
                      <Text style={styles.entrySubtitle}>{project.url}</Text>
                      {project.description && <Text style={styles.entrySummary}>{project.description}</Text>}
                      {project.highlights && project.highlights.length > 0 && (
                        <View style={styles.bulletList}>
                          {project.highlights.map((highlight, i) => (
                            <Bullet key={i} text={highlight} />
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
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

