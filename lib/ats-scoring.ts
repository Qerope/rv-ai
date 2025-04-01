import type { ResumeData } from "./types"

// Types for ATS scoring
export interface SectionScore {
  name: string
  score: number
  maxScore: number
  feedback: string
}

export interface AtsScoreResult {
  overallScore: number
  sectionScores: SectionScore[]
  keywordMatches?: { [key: string]: number }
  suggestions: string[]
}

/**
 * Simulates how an ATS system would score a resume
 */
export function calculateAtsScore(resume: ResumeData, jobKeywords?: string[]): AtsScoreResult {
  const sectionScores: SectionScore[] = []
  const suggestions: string[] = []
  let totalScore = 0
  let totalMaxScore = 0

  // 1. Check for essential sections
  const basicsSectionScore = evaluateBasicsSection(resume.basics)
  sectionScores.push(basicsSectionScore)
  totalScore += basicsSectionScore.score
  totalMaxScore += basicsSectionScore.maxScore

  // 2. Check for work experience
  const workSectionScore = evaluateWorkSection(resume.work || [])
  sectionScores.push(workSectionScore)
  totalScore += workSectionScore.score
  totalMaxScore += workSectionScore.maxScore

  // 3. Check for education
  const educationSectionScore = evaluateEducationSection(resume.education || [])
  sectionScores.push(educationSectionScore)
  totalScore += educationSectionScore.score
  totalMaxScore += educationSectionScore.maxScore

  // 4. Check for skills
  const skillsSectionScore = evaluateSkillsSection(resume.skills || [])
  sectionScores.push(skillsSectionScore)
  totalScore += skillsSectionScore.score
  totalMaxScore += skillsSectionScore.maxScore

  // 5. Check for projects (optional but valuable)
  const projectsSectionScore = evaluateProjectsSection(resume.projects || [])
  sectionScores.push(projectsSectionScore)
  totalScore += projectsSectionScore.score
  totalMaxScore += projectsSectionScore.maxScore

  // 6. Check for keyword matches if job keywords are provided
  let keywordMatchScore: SectionScore | null = null
  let keywordMatches: { [key: string]: number } = {}

  if (jobKeywords && jobKeywords.length > 0) {
    const result = evaluateKeywordMatches(resume, jobKeywords)
    keywordMatchScore = result.sectionScore
    keywordMatches = result.matches

    sectionScores.push(keywordMatchScore)
    totalScore += keywordMatchScore.score
    totalMaxScore += keywordMatchScore.maxScore

    if (keywordMatchScore.score < keywordMatchScore.maxScore * 0.7) {
      suggestions.push("Consider adding more job-specific keywords to improve ATS matching.")
    }
  }

  // 7. Check for formatting issues
  const formattingScore = evaluateFormatting(resume)
  sectionScores.push(formattingScore)
  totalScore += formattingScore.score
  totalMaxScore += formattingScore.maxScore

  // Calculate overall percentage
  const overallScore = Math.round((totalScore / totalMaxScore) * 100)

  // Add general suggestions based on scores
  if (basicsSectionScore.score < basicsSectionScore.maxScore) {
    suggestions.push("Complete all contact information in the basics section.")
  }

  if (workSectionScore.score < workSectionScore.maxScore * 0.7) {
    suggestions.push("Add more details to your work experience, including measurable achievements.")
  }

  if (skillsSectionScore.score < skillsSectionScore.maxScore * 0.8) {
    suggestions.push("Expand your skills section with relevant technical and soft skills.")
  }

  return {
    overallScore,
    sectionScores,
    keywordMatches: keywordMatches,
    suggestions,
  }
}

// Helper functions for section evaluations

function evaluateBasicsSection(basics: ResumeData["basics"]): SectionScore {
  let score = 0
  const maxScore = 20
  const feedback: string[] = []

  // Check for essential contact information
  if (basics.name) score += 4
  else feedback.push("Missing name")

  if (basics.email) score += 3
  else feedback.push("Missing email")

  if (basics.phone) score += 3
  else feedback.push("Missing phone number")

  if (basics.location && (basics.location.city || basics.location.region)) score += 2
  else feedback.push("Missing location information")

  // Check for professional summary
  if (basics.summary) {
    if (basics.summary.length > 100) score += 5
    else {
      score += 3
      feedback.push("Summary is too brief")
    }
  } else {
    feedback.push("Missing professional summary")
  }

  // Check for online profiles
  if (basics.profiles && basics.profiles.length > 0) {
    score += Math.min(3, basics.profiles.length)
  } else {
    feedback.push("No professional online profiles included")
  }

  return {
    name: "Contact Information & Summary",
    score,
    maxScore,
    feedback: feedback.join(". "),
  }
}

