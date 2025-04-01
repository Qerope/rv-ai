"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle, Clipboard, ClipboardCheck } from "lucide-react"
import { analyzeJobDescription, type JobAnalysisResult } from "@/app/actions/analyze-job"
import type { ResumeData } from "@/lib/types"

interface JobDescriptionAnalyzerProps {
  onApplyKeywords: (keywords: string[]) => void
  resumeData: ResumeData
}

export function JobDescriptionAnalyzer({ onApplyKeywords, resumeData }: JobDescriptionAnalyzerProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<JobAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("description")
  const [copied, setCopied] = useState(false)

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const analysisResult = await analyzeJobDescription(jobDescription)

      if (analysisResult.error) {
        setError(analysisResult.error)
        setResult(null)
      } else {
        setResult(analysisResult)
        setActiveTab("results")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during analysis")
      setResult(null)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleApplyKeywords = () => {
    if (!result) return

    // Extract keywords from the result
    const keywordsList = result.keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0)

    onApplyKeywords(keywordsList)
  }

  const copyToClipboard = () => {
    if (!result) return

    const textToCopy = `
Company: ${result.company}
Job Title: ${result.title}
Requirements: ${result.requirements}
Keywords: ${result.keywords}
    `.trim()

    navigator.clipboard.writeText(textToCopy)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const getKeywordMatch = () => {
    if (!result || !resumeData.skills) return { count: 0, total: 0, percentage: 0 }

    const jobKeywords = result.keywords
      .toLowerCase()
      .split(",")
      .map((k) => k.trim())

    const resumeKeywords = resumeData.skills.flatMap((skill) => skill.keywords || []).map((k) => k.toLowerCase())

    const matchedKeywords = jobKeywords.filter((keyword) =>
      resumeKeywords.some((resumeKeyword) => resumeKeyword.includes(keyword) || keyword.includes(resumeKeyword)),
    )

    return {
      count: matchedKeywords.length,
      total: jobKeywords.length,
      percentage: Math.round((matchedKeywords.length / jobKeywords.length) * 100),
    }
  }

  const keywordMatch = result ? getKeywordMatch() : { count: 0, total: 0, percentage: 0 }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Job Description Analyzer</CardTitle>
        <CardDescription>
          Paste a job description to analyze and extract key information to tailor your resume
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="description">Job Description</TabsTrigger>
          <TabsTrigger value="results" disabled={!result}>
            Analysis Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="p-0">
          <CardContent className="pt-6">
            <Textarea
              placeholder="Paste job description here..."
              className="min-h-[200px] mb-4"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button onClick={handleAnalyze} disabled={isAnalyzing || !jobDescription.trim()}>
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Job Description"
              )}
            </Button>
          </CardFooter>
        </TabsContent>

        <TabsContent value="results" className="p-0">
          {result && (
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{result.title}</h3>
                  <p className="text-muted-foreground">{result.company}</p>
                </div>
                <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-1">
                  {copied ? (
                    <>
                      <ClipboardCheck className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              <div>
                <h4 className="font-medium mb-2">Requirements</h4>
                <p className="text-sm">{result.requirements}</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Keywords</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      Match: {keywordMatch.count}/{keywordMatch.total}
                    </span>
                    <Badge
                      variant={
                        keywordMatch.percentage > 70
                          ? "default"
                          : keywordMatch.percentage > 40
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {keywordMatch.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.split(",").map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              <Alert
                className={
                  keywordMatch.percentage > 70 ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
                }
              >
                <div className="flex items-start gap-2">
                  {keywordMatch.percentage > 70 ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                  )}
                  <div>
                    <AlertTitle className={keywordMatch.percentage > 70 ? "text-green-800" : "text-amber-800"}>
                      {keywordMatch.percentage > 70
                        ? "Your resume matches this job well!"
                        : "Consider updating your resume for this job"}
                    </AlertTitle>
                    <AlertDescription className={keywordMatch.percentage > 70 ? "text-green-700" : "text-amber-700"}>
                      {keywordMatch.percentage > 70
                        ? "Your skills align well with this position. Make sure to highlight your relevant experience."
                        : "Add more of the keywords from this job description to improve your resume's match rate."}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            </CardContent>
          )}

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab("description")}>
              Back to Job Description
            </Button>
            <Button onClick={handleApplyKeywords} disabled={!result}>
              Apply Keywords to Resume
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

