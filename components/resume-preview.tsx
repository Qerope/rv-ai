"use client"

import type { ResumeData } from "@/lib/types"
import { formatDate } from "@/lib/utils"

export function ResumePreview({ data, theme = "indigo" }: { data: ResumeData; theme?: string }) {
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

  // Function to get theme-specific classes
  const getThemeClasses = (type: string) => {
    const themeColors = {
      indigo: {
        primary: "text-indigo-700",
        secondary: "text-indigo-600",
        border: "border-indigo-200",
        borderAccent: "border-indigo-300",
        bg: "bg-indigo-50",
        bgLight: "bg-indigo-50/50",
        bgAccent: "bg-indigo-100",
        gradientFrom: "from-indigo-50",
        gradientTo: "to-indigo-100/50",
        hover: "hover:bg-indigo-100",
        shadow: "shadow-indigo-100",
      },
      emerald: {
        primary: "text-emerald-700",
        secondary: "text-emerald-600",
        border: "border-emerald-200",
        borderAccent: "border-emerald-300",
        bg: "bg-emerald-50",
        bgLight: "bg-emerald-50/50",
        bgAccent: "bg-emerald-100",
        gradientFrom: "from-emerald-50",
        gradientTo: "to-emerald-100/50",
        hover: "hover:bg-emerald-100",
        shadow: "shadow-emerald-100",
      },
      rose: {
        primary: "text-rose-700",
        secondary: "text-rose-600",
        border: "border-rose-200",
        borderAccent: "border-rose-300",
        bg: "bg-rose-50",
        bgLight: "bg-rose-50/50",
        bgAccent: "bg-rose-100",
        gradientFrom: "from-rose-50",
        gradientTo: "to-rose-100/50",
        hover: "hover:bg-rose-100",
        shadow: "shadow-rose-100",
      },
      amber: {
        primary: "text-amber-700",
        secondary: "text-amber-600",
        border: "border-amber-200",
        borderAccent: "border-amber-300",
        bg: "bg-amber-50",
        bgLight: "bg-amber-50/50",
        bgAccent: "bg-amber-100",
        gradientFrom: "from-amber-50",
        gradientTo: "to-amber-100/50",
        hover: "hover:bg-amber-100",
        shadow: "shadow-amber-100",
      },
      sky: {
        primary: "text-sky-700",
        secondary: "text-sky-600",
        border: "border-sky-200",
        borderAccent: "border-sky-300",
        bg: "bg-sky-50",
        bgLight: "bg-sky-50/50",
        bgAccent: "bg-sky-100",
        gradientFrom: "from-sky-50",
        gradientTo: "to-sky-100/50",
        hover: "hover:bg-sky-100",
        shadow: "shadow-sky-100",
      },
      purple: {
        primary: "text-purple-700",
        secondary: "text-purple-600",
        border: "border-purple-200",
        borderAccent: "border-purple-300",
        bg: "bg-purple-50",
        bgLight: "bg-purple-50/50",
        bgAccent: "bg-purple-100",
        gradientFrom: "from-purple-50",
        gradientTo: "to-purple-100/50",
        hover: "hover:bg-purple-100",
        shadow: "shadow-purple-100",
      },
    }

    return themeColors[theme as keyof typeof themeColors][type as keyof (typeof themeColors)[keyof typeof themeColors]]
  }

  return (
    <div id="resume-html" className="font-sans text-gray-800 max-w-4xl mx-auto">
      {/* Enhanced Header with better design */}
      <header className={`mb-8 rounded-lg overflow-hidden shadow-md relative ${getThemeClasses("bgLight")}`}>
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getThemeClasses("gradientFrom")} ${getThemeClasses("gradientTo")} -z-10`}
        ></div>

        {/* Top accent bar */}
        <div className={`h-2 w-full ${getThemeClasses("bgAccent")}`}></div>

        <div className="p-6">
          {/* Name and title */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end">
            <div>
              <h1 className={`text-3xl font-bold ${getThemeClasses("primary")}`}>{basics.name}</h1>
              {basics.label && <p className="text-lg text-gray-600 mt-1">{basics.label}</p>}
            </div>

            {/* Contact info container - right aligned on desktop */}
            <div className="mt-4 md:mt-0 md:text-right">
              {basics.email && (
                <div className="flex items-center md:justify-end mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-2 ${getThemeClasses("secondary")}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a href={`mailto:${basics.email}`} className={`${getThemeClasses("primary")} hover:underline`}>
                    {basics.email}
                  </a>
                </div>
              )}
              {basics.phone && (
                <div className="flex items-center md:justify-end mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-2 ${getThemeClasses("secondary")}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{basics.phone}</span>
                </div>
              )}
              {basics.url && (
                <div className="flex items-center md:justify-end mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-2 ${getThemeClasses("secondary")}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <a
                    href={basics.url}
                    className={`${getThemeClasses("primary")} hover:underline`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {basics.url.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </div>
              )}
              {basics.location && (
                <div className="flex items-center md:justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-2 ${getThemeClasses("secondary")}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    {[basics.location.city, basics.location.region, basics.location.countryCode]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Social profiles */}
          {basics.profiles && basics.profiles.length > 0 && (
            <div className={`flex flex-wrap gap-x-4 mt-4 pt-4 border-t ${getThemeClasses("border")}`}>
              {basics.profiles.map((profile, index) => (
                <a
                  key={index}
                  href={profile.url}
                  className={`${getThemeClasses("primary")} hover:underline flex items-center text-sm`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  {profile.network} ({profile.username})
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className="mb-6">
          <h2
            className={`text-lg font-semibold ${getThemeClasses("primary")} border-b ${getThemeClasses("borderAccent")} pb-2 mb-3`}
          >
            Summary
          </h2>
          <p className="leading-relaxed text-gray-700">{basics.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {work && work.length > 0 && (
        <section className="mb-8">
          <h2
            className={`text-lg font-semibold ${getThemeClasses("primary")} border-b ${getThemeClasses("borderAccent")} pb-2 mb-4`}
          >
            Experience
          </h2>
          {work.map((job, index) => (
            <div
              key={index}
              className={`mb-6 pl-4 border-l-2 ${getThemeClasses("border")} hover:border-l-2 ${getThemeClasses("borderAccent")} transition-colors`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className={`font-bold ${getThemeClasses("primary")} text-lg`}>{job.position}</h3>
                <span className="text-sm text-gray-600 font-medium mt-1 md:mt-0">
                  {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : "Present"}
                </span>
              </div>
              <div className="mt-1">
                <p className="font-medium text-gray-800">
                  {job.name}
                  {job.url && (
                    <a
                      href={job.url}
                      className={`ml-1 ${getThemeClasses("primary")} hover:underline text-sm`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ({job.url.replace(/^https?:\/\/(www\.)?/, "")})
                    </a>
                  )}
                </p>
              </div>
              {job.summary && <p className="mt-2 text-gray-700">{job.summary}</p>}
              {job.highlights && job.highlights.length > 0 && (
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  {job.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Volunteer Experience */}
      {volunteer && volunteer.length > 0 && (
        <section className="mb-8">
          <h2
            className={`text-lg font-semibold ${getThemeClasses("primary")} border-b ${getThemeClasses("borderAccent")} pb-2 mb-4`}
          >
            Volunteer Experience
          </h2>
          {volunteer.map((vol, index) => (
            <div
              key={index}
              className={`mb-6 pl-4 border-l-2 ${getThemeClasses("border")} hover:border-l-2 ${getThemeClasses("borderAccent")} transition-colors`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className={`font-bold ${getThemeClasses("primary")} text-lg`}>{vol.position}</h3>
                <span className="text-sm text-gray-600 font-medium mt-1 md:mt-0">
                  {formatDate(vol.startDate)} - {vol.endDate ? formatDate(vol.endDate) : "Present"}
                </span>
              </div>
              <p className="font-medium text-gray-800 mt-1">{vol.organization}</p>
              {vol.summary && <p className="mt-2 text-gray-700">{vol.summary}</p>}
              {vol.highlights && vol.highlights.length > 0 && (
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  {vol.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-8">
          <h2
            className={`text-lg font-semibold ${getThemeClasses("primary")} border-b ${getThemeClasses("borderAccent")} pb-2 mb-4`}
          >
            Projects
          </h2>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`mb-6 pl-4 border-l-2 ${getThemeClasses("border")} hover:border-l-2 ${getThemeClasses("borderAccent")} transition-colors`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className={`font-bold ${getThemeClasses("primary")} text-lg`}>
                  {project.name}
                  {project.url && (
                    <a
                      href={project.url}
                      className={`ml-2 ${getThemeClasses("primary")} hover:underline text-sm font-normal`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </h3>
                {(project.startDate || project.endDate) && (
                  <span className="text-sm text-gray-600 font-medium mt-1 md:mt-0">
                    {project.startDate && formatDate(project.startDate)}
                    {project.startDate && project.endDate && " - "}
                    {project.endDate ? formatDate(project.endDate) : project.startDate ? "Present" : ""}
                  </span>
                )}
              </div>
              {project.description && <p className="mt-2 text-gray-700">{project.description}</p>}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-8">
          <h2
            className={`text-lg font-semibold ${getThemeClasses("primary")} border-b ${getThemeClasses("borderAccent")} pb-2 mb-4`}
          >
            Education
          </h2>
          {education.map((edu, index) => (
            <div
              key={index}
              className={`mb-6 pl-4 border-l-2 ${getThemeClasses("border")} hover:border-l-2 ${getThemeClasses("borderAccent")} transition-colors`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className={`font-bold ${getThemeClasses("primary")} text-lg`}>{edu.institution}</h3>
                <span className="text-sm text-gray-600 font-medium mt-1 md:mt-0">
                  {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </span>
              </div>
              <p className="font-medium text-gray-800 mt-1">
                {edu.studyType}
                {edu.area ? `, ${edu.area}` : ""}
                {edu.score && <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded">GPA: {edu.score}</span>}
              </p>
              {edu.courses && edu.courses.length > 0 && (
                <div className="mt-2 text-gray-700">
                  <span className="font-medium">Relevant Courses: </span>
                  {edu.courses.join(", ")}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h2
            className={`text-lg font-semibold ${getThemeClasses("primary")} border-b ${getThemeClasses("borderAccent")} pb-2 mb-4`}
          >
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`${getThemeClasses("bg")} p-4 rounded-md shadow-sm ${getThemeClasses("shadow")} ${getThemeClasses("hover")} transition-colors`}
              >
                <h3 className={`font-bold ${getThemeClasses("primary")}`}>{skill.name}</h3>
                {skill.keywords && skill.keywords.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skill.keywords.map((keyword, i) => (
                      <span key={i} className="inline-block text-sm bg-white px-2 py-1 rounded border border-gray-200">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certificates */}
      {certificates && certificates.length > 0 && (
        <section className="mb-8">
          <h2
            className={`text-lg font-semibold ${getThemeClasses("primary")} border-b ${getThemeClasses("borderAccent")} pb-2 mb-4`}
          >
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className={`${getThemeClasses("bg")} p-4 rounded-md shadow-sm ${getThemeClasses("shadow")}`}
              >
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold ${getThemeClasses("primary")}`}>
                    {cert.name}
                    {cert.url && (
                      <a
                        href={cert.url}
                        className={`ml-2 ${getThemeClasses("primary")} hover:underline text-sm font-normal`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Verify
                      </a>
                    )}
                  </h3>
                  {cert.date && (
                    <span className="text-sm text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                      {formatDate(cert.date)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-1">Issued by {cert.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Awards */}
      {awards && awards.length > 0 && (
        <section className="mb-8">
          <h2
            className={`text-lg font-semibold ${getThemeClasses("primary")} border-b ${getThemeClasses("borderAccent")} pb-2 mb-4`}
          >
            Awards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map((award, index) => (
              <div
                key={index}
                className={`${getThemeClasses("bg")} p-4 rounded-md shadow-sm ${getThemeClasses("shadow")}`}
              >
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold ${getThemeClasses("primary")}`}>{award.title}</h3>
                  {award.date && (
                    <span className="text-sm text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                      {formatDate(award.date)}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-800 mt-1">{award.awarder}</p>
                {award.summary && <p className="mt-2 text-sm text-gray-700">{award.summary}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section className="mb-8">
          <h2
            className={`text-lg font-semibold ${getThemeClasses("primary")} border-b ${getThemeClasses("borderAccent")} pb-2 mb-4`}
          >
            Languages
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {languages.map((lang, index) => (
              <div
                key={index}
                className={`${getThemeClasses("bg")} p-3 rounded-md shadow-sm ${getThemeClasses("shadow")}`}
              >
                <span className={`font-bold ${getThemeClasses("primary")}`}>{lang.language}</span>
                <div className="text-sm text-gray-700 mt-1">{lang.fluency}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interests */}
      {interests && interests.length > 0 && (
        <section className="mb-8">
          <h2
            className={`text-lg font-semibold ${getThemeClasses("primary")} border-b ${getThemeClasses("borderAccent")} pb-2 mb-4`}
          >
            Interests
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {interests.map((interest, index) => (
              <div
                key={index}
                className={`${getThemeClasses("bg")} p-3 rounded-md shadow-sm ${getThemeClasses("shadow")}`}
              >
                <span className={`font-bold ${getThemeClasses("primary")}`}>{interest.name}</span>
                {interest.keywords && interest.keywords.length > 0 && (
                  <div className="text-sm text-gray-700 mt-1">{interest.keywords.join(", ")}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publications */}
      {publications && publications.length > 0 && (
        <section className="mb-8">
          <h2
            className={`text-lg font-semibold ${getThemeClasses("primary")} border-b ${getThemeClasses("borderAccent")} pb-2 mb-4`}
          >
            Publications
          </h2>
          {publications.map((pub, index) => (
            <div
              key={index}
              className={`mb-6 pl-4 border-l-2 ${getThemeClasses("border")} hover:border-l-2 ${getThemeClasses("borderAccent")} transition-colors`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className={`font-bold ${getThemeClasses("primary")} text-lg`}>{pub.name}</h3>
                {pub.releaseDate && (
                  <span className="text-sm text-gray-600 font-medium mt-1 md:mt-0">{formatDate(pub.releaseDate)}</span>
                )}
              </div>
              <p className="font-medium text-gray-800 mt-1">{pub.publisher}</p>
              {pub.url && (
                <a
                  href={pub.url}
                  className={`inline-block mt-2 ${getThemeClasses("primary")} hover:underline`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Publication
                </a>
              )}
              {pub.summary && <p className="mt-2 text-gray-700">{pub.summary}</p>}
            </div>
          ))}
        </section>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <section className="mb-8">
          <h2
            className={`text-lg font-semibold ${getThemeClasses("primary")} border-b ${getThemeClasses("borderAccent")} pb-2 mb-4`}
          >
            References
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {references.map((ref, index) => (
              <div
                key={index}
                className={`${getThemeClasses("bg")} p-4 rounded-md shadow-sm ${getThemeClasses("shadow")}`}
              >
                <h3 className={`font-bold ${getThemeClasses("primary")}`}>{ref.name}</h3>
                {ref.reference && <p className="text-gray-700 italic mt-2">"{ref.reference}"</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer with subtle styling */}
      <footer className={`mt-8 pt-4 border-t ${getThemeClasses("border")} text-center text-sm text-gray-500`}>
        <p>This resume is ATS-friendly and optimized for applicant tracking systems.</p>
      </footer>
    </div>
  )
}

