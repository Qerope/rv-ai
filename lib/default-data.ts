import type { ResumeData } from "./types"

export const defaultResumeData: ResumeData = {
  basics: {
    name: "Nicholas Tavakoli",
    label: "uOttawa CS, Hitachi Specialist",
    email: "TavakoliNicholas@gmail.com",
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
        url: "https://github.com/Qerope",
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
      position: "Deployment Specialist Intern",
      url: "https://www.hitachi.com",
      startDate: "2024-05-01",
      endDate: "Present",
      highlights: [
        "Developed automated tools for systems deployment, reducing time by 3x by analyzing sensor data streams and smart systems",
        "Designed a maintenance system for CANBUS/ETH interfacing, decreasing downtime drastically",
        "Comissioned/Tested/Troubleshot/Produced detailed documentation 800+ embedded railway control systems",
      ],
    },
    {
      name: "Broken Teapot Studios Inc.",
      position: "Software Developer Intern",
      url: "https://www.brokenteapotstudios.com",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      highlights: [
        "Refined and optimized low-level game shader rendering system based on Vulkan/OpenGL achieving a 115% performance",
        "Co-designed in-game mechanincs and real-time path/ray tracing and particle simulation improvements for 5x resource efficiency",
      ],
    },
    {
      name: "Self-employed",
      position: "Software Engineer",
      url: "https://qerope.co",
      startDate: "2017-05-01",
      endDate: "2024-01-01",
      highlights: [
        "Developed 800+ projects ranging from healthcare to defense for notable clients such as Unity, Microsoft, TCI, EA",
        "Lead multiple extensive projects overseeing teams of 10+ developers and designers creating $5B+ of revenue for clients",
        "Developed and maintained high-availability systems achieving 99% satisfaction and reliability for 50+ clients serving 5M+ users",
      ],
    },
  ],
  education: [
    {
      institution: "University of Ottawa",
      url: "https://uottawa.ca",
      area: "Computer Science, Minor in Physics",
      studyType: "Bachelor of Science",
      startDate: "2024-04-30",
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
        "Involvement & participation in multiple competitions, confrences, and other student initiatives; Merit scholarships over $200,000; Dean's honour list.",
    },
    {
      institution: "University of Ottawa",
      url: "https://uottawa.ca",
      area: "Electrical Engineering & Physics",
      studyType: "Bachelor of Engineering",
      startDate: "2022-09-01",
      endDate: "2024-04-30",
      score: "N/A",
      courses: [
        "Digital Systems & Design",
        "Signal Analysis",
        "VHDL & IC Design",
        "RF Communication & Design",
      ],
      summary:
        "Actively engaged in cutting-edge research across various fields, including physics, engineering, and health sciences.",
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
        "Cryptography",
        "IDS/IPS",
        "CEH",
        "SIEM",
        "DDoS",
        "SOC 2",
        "ISO 27001",
      ],
    },
    {
      name: "Systems Engineering",
      keywords: [
        "Embedded",
        "RTOS",
        "CAN",
        "Ethernet",
        "Signal Processing",
      ]
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
      name: "Network Security, Python, NoSQL, 5G/3GPP",
      issuer: "Huawei Talent",
    },
    {
      name: "Statistics",
      issuer: "Stanford University",
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
      "title": "Scholarship for Innovation in Student Publications",
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
      name: "Elysium RISC-V Operating System",
      description: "Project Elysium main repo, an open-source operating system designed for RISC-V based devices.",
      url: "https://github.com/qerope/Elysium"
    },
    {
      name: "ML Mystery Card Game Analyzer",
      description: "Card Game ML Data Engineering to find the rules of a card game.",
      url: "https://github.com/qerope/de-csgames"
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

