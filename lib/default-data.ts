import type { ResumeData } from "./types"

export const defaultResumeData: ResumeData = {
  basics: {
    name: "Nicholas Tavakoli",
    label: "uOttawa CS, Hitachi Deployment Specialist",
    email: "NicholasTavakoli@gmail.com",
    phone: "(613) 294-6363",
    url: "https://Qerope.co",
    location: {
      city: "Ottawa",
      region: "Ontario",
      countryCode: "CA",
    },
    profiles: [
      {
        network: "GitHub",
        username: "Qerope",
        url: "https://Github.com/Qerope",
      },
      {
        network: "Linkedin",
        username: "/NicholasTavakoli",
        url: "https://linkedin.com/in/NicholasTavakoli",
      },
    ],
  },
  work: [
    {
      name: "Hitachi Rail",
      position: "Site Deployment Intern",
      url: "https://www.hitachi.com",
      startDate: "2024-05-01",
      endDate: "Present",
      highlights: [
        "Developed automated scripts to streamline site deployment, reducing time by 300%",
        "Designed and implemented a predictive maintenance system, decreasing downtime by 20%",
        "Produced detailed documentation and training materials to improve deployment efficiency",
      ],
    },
    {
      name: "Broken Teapot Studios Inc.",
      position: "Software Developer Intern",
      url: "https://www.brokenteapotstudios.com",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      highlights: [
        "Developed dynamic AI systems that enhanced player interaction and gameplay immersion",
        "Refined game shader code, improving performance by 115%",
        "Contributed to the design of a puzzle-solving mechanic that boosted user retention by 25%",
      ],
    },
    {
      name: "RTXComputers Electronics Provider",
      position: "Software Developer",
      url: "https://www.rtxcomputers.com",
      startDate: "2022-05-01",
      endDate: "2022-08-31",
      highlights: [
        "Developed customer support chatbot and recommendation system that improved user experience",
        "Collaborated with marketing team to optimize website and increase conversions",
        "Worked with technologies such as React, Node.js, and MongoDB to enhance web functionality",
      ],
    },
  ],
  education: [
    {
      institution: "University of Ottawa",
      url: "https://uottawa.ca",
      area: "Computer Science, Minor in Physics",
      studyType: "Bachelor of Science",
      startDate: "2022-09-01",
      endDate: "2025-12-30",
      score: "N/A",
      courses: [
        "Data Structures & Algorithms",
        "Data Engineering",
        "Modelling & Simulation",
        "Machine Learning",
        "Databases",
        "Networking",
      ],
      summary:
        "Actively engaged in cutting-edge research across various fields, including physics, engineering, and health sciences. Multiple competitions and merit scholarships over $40,000/annum. Dean's honour list.",
    },
  ],
  skills: [
    {
      name: "Programming",
      keywords: [
        "Python",
        "Java",
        "C/C++",
        "C#",
        "Swift",
        "PHP",
        "Typescript",
        "JavaScript",
        "HTML/CSS",
        "SQL",
        "R",
        "Ruby",
        "Lua",
      ],
    },
    {
      name: "Frameworks",
      keywords: [
        "React",
        "Node.js",
        "TensorFlow",
        "Pandas",
        "NumPy",
        "SimPy",
        "Angular",
        "Ruby on Rails",
        "Next.js",
        "Bootstrap",
        "Apache Spark",
      ],
    },
    {
      name: "Tools",
      keywords: [
        "Git",
        "Docker",
        "AWS",
        "GCP",
        "Azure",
        "MATLAB",
        "Shell Scripting",
        "Postman",
        "Jenkins",
        "CI/CD",
        "JIRA",
        "Vagrant",
      ],
    },
    {
      name: "Technologies",
      keywords: [
        "Edge Computing",
        "ML/DL/AI",
        "Big Data",
        "Modeling",
        "Smart Contracts",
        "DApps/DeFi",
        "Web3/IPFS",
        "Tokenomics",
      ],
    },
    {
      name: "Cybersecurity",
      keywords: [
        "Network Security",
        "Cryptography",
        "IDS/IPS",
        "CEH 13",
        "SIEM",
        "DDoS Protection",
        "SOC",
        "SOC 2",
        "ISO 27001",
      ],
    },
    {
      name: "Languages",
      keywords: ["English", "French", "Persian"],
    },
  ],
  languages: [
    {
      language: "English",
    },
    {
      language: "French",
    },
    {
      language: "Persian",
    }
  ],
  certificates: [
    {
      name: "Introduction to Statistics",
      issuer: "Stanford University",
    },
    {
      name: "Network Security, Python Programming, 5G/3GPP",
      issuer: "Huawei Talent",
    },
    {
      name: "Java Programming, Problem Solving",
      issuer: "HackerRank",
    },
    {
      name: "Art Directing Games with Vision and Purpose",
      issuer: "Iran Computer and Video Games Foundation",
    },
  ],
  publications: [
    {
      name: "Impact Of Telemedicine Intervention On Patient Satisfaction For Hypertensive Patients",
      publisher: "URNCST Journal",
      releaseDate: "2023-02-01",
      url: "https://doi.org/10.26685/urncst.505",
    },
    {
      name: "Investigating Human Cognitive Learning Process In An Artistic Context",
      publisher: "PanQ Game Studios",
      releaseDate: "2017-05-01",
    },
  ],
  awards: [
    {
      "title": "Scholarshiof for Innovation in Student Publications",
      "date": "2024-02-01",
      "awarder": "UOSU"
    },
    {
      "title": "5G Connectivity for Cross Border Challenge",
      "date": "2023-07-01",
      "awarder": "Telus"
    },
    {
      "title": "Solutions Lab & Idea’s Lab Award",
      "date": "2023-02-01",
      "awarder": "University of Ottawa - eHub - MDA"
    },
    {
      "title": "Youngest Startup of Iran",
      "date": "2017-06-01",
      "awarder": "Tabnak"
    }
  ],
  projects: [
    {
      name: "ML Mystery Card Game Analyzer",
      description: "Card Game ML Data Engineering to find the rules of a mistery card game.",
      url: "https://github.com/qerope/de-csgames"
    },
    {
      name: "Elysium",
      description: "Project Elysium main repo, an open-source operating system designed for RISC-V based devices.",
      url: "https://github.com/qerope/Elysium"
    },
    {
      name: "uOttaHack 6 & 7",
      description: "Main website, live website, and organizer apps for 2024 and 2025 uOttaHack hackathon.",
      url: "https://github.com/qerope/2025-uOttaHack-Home"
    },
    {
      name: "Cloud Resource Allocation Simulator",
      description: "A Python project related to the CSI4124 course to simulate SJF and FIFO for cloud server resource allocation.",
      url: "https://github.com/qerope/CSI4124-Project"
    }
  ]  
}

