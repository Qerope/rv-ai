"use client"

import type { ResumeData } from "@/lib/types"
import { formatDate } from "@/lib/utils"

export function PlainTextPreview({ data }: { data: ResumeData }) {
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

  // Helper function to create section dividers
  const divider = "=".repeat(80)
  const sectionDivider = "-".repeat(80)

  // Helper function to format text blocks with proper spacing
  const formatTextBlock = (lines: string[]): string => {
    return lines.join("\n")
  }

  // Build the plain text resume
  const buildPlainTextResume = () => {
    const sections: string[] = []

    // Header
    const header = [
      basics.name.toUpperCase(),
      basics.label || "",
      "",
      [
        basics.email,
        basics.phone,
        basics.url?.replace(/^https?:\/\/(www\.)?/, ""),
        basics.location
          ? [
              basics.location.address,
              [basics.location.city, basics.location.region, basics.location.countryCode].filter(Boolean).join(", "),
              basics.location.postalCode,
            ]
              .filter(Boolean)
              .join(", ")
          : "",
      ]
        .filter(Boolean)
        .join(" | "),
      "",
    ]

    if (basics.profiles && basics.profiles.length > 0) {
      header.push(basics.profiles.map((profile) => `${profile.network}: ${profile.username}`).join(" | "), "")
    }

    sections.push(formatTextBlock(header))

    // Summary
    if (basics.summary) {
      sections.push(formatTextBlock(["SUMMARY", sectionDivider, basics.summary, ""]))
    }

    // Work Experience
    if (work && work.length > 0) {
      const workSection = ["EXPERIENCE", sectionDivider]

      work.forEach((job) => {
        workSection.push(
          `${job.position}`,
          `${job.name}${job.url ? ` (${job.url.replace(/^https?:\/\/(www\.)?/, "")})` : ""}`,
          `${formatDate(job.startDate)} - ${job.endDate ? formatDate(job.endDate) : "Present"}`,
          "",
        )

        if (job.summary) {
          workSection.push(job.summary, "")
        }

        if (job.highlights && job.highlights.length > 0) {
          job.highlights.forEach((highlight) => {
            workSection.push(`* ${highlight}`)
          })
          workSection.push("")
        }
      })

      sections.push(formatTextBlock(workSection))
    }

    // Projects
    if (projects && projects.length > 0) {
      const projectsSection = ["PROJECTS", sectionDivider]

      projects.forEach((project) => {
        projectsSection.push(
          `${project.name}${project.url ? ` (${project.url.replace(/^https?:\/\/(www\.)?/, "")})` : ""}`,
          project.startDate || project.endDate
            ? `${project.startDate ? formatDate(project.startDate) : ""} - ${project.endDate ? formatDate(project.endDate) : "Present"}`
            : "",
          "",
        )

        if (project.description) {
          projectsSection.push(project.description, "")
        }

        if (project.highlights && project.highlights.length > 0) {
          project.highlights.forEach((highlight) => {
            projectsSection.push(`* ${highlight}`)
          })
          projectsSection.push("")
        }
      })

      sections.push(formatTextBlock(projectsSection))
    }

    // Education
    if (education && education.length > 0) {
      const educationSection = ["EDUCATION", sectionDivider]

      education.forEach((edu) => {
        educationSection.push(
          `${edu.institution}`,
          `${edu.studyType}${edu.area ? `, ${edu.area}` : ""}${edu.score ? ` • GPA: ${edu.score}` : ""}`,
          `${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : "Present"}`,
          "",
        )

        if (edu.courses && edu.courses.length > 0) {
          educationSection.push(`Relevant Courses: ${edu.courses.join(", ")}`, "")
        }
      })

      sections.push(formatTextBlock(educationSection))
    }

    // Skills
    if (skills && skills.length > 0) {
      const skillsSection = ["SKILLS", sectionDivider]

      skills.forEach((skill) => {
        skillsSection.push(
          `${skill.name}${skill.level ? ` (${skill.level})` : ""}${skill.keywords ? `: ${skill.keywords.join(", ")}` : ""}`,
        )
      })

      skillsSection.push("")
      sections.push(formatTextBlock(skillsSection))
    }

    // Languages
    if (languages && languages.length > 0) {
      const languagesSection = [
        "LANGUAGES",
        sectionDivider,
        languages.map((lang) => `${lang.language}: ${lang.fluency}`).join(", "),
        "",
      ]

      sections.push(formatTextBlock(languagesSection))
    }

    // Volunteer
    if (volunteer && volunteer.length > 0) {
      const volunteerSection = ["VOLUNTEER EXPERIENCE", sectionDivider]

      volunteer.forEach((vol) => {
        volunteerSection.push(
          `${vol.position}`,
          `${vol.organization}${vol.url ? ` (${vol.url.replace(/^https?:\/\/(www\.)?/, "")})` : ""}`,
          `${formatDate(vol.startDate)} - ${vol.endDate ? formatDate(vol.endDate) : "Present"}`,
          "",
        )

        if (vol.summary) {
          volunteerSection.push(vol.summary, "")
        }

        if (vol.highlights && vol.highlights.length > 0) {
          vol.highlights.forEach((highlight) => {
            volunteerSection.push(`* ${highlight}`)
          })
          volunteerSection.push("")
        }
      })

      sections.push(formatTextBlock(volunteerSection))
    }

    // Awards
    if (awards && awards.length > 0) {
      const awardsSection = ["AWARDS", sectionDivider]

      awards.forEach((award) => {
        awardsSection.push(
          `${award.title} - ${award.awarder}${award.date ? ` (${formatDate(award.date)})` : ""}`,
          award.summary ? `${award.summary}` : "",
          "",
        )
      })

      sections.push(formatTextBlock(awardsSection))
    }

    // Certificates
    if (certificates && certificates.length > 0) {
      const certificatesSection = ["CERTIFICATIONS", sectionDivider]

      certificates.forEach((cert) => {
        certificatesSection.push(
          `${cert.name} - ${cert.issuer}${cert.date ? ` (${formatDate(cert.date)})` : ""}`,
          cert.url ? `Verify at: ${cert.url}` : "",
          "",
        )
      })

      sections.push(formatTextBlock(certificatesSection))
    }

    // Publications
    if (publications && publications.length > 0) {
      const publicationsSection = ["PUBLICATIONS", sectionDivider]

      publications.forEach((pub) => {
        publicationsSection.push(
          `${pub.name} - ${pub.publisher}${pub.releaseDate ? ` (${formatDate(pub.releaseDate)})` : ""}`,
          pub.url ? `URL: ${pub.url}` : "",
          pub.summary ? `${pub.summary}` : "",
          "",
        )
      })

      sections.push(formatTextBlock(publicationsSection))
    }

    // Interests
    if (interests && interests.length > 0) {
      const interestsSection = [
        "INTERESTS",
        sectionDivider,
        interests
          .map((interest) => `${interest.name}${interest.keywords ? ` (${interest.keywords.join(", ")})` : ""}`)
          .join(", "),
        "",
      ]

      sections.push(formatTextBlock(interestsSection))
    }

    // References
    if (references && references.length > 0) {
      const referencesSection = ["REFERENCES", sectionDivider]

      references.forEach((ref) => {
        referencesSection.push(`${ref.name}`, ref.reference ? `"${ref.reference}"` : "", "")
      })

      sections.push(formatTextBlock(referencesSection))
    }

    return sections.join("\n")
  }

  const plainTextResume = buildPlainTextResume()

  return (
    <div className="font-mono whitespace-pre-wrap bg-white p-6 border rounded-md text-sm" id="plain-text-content">
      {plainTextResume}
    </div>
  )
}

