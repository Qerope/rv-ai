"use server"

import { CohereClientV2 } from "cohere-ai"

export type JobAnalysisResult = {
  company: string
  title: string
  requirements: string
  keywords: string
  shortname: string
  error?: string
}

export async function analyzeJobDescription(jobDescription: string): Promise<JobAnalysisResult> {
  try {
    const cohere_api_key = process.env.CO_API_KEY

    if (!cohere_api_key) {
      return {
        company: "",
        title: "",
        requirements: "",
        keywords: "",
        shortname: "",
        error: "API key not configured",
      }
    }

    const cohere_client = new CohereClientV2({
      token: cohere_api_key,
    })

    const responseFormat = {
      type: "json_object",
      json_schema: {
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
    }

    // Call Cohere API to summarize job description
    const response = await cohere_client.chat({
      messages: [
        {
          role: "system",
          content:
            "Generate a JSON formatted {company: String, job_title: String, job_requirements: String, job_keywords: String, job_shortname: String} for the provided job description. job_shortname must only include lowercase letters and underscores maximum 3 parts. job_keywords must include everything. job_requirements must include recommended.",
        },
        {
          role: "user",
          content: jobDescription,
        },
      ],
      responseFormat,
      safetyMode: "OFF",
      model: "command-r-plus-08-2024",
    })

    const content = response.message.content[0].text
    console.log(content)
    const jobdet = JSON.parse(content)

    return {
      company: jobdet.company,
      title: jobdet.job_title,
      requirements: jobdet.job_requirements,
      keywords: jobdet.job_keywords,
      shortname: `resume_${jobdet.job_shortname}`,
    }
  } catch (error) {
    console.error("Error analyzing job description:", error)
    return {
      company: "",
      title: "",
      requirements: "",
      keywords: "",
      shortname: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

