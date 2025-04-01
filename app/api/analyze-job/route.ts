import { NextResponse } from "next/server"
import { generateText } from "ai"
import { cohere } from "@ai-sdk/cohere"

export async function POST(req: Request) {
  try {
    const { jobDescription } = await req.json()

    if (!jobDescription) {
      return NextResponse.json({ error: "Job description is required" }, { status: 400 })
    }

    const systemPrompt = `Generate a JSON formatted {company: String, job_title: String, job_requirements: String, job_keywords: String, job_shortname: String} for the provided job description. 
    job_shortname must only include lowercase letters and underscores maximum 3 parts. 
    job_keywords must include everything important from the job description as a comma-separated list. 
    job_requirements must include recommended qualifications and skills in a concise paragraph.`

    const { text } = await generateText({
      model: cohere("command-r-plus"),
      prompt: jobDescription,
      system: systemPrompt,
      format: {
        type: "json_object",
        schema: {
          type: "object",
          properties: {
            company: { type: "string" },
            job_title: { type: "string" },
            job_requirements: { type: "string" },
            job_keywords: { type: "string" },
            job_shortname: { type: "string" },
          },
          required: ["company", "job_title", "job_requirements", "job_keywords", "job_shortname"],
        },
      },
    })

    const jobSummary = JSON.parse(text)

    return NextResponse.json({
      company: jobSummary.company,
      title: jobSummary.job_title,
      requirements: jobSummary.job_requirements,
      keywords: jobSummary.job_keywords,
      shortname: `resume_${jobSummary.job_shortname}`,
    })
  } catch (error) {
    console.error("Error analyzing job description:", error)
    return NextResponse.json({ error: "Failed to analyze job description" }, { status: 500 })
  }
}

