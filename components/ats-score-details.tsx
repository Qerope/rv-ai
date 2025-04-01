"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { AtsScoreResult } from "@/lib/ats-scoring"

export function AtsScoreDetails({ scoreResult }: { scoreResult: AtsScoreResult }) {
  const [open, setOpen] = useState(false)

  // Helper function to get color based on score percentage
  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-amber-600"
    return "text-red-600"
  }

  // Helper function to get progress color
  const getProgressColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return "bg-green-600"
    if (percentage >= 60) return "bg-amber-600"
    return "bg-red-600"
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Info className="h-4 w-4" />
          ATS Score Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <span>ATS Compatibility Score: {scoreResult.overallScore}%</span>
            {scoreResult.overallScore >= 80 ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-500" />
            )}
          </DialogTitle>
          <DialogDescription>
            Detailed breakdown of how your resume performs with Applicant Tracking Systems.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Overall score visualization */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Overall ATS Compatibility</span>
              <span className="text-sm font-medium">{scoreResult.overallScore}%</span>
            </div>
            <Progress value={scoreResult.overallScore} className="h-2" />
          </div>

          {/* Section scores */}
          <div className="space-y-4">
            <h3 className="font-medium">Section Scores</h3>
            {scoreResult.sectionScores.map((section, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{section.name}</span>
                  <span className={`text-sm font-medium ${getScoreColor(section.score, section.maxScore)}`}>
                    {section.score}/{section.maxScore}
                  </span>
                </div>
                <Progress
                  value={(section.score / section.maxScore) * 100}
                  className={`h-2 ${getProgressColor(section.score, section.maxScore)}`}
                />
                {section.feedback && <p className="text-xs text-muted-foreground">{section.feedback}</p>}
              </div>
            ))}
          </div>

          {/* Keyword matches */}
          {scoreResult.keywordMatches && Object.keys(scoreResult.keywordMatches).length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Keyword Matches</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(scoreResult.keywordMatches).map(([keyword, count], index) => (
                  <div key={index} className="px-2 py-1 bg-green-50 border border-green-200 rounded-md text-sm">
                    <span className="font-medium">{keyword}</span>
                    <span className="ml-1 text-xs text-green-700">({count})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Improvement suggestions */}
          {scoreResult.suggestions.length > 0 && (
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                <h3 className="font-medium text-blue-800 mb-2">Suggestions for Improvement</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
                  {scoreResult.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

