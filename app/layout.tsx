import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ATS-Friendly Resume Generator",
  description: "Create beautiful, professional resumes that pass through ATS systems",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container mx-auto py-4 px-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              ATS Resume Builder
            </Link>
            <nav className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">
                Resume Builder
              </Link>
              <Link href="job-analysis" className="hover:text-primary transition-colors">
                Job Analysis
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t mt-12">
          <div className="container mx-auto py-6 px-4 text-center text-sm text-muted-foreground">
            <p>ATS-Friendly Resume Generator - Create professional resumes optimized for applicant tracking systems</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