function evaluateWorkSection(work: ResumeData["work"]): SectionScore {
  let score = 0
  const maxScore = 25
  const feedback: string[] = []

  if (!work || work.length === 0) {
    feedback.push("No work experience listed")
    return { name: "Work Experience", score, maxScore, feedback: feedback.join(". ") }
  }

  // Base points for having work experience
  score += Math.min(10, work.length * 2)

  // Check for quality of work entries
  let detailedEntries = 0
  let hasActionVerbs = 0
  let hasMetrics = 0

  work.forEach((job) => {
    // Check for complete information
    let entryScore = 0
    if (job.position) entryScore++
    if (job.name) entryScore++
    if (job.startDate) entryScore++
    if (job.endDate || job.endDate === "Present") entryScore++

    // Check for detailed descriptions
    if (job.summary && job.summary.length > 50) entryScore++

    // Check for bullet points with achievements
    if (job.highlights && job.highlights.length > 0) {
      entryScore += Math.min(3, job.highlights.length)

      // Check for action verbs and metrics in highlights
      job.highlights.forEach((highlight) => {
        const actionVerbPattern =
          /^(Developed|Created|Managed|Led|Implemented|Designed|Improved|Increased|Reduced|Achieved)/i
        if (actionVerbPattern.test(highlight)) hasActionVerbs++

        const metricsPattern = /\d+%|\d+ percent|\$\d+|\d+ million|\d+ thousand|\d+ users/i
        if (metricsPattern.test(highlight)) hasMetrics++
      })
    }

    if (entryScore >= 7) detailedEntries++
  })

  // Add points for detailed entries
  score += Math.min(5, detailedEntries * 2)

  // Add points for action verbs and metrics
  score += Math.min(5, hasActionVerbs)
  score += Math.min(5, hasMetrics * 2)

  if (detailedEntries < work.length) {
    feedback.push("Some work entries lack detail")
  }

  if (hasActionVerbs < 3) {
    feedback.push("Use more action verbs to start achievement bullets")
  }

  if (hasMetrics < 2) {
    feedback.push("Include more measurable achievements with metrics")
  }

  return {
    name: "Work Experience",
    score,
    maxScore,
    feedback: feedback.join(". "),
  }
}

function evaluateEducationSection(education: ResumeData["education"]): SectionScore {
  let score = 0
  const maxScore = 15
  const feedback: string[] = []

  if (!education || education.length === 0) {
    feedback.push("No education listed")
    return { name: "Education", score, maxScore, feedback: feedback.join(". ") }
  }

  // Base points for having education
  score += 5

  // Check for quality of education entries
  let completeEntries = 0

  education.forEach((edu) => {
    let entryScore = 0
    if (edu.institution) entryScore++
    if (edu.area) entryScore++
    if (edu.studyType) entryScore++
    if (edu.startDate) entryScore++
    if (edu.endDate || edu.endDate === "Present") entryScore++

    // Bonus for relevant courses
    if (edu.courses && edu.courses.length > 0) {
      entryScore += Math.min(2, edu.courses.length)
    }

    if (entryScore >= 5) completeEntries++
  })

  // Add points for complete entries
  score += Math.min(10, completeEntries * 5)

  if (completeEntries < education.length) {
    feedback.push("Some education entries are incomplete")
  }

  return {
    name: "Education",
    score,
    maxScore,
    feedback: feedback.join(". "),
  }
}

function evaluateSkillsSection(skills: ResumeData["skills"]): SectionScore {
  let score = 0
  const maxScore = 20
  const feedback: string[] = []

  if (!skills || skills.length === 0) {
    feedback.push("No skills listed")
    return { name: "Skills", score, maxScore, feedback: feedback.join(". ") }
  }

  // Base points for having skills
  score += 5

  // Count total skills and categorized skills
  let totalKeywords = 0
  let categorizedSkills = 0

  skills.forEach((skill) => {
    if (skill.name) categorizedSkills++

    if (skill.keywords && skill.keywords.length > 0) {
      totalKeywords += skill.keywords.length
    }
  })

  // Add points for number of skills
  score += Math.min(10, totalKeywords / 2)

  // Add points for organization
  score += Math.min(5, categorizedSkills * 2)

  if (totalKeywords < 10) {
    feedback.push("Consider adding more skills")
  }

  if (categorizedSkills < 3) {
    feedback.push("Organize skills into more categories")
  }

  return {
    name: "Skills",
    score,
    maxScore,
    feedback: feedback.join(". "),
  }
}

function evaluateProjectsSection(projects: ResumeData["projects"]): SectionScore {
  let score = 0
  const maxScore = 10
  const feedback: string[] = []

  if (!projects || projects.length === 0) {
    feedback.push("No projects listed")
    return { name: "Projects", score, maxScore, feedback: feedback.join(". ") }
  }

  // Base points for having projects
  score += 3

  // Check for quality of project entries
  let detailedProjects = 0

  projects.forEach((project) => {
    let entryScore = 0
    if (project.name) entryScore++
    if (project.description && project.description.length > 30) entryScore += 2
    if (project.highlights && project.highlights.length > 0) entryScore += 2
    if (project.url) entryScore++

    if (entryScore >= 4) detailedProjects++
  })

  // Add points for detailed projects
  score += Math.min(7, detailedProjects * 2)

  if (detailedProjects < projects.length) {
    feedback.push("Some projects lack detail")
  }

  return {
    name: "Projects",
    score,
    maxScore,
    feedback: feedback.join(". "),
  }
}

