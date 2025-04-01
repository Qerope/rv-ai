"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { analyzeJobDescription, type JobAnalysisResult } from "@/lib/job-analysis"
import { Loader2, CheckCircle, AlertCircle, ArrowRight, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { defaultResumeData } from "@/lib/default-data"

export default function JobAnalysisPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<JobAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const promptCVText = "Tailor this CV to apply for the following job position outline. USE THE SAME EXACT JSON FORMAT AND TRY TO KEEP THE SIZE RELEATIVELY THE SAME. Change, and improve wherever needed based on the first reference point and job description. Do not add anything not referred before. Try to only keep the relevant. Make sure skills and everything matches with whatever the job description is demanding. You are only allowed to change/add/modify skills section. Other sections may only be modified using the reference (except in description which you may add relevant points to the job posting)"
  const promptCLText = "Write a cover letter to apply for the following job position outline. The content should be based on the first reference point and job description so that it adds extra context strictly not already in the cv but something the recruiter's eye might catch. Focus on highlighting relevant skills and experience that align with the job description. The tone should be professional and focused on demonstrating how the qualifications match the job requirements. It needs to be HUMAN, creative, unique, professional, and non-cliche."

  const handleCopy = (promptText: String) => {
    const textToCopy = `${JSON.stringify(defaultResumeData)} ${promptText} ${JSON.stringify(result)}`;
    navigator.clipboard.writeText(textToCopy)
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

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
      }
    } catch (err) {
      setError("An error occurred while analyzing the job description")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Job Description Analyzer</h1>
      <p className="text-center text-muted-foreground mb-6">
        Analyze job descriptions to extract key requirements and optimize your resume
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Job Description</h2>
            <Button onClick={handleAnalyze} disabled={isAnalyzing || !jobDescription.trim()} className="gap-2">
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          <Textarea
            className="h-[500px] mb-4"
            placeholder="Paste the job description here..."
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

          <div className="text-sm text-muted-foreground mb-6">
            Paste the complete job description to get the best analysis results.
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Analysis Results</h2>
            {result && (

              <div className="flex gap-2">
                <Link href={`/?job=${result.shortname}&keys=${result.keywords}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Create Resume
                  </Button>
                </Link>
                <Button
                  onClick={() => handleCopy(promptCVText)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                    <FileText className="h-4 w-4" />
                  {"Resume Prompt"}
                </Button>
                <Button
                  onClick={() => handleCopy(promptCLText)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                    <FileText className="h-4 w-4" />
                  {"Letter Prompt"}
                </Button>
              </div>
            )}
        </div>

        <Card className="mb-4">
          <CardContent className="p-0">
            <Tabs defaultValue="summary">
              <TabsList className="w-full">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="raw">raw</TabsTrigger>
              </TabsList>
              <div className="p-4">
                <TabsContent value="summary" className="m-0">
                  {result ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Company</h3>
                        <p className="text-lg font-medium">{result.company}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Position</h3>
                        <p className="text-lg font-medium">{result.title}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Resume Filename</h3>
                        <p className="font-mono text-sm bg-muted p-2 rounded">{result.shortname}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>Enter a job description and click "Analyze" to see results</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="requirements" className="m-0">
                  {result ? (
                    <div className="prose prose-sm max-w-none">
                      <h3 className="text-lg font-medium mb-2">Key Requirements</h3>
                      <div className="whitespace-pre-wrap">{result.requirements}</div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>Enter a job description and click "Analyze" to see results</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="keywords" className="m-0">
                  {result ? (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Keywords to Include</h3>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {result.keywords.split(",").map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                            {keyword.trim()}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 p-4 border rounded-md bg-muted/30">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Resume Optimization Tip
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Include these keywords in your resume to improve your chances of passing through Applicant
                          Tracking Systems (ATS). Focus on incorporating them naturally in your experience and skills
                          sections.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>Enter a job description and click "Analyze" to see results</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="raw" className="m-0">
                  {result ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Resume Filename</h3>
                        <p className="font-mono text-sm bg-muted p-2 rounded">{JSON.stringify(result)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>Enter a job description and click "Analyze" to see results</p>
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <Alert className="bg-primary/5 border-primary/20">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertTitle>ATS Optimization</AlertTitle>
          <AlertDescription>
            Use the analysis results to tailor your resume for this specific job. Include relevant keywords and
            address the key requirements to improve your chances of getting past automated screening systems.
          </AlertDescription>
        </Alert>
      </div>
    </div>
    </main >
  )
}

