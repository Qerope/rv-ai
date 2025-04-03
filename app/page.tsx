"use client"

import type React from "react"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ResumePreview } from "@/components/resume-preview"
import { PdfPreview } from "@/components/pdf-preview"
import { PlainTextPreview } from "@/components/plain-text-preview"
import { defaultResumeData } from "@/lib/default-data"
import type { ResumeData } from "@/lib/types"
import { AlertCircle, FileText, FileCode, Info, CheckCircle, Printer } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AtsTipsModal } from "@/components/ats-tips-modal"
import { AtsScoreDetails } from "@/components/ats-score-details"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { calculateAtsScore, type AtsScoreResult } from "@/lib/ats-scoring"

export default function Home() {
  const searchParams = useSearchParams()
  const jobParam = searchParams.get("job")
  const keysParam = searchParams.get("keys")

  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [jsonError, setJsonError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("html")
  const [colorTheme, setColorTheme] = useState<string>("indigo")
  const [atsScoreResult, setAtsScoreResult] = useState<AtsScoreResult>({
    overallScore: 0,
    sectionScores: [],
    suggestions: [],
  })
  const [pdfMode, setPdfMode] = useState<"ats" | "print">("ats")
  const [jobKeywords, setJobKeywords] = useState<string[]>([])

  useEffect(() => {
    if (jobParam && keysParam) {

      const jobName = jobParam.replace("resume_", "").replace(/_/g, " ")
      const exampleKeywords = generateExampleKeywords(keysParam)
      setJobKeywords(exampleKeywords)
    } else {
      setJobKeywords([
        "software development",
        "JavaScript",
        "React",
        "Node.js",
        "problem solving",
        "team collaboration",
        "agile methodology",
      ])
    }
  }, [jobParam])

  useEffect(() => {
    const scoreResult = calculateAtsScore(resumeData, jobKeywords)
    setAtsScoreResult(scoreResult)
  }, [resumeData, jobKeywords])

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsed = JSON.parse(e.target.value)
      setResumeData(parsed)
      setJsonError(null)
    } catch (error) {
      setJsonError("Invalid JSON format")
    }
  }

  const downloadHtml = () => {
    const htmlContent = document.getElementById("resume-html")?.outerHTML
    if (!htmlContent) return

    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${resumeData.basics.name.replace(/\s+/g, "_")}_Resume.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadPlainText = () => {
    const textContent = document.getElementById("plain-text-content")?.textContent
    if (!textContent) return

    const blob = new Blob([textContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${resumeData.basics.name.replace(/\s+/g, "_")}_Resume.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Helper function to generate example keywords based on job name
  const generateExampleKeywords = (jobName: string): string[] => {
    const techKeywords = [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "Java",
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
    ]
    const softSkillKeywords = [
      "communication",
      "teamwork",
      "problem solving",
      "leadership",
      "time management",
      "adaptability",
    ]

    // Select keywords based on job name
    const keywords: string[] = []

    if (jobName.toLowerCase().includes("develop")) {
      keywords.push("software development", "coding", "debugging", "git")
      keywords.push(...techKeywords.slice(0, 5))
    }

    if (jobName.toLowerCase().includes("engineer")) {
      keywords.push("software engineering", "system design", "architecture")
      keywords.push(...techKeywords.slice(3, 8))
    }

    if (jobName.toLowerCase().includes("data")) {
      keywords.push("data analysis", "SQL", "Python", "data visualization", "statistics")
    }

    if (jobName.toLowerCase().includes("design")) {
      keywords.push("UI/UX design", "wireframing", "prototyping", "user research", "Figma")
    }

    // Add some general soft skills
    keywords.push(...softSkillKeywords.slice(0, 4))

    // If we don't have enough keywords, add some general tech ones
    if (keywords.length < 8) {
      keywords.push(...techKeywords.slice(0, 8 - keywords.length))
    }

    return keywords.slice(0, 12) // Limit to 12 keywords
  }

  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">ATS-Friendly Resume Generator</h1>
      <p className="text-center text-muted-foreground mb-6">
        Create beautiful, professional resumes that pass through ATS systems
      </p>

      <div className="flex justify-center mb-6 gap-4">
        <Link href="#">
          <Button variant={!jobParam ? "default" : "outline"}>Resume Builder</Button>
        </Link>
        <Link href="job-analysis">
          <Button variant={jobParam ? "default" : "outline"}>Job Analysis</Button>
        </Link>
      </div>

      {jobParam && (
        <Alert className="mb-6 bg-primary/5 border-primary/20">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertTitle>Resume Optimization</AlertTitle>
          <AlertDescription>
            You're creating a resume optimized for:{" "}
            <span className="font-medium">{jobParam.replace("resume_", "").replace(/_/g, " ")}</span>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Resume JSON</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-sm">
                    <CheckCircle
                      className={`h-4 w-4 ${atsScoreResult.overallScore >= 80 ? "text-green-500" : atsScoreResult.overallScore >= 60 ? "text-amber-500" : "text-red-500"}`}
                    />
                    <span>ATS Score: {atsScoreResult.overallScore}%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-sm">
                    This score estimates how well your resume will perform with ATS systems. Higher scores indicate
                    better compatibility.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            className="font-mono h-[500px] mb-4"
            value={JSON.stringify(resumeData, null, 2)}
            onChange={handleJsonChange}
          />

          {jsonError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{jsonError}</AlertDescription>
            </Alert>
          )}

          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Color Theme:</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setColorTheme("indigo")}
                className={`w-8 h-8 rounded-full bg-indigo-500 ${colorTheme === "indigo" ? "ring-2 ring-offset-2 ring-indigo-500" : ""}`}
                aria-label="Indigo theme"
              />
              <button
                onClick={() => setColorTheme("emerald")}
                className={`w-8 h-8 rounded-full bg-emerald-500 ${colorTheme === "emerald" ? "ring-2 ring-offset-2 ring-emerald-500" : ""}`}
                aria-label="Emerald theme"
              />
              <button
                onClick={() => setColorTheme("rose")}
                className={`w-8 h-8 rounded-full bg-rose-500 ${colorTheme === "rose" ? "ring-2 ring-offset-2 ring-rose-500" : ""}`}
                aria-label="Rose theme"
              />
              <button
                onClick={() => setColorTheme("amber")}
                className={`w-8 h-8 rounded-full bg-amber-500 ${colorTheme === "amber" ? "ring-2 ring-offset-2 ring-amber-500" : ""}`}
                aria-label="Amber theme"
              />
              <button
                onClick={() => setColorTheme("sky")}
                className={`w-8 h-8 rounded-full bg-sky-500 ${colorTheme === "sky" ? "ring-2 ring-offset-2 ring-sky-500" : ""}`}
                aria-label="Sky theme"
              />
              <button
                onClick={() => setColorTheme("purple")}
                className={`w-8 h-8 rounded-full bg-purple-500 ${colorTheme === "purple" ? "ring-2 ring-offset-2 ring-purple-500" : ""}`}
                aria-label="Purple theme"
              />
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-6">
            Paste your resume JSON data above or modify the example.
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Resume Preview</h2>
            <div className="flex gap-2">
              {activeTab === "html" && (
                <Button onClick={downloadHtml} size="sm" variant="outline">
                  <FileCode className="mr-2 h-4 w-4" />
                  Download HTML
                </Button>
              )}
              {activeTab === "text" && (
                <Button onClick={downloadPlainText} size="sm" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Text
                </Button>
              )}
              {activeTab === "pdf" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={pdfMode === "ats" ? "default" : "outline"}
                    onClick={() => setPdfMode("ats")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    ATS PDF
                  </Button>
                  <Button
                    size="sm"
                    variant={pdfMode === "print" ? "default" : "outline"}
                    onClick={() => setPdfMode("print")}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print PDF
                  </Button>
                </div>
              )}
              <AtsScoreDetails scoreResult={atsScoreResult} />
            </div>
          </div>

          <Card className="mb-4">
            <CardContent className="p-0">
              <Tabs defaultValue="html" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="pdf">PDF</TabsTrigger>
                  <TabsTrigger value="text">Plain Text</TabsTrigger>
                </TabsList>
                <div className="p-4">
                  <TabsContent value="html" className="m-0">
                    <div
                      className={`border rounded-md p-6 bg-white ${colorTheme === "indigo" ? "theme-indigo" : colorTheme === "emerald" ? "theme-emerald" : colorTheme === "rose" ? "theme-rose" : colorTheme === "amber" ? "theme-amber" : colorTheme === "purple" ? "theme-purple" : "theme-sky"}`}
                    >
                      <ResumePreview data={resumeData} theme={colorTheme} />
                    </div>
                  </TabsContent>
                  <TabsContent value="pdf" className="m-0">
                    <PdfPreview data={resumeData} theme={colorTheme} printVersion={pdfMode === "print"} />
                  </TabsContent>
                  <TabsContent value="text" className="m-0">
                    <PlainTextPreview data={resumeData} />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          <div className="bg-muted p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                ATS Compatibility Tips:
              </h3>
              <AtsTipsModal />
            </div>
            <ul className="text-sm space-y-1 list-disc pl-5">
              <li>Use standard section headings (Experience, Education, Skills)</li>
              <li>Avoid tables, images, and complex formatting</li>
              <li>Use standard fonts and simple layouts</li>
              <li>Include keywords from the job description</li>
              <li>Use standard date formats (YYYY-MM-DD)</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