function evaluateKeywordMatches(
  resume: ResumeData,
  jobKeywords: string[],
): {
  sectionScore: SectionScore
  matches: { [key: string]: number }
} {
  let score = 0
  const maxScore = 20
  const feedback: string[] = []
  const matches: { [key: string]: number } = {}

  // Prepare resume text for keyword matching
  const resumeText = getFullResumeText(resume).toLowerCase()

  // Count keyword matches
  let matchedKeywords = 0
  let totalKeywordImportance = 0

  jobKeywords.forEach((keyword) => {
    const keywordLower = keyword.toLowerCase().trim()
    if (!keywordLower) return

    // Count occurrences
    const regex = new RegExp(`\\b${keywordLower}\\b`, "gi")
    const occurrences = (resumeText.match(regex) || []).length

    // Assign importance (could be refined based on position in job description)
    const importance = 1
    totalKeywordImportance += importance

    if (occurrences > 0) {
      matchedKeywords++
      matches[keyword] = occurrences
    }
  })

  // Calculate score based on percentage of matched keywords
  if (jobKeywords.length > 0) {
    const matchPercentage = matchedKeywords / jobKeywords.length
    score = Math.round(maxScore * matchPercentage)

    if (matchPercentage < 0.5) {
      feedback.push(`Only matched ${matchedKeywords} out of ${jobKeywords.length} job keywords`)
    } else if (matchPercentage < 0.7) {
      feedback.push(`Matched ${matchedKeywords} out of ${jobKeywords.length} job keywords`)
    } else {
      feedback.push(`Good keyword matching: ${matchedKeywords} out of ${jobKeywords.length} job keywords`)
    }
  }

  return {
    sectionScore: {
      name: "Keyword Matching",
      score,
      maxScore,
      feedback: feedback.join(". "),
    },
    matches,
  }
}

function evaluateFormatting(resume: ResumeData): SectionScore {
  let score = 0
  const maxScore = 10
  const feedback: string[] = []

  // Check for consistent date formatting
  const dateFormats = new Set()
  let dateCount = 0

  // Check work dates
  if (resume.work) {
    resume.work.forEach((job) => {
      if (job.startDate) {
        dateFormats.add(getDateFormat(job.startDate))
        dateCount++
      }
      if (job.endDate) {
        dateFormats.add(getDateFormat(job.endDate))
        dateCount++
      }
    })
  }

  // Check education dates
  if (resume.education) {
    resume.education.forEach((edu) => {
      if (edu.startDate) {
        dateFormats.add(getDateFormat(edu.startDate))
        dateCount++
      }
      if (edu.endDate) {
        dateFormats.add(getDateFormat(edu.endDate))
        dateCount++
      }
    })
  }

  // Score date consistency
  if (dateCount > 0) {
    if (dateFormats.size === 1) {
      score += 5
    } else {
      score += Math.max(0, 5 - dateFormats.size)
      feedback.push("Inconsistent date formats detected")
    }
  }

  // Check for section organization
  const hasStandardSections = resume.work !== undefined && resume.education !== undefined && resume.skills !== undefined

  if (hasStandardSections) {
    score += 5
  } else {
    feedback.push("Missing standard resume sections")
    score += 2
  }

  return {
    name: "Formatting & Structure",
    score,
    maxScore,
    feedback: feedback.join(". "),
  }
}

// Helper functions

function getDateFormat(dateString: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return "YYYY-MM-DD"
  } else if (/^\d{4}-\d{2}$/.test(dateString)) {
    return "YYYY-MM"
  } else if (/^\d{4}$/.test(dateString)) {
    return "YYYY"
  } else if (/^[A-Za-z]{3} \d{4}$/.test(dateString)) {
    return "MMM YYYY"
  } else {
    return "other"
  }
}

function getFullResumeText(resume: ResumeData): string {
  const textParts: string[] = []

  // Basics
  if (resume.basics) {
    textParts.push(resume.basics.name || "")
    textParts.push(resume.basics.label || "")
    textParts.push(resume.basics.summary || "")
  }

  // Work
  if (resume.work) {
    resume.work.forEach((job) => {
      textParts.push(job.position || "")
      textParts.push(job.name || "")
      textParts.push(job.summary || "")
      if (job.highlights) {
        textParts.push(job.highlights.join(" "))
      }
    })
  }

  // Education
  if (resume.education) {
    resume.education.forEach((edu) => {
      textParts.push(edu.institution || "")
      textParts.push(edu.area || "")
      textParts.push(edu.studyType || "")
      if (edu.courses) {
        textParts.push(edu.courses.join(" "))
      }
    })
  }

  // Skills
  if (resume.skills) {
    resume.skills.forEach((skill) => {
      textParts.push(skill.name || "")
      if (skill.keywords) {
        textParts.push(skill.keywords.join(" "))
      }
    })
  }

  // Projects
  if (resume.projects) {
    resume.projects.forEach((project) => {
      textParts.push(project.name || "")
      textParts.push(project.description || "")
      if (project.highlights) {
        textParts.push(project.highlights.join(" "))
      }
    })
  }

  return textParts.join(" ")
}

