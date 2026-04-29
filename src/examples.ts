import { ResumeData } from "./types";

export const softwareEngineerExample: ResumeData = {
  name: "Alex Sterling",
  title: "Senior Software Engineer",
  email: "alex.sterling@example.com",
  phone: "(555) 987-6543",
  location: "Seattle, WA",
  linkedin: "linkedin.com/in/alexsterling",
  summary: "Innovative and results-driven Senior Software Engineer with over 7 years of experience in designing, developing, and deploying scalable full-stack applications. Proven expertise in cloud architecture, performance optimization, and mentoring engineering teams. Adept at collaborating with cross-functional partners to deliver business-critical products.",
  experience: [
    {
      id: "e1",
      jobTitle: "Lead Frontend Engineer",
      company: "CloudScale Analytics",
      startDate: "Mar 2021",
      endDate: "Present",
      responsibilities: "Spearheaded the migration of a legacy monolithic dashboard to a modern React SPA, reducing initial load times by 45%.\nArchitected a reusable component system used across 3 major product lines, saving over 200 hours of development time quarterly.\nManaged and mentored a team of 4 junior/mid-level engineers, resulting in 2 internal promotions."
    },
    {
      id: "e2",
      jobTitle: "Full Stack Engineer",
      company: "FinTech Solutions",
      startDate: "Jun 2017",
      endDate: "Feb 2021",
      responsibilities: "Developed and maintained RESTful APIs using Node.js and PostgreSQL to process over 10,000 transactions daily.\nImplemented robust CI/CD pipelines with GitHub Actions and Docker, reducing deployment failures by 30%.\nIntegrated third-party payment gateways, significantly enhancing revenue collection processes."
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "B.S. in Computer Science",
      institution: "University of Washington",
      year: "2017"
    }
  ],
  projects: [
    {
      id: "p1",
      name: "MetricFlow",
      description: "An open-source real-time event analytics tracker built with Node.js, Redis, and React. Gained over 500 stars on GitHub.",
      link: "github.com/alexsterling/metricflow"
    }
  ],
  certifications: [
    {
      id: "c1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2022"
    }
  ],
  skills: "JavaScript, TypeScript, React, Node.js, Python, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS, GraphQL",
  coverLetter: {
    recipientName: "Hiring Manager",
    companyName: "TechCorp",
    jobReference: "Senior Software Engineer",
    body: "I am writing to express my interest in the Senior Software Engineer position at TechCorp. With a solid foundation in building scalable full-stack web applications and leading technical teams, I am confident in my ability to immediately add value to your engineering department..."
  }
};

export const marketingManagerExample: ResumeData = {
  name: "Jordan Lee",
  title: "Growth Marketing Manager",
  email: "jordan.lee@example.com",
  phone: "(555) 321-9876",
  location: "New York, NY",
  linkedin: "linkedin.com/in/jordanlee",
  summary: "Data-driven Growth Marketing Manager with 6+ years of experience in scaling B2B SaaS and consumer tech businesses. Expertise in performance marketing, growth experimentation, and multi-channel campaign strategies. Demonstrated success in optimizing CAC and driving significant MRR growth.",
  experience: [
    {
      id: "e1",
      jobTitle: "Senior Growth Marketing Manager",
      company: "SaaSify Inc.",
      startDate: "Jan 2020",
      endDate: "Present",
      responsibilities: "Managed a $2M annual digital marketing budget across Google Ads, LinkedIn, and Meta, surpassing lead generation targets by 25%.\nLaunched a comprehensive A/B testing framework that improved landing page conversions by 18%.\nCollaborated closely with product teams to align marketing campaigns with critical feature releases."
    },
    {
      id: "e2",
      jobTitle: "Digital Marketing Specialist",
      company: "E-Commerce Giants",
      startDate: "Aug 2016",
      endDate: "Dec 2019",
      responsibilities: "Executed multi-channel seasonal campaigns resulting in a consistent 20% year-over-year revenue increase.\nOptimized email marketing sequences using HubSpot, boosting open rates from 18% to 28%.\nConducted extensive market research to target emerging demographics."
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "B.A. in Marketing and Communications",
      institution: "New York University",
      year: "2016"
    }
  ],
  projects: [
    {
      id: "p1",
      name: "Q4 Product Launch Campaign",
      description: "Led the integrated campaign for a new flagship product, generating $1M in pipeline within the first 30 days.",
      link: ""
    }
  ],
  certifications: [
    {
      id: "c1",
      name: "Google Analytics Individual Qualification",
      issuer: "Google",
      year: "2021"
    }
  ],
  skills: "Growth Strategy, Performance Marketing, SEO/SEM, Data Analysis, Google Analytics, LinkedIn Ads, HubSpot, A/B Testing, Conversion Rate Optimization",
  coverLetter: {
    recipientName: "VP of Marketing",
    companyName: "InnovateTech",
    jobReference: "Growth Marketing Manager",
    body: "I was thrilled to see the Growth Marketing Manager opening at InnovateTech. Your recent product pivots have captured significant market attention, and I am eager to apply my 6 years of expertise in scaling B2B SaaS solutions to further accelerate your user acquisition..."
  }
};

export const dataScientistExample: ResumeData = {
  name: "Dr. Sam Rivera",
  title: "Principal Data Scientist",
  email: "sam.rivera@example.com",
  phone: "(555) 765-4321",
  location: "Austin, TX",
  linkedin: "linkedin.com/in/samriveradata",
  summary: "Principal Data Scientist with a Ph.D. in Statistics and 8+ years of experience designing scalable machine learning pipelines for high-growth tech companies. Deep expertise in NLP, predictive modeling, and deep learning. Passionate about translating complex behavioral data into actionable product strategies that significantly increase user retention.",
  experience: [
    {
      id: "e1",
      jobTitle: "Principal Data Scientist",
      company: "InsightAI",
      startDate: "Feb 2022",
      endDate: "Present",
      responsibilities: "Architected a custom BERT-based sentiment analysis engine that processed 5M+ daily user reviews, identifying core product friction points.\nMentored a team of 4 data scientists, overseeing the implementation of internal ML-ops practices using MLflow and Docker.\nDriven a 15% improvement in recommendation engine click-through rates via multi-armed bandit testing."
    },
    {
      id: "e2",
      jobTitle: "Senior Data Scientist",
      company: "FinData Innovators",
      startDate: "Jul 2018",
      endDate: "Jan 2022",
      responsibilities: "Developed an XGBoost fraud detection model that reduced false positives by 30% and saved the company over $1.2M annually.\nCreated automated data extraction pipelines in Python/Airflow to aggregate data from 12 separate financial institutions.\nPresented technical insights to C-suite executives, securing a $500K budget for cloud computing infrastructure."
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "Ph.D. in Statistics",
      institution: "University of Texas at Austin",
      year: "2018"
    },
    {
      id: "edu2",
      degree: "B.S. in Applied Mathematics",
      institution: "Texas A&M University",
      year: "2013"
    }
  ],
  projects: [
    {
      id: "p1",
      name: "AutoML Forecasting Library",
      description: "Developed and open-sourced a Python library for automated time-series forecasting, achieving 2,000+ PyPI downloads in the first month.",
      link: "github.com/samrivera/automl-forecast"
    }
  ],
  certifications: [
    {
      id: "c1",
      name: "Google Professional Data Engineer",
      issuer: "Google Cloud",
      year: "2023"
    }
  ],
  skills: "Python, R, SQL, TensorFlow, PyTorch, Scikit-Learn, NLP, XGBoost, Airflow, Databricks, PostgreSQL, AWS SageMaker",
  coverLetter: {
    recipientName: "Head of Data",
    companyName: "NextGen Tech",
    jobReference: "Principal Data Scientist",
    body: "I am writing to express my strong interest in the Principal Data Scientist role at NextGen Tech. With a Ph.D. in Statistics and over 8 years of hands-on experience building planet-scale machine learning models, I am eager to help your team unlock the hidden value in your behavioral data..."
  }
};

export const productDesignerExample: ResumeData = {
  name: "Riley Chen",
  title: "Senior Product Designer",
  email: "riley.chen@example.com",
  phone: "(555) 444-5555",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/rileychendesign",
  summary: "Award-winning Senior Product Designer with 7+ years of experience crafting intuitive, human-centered digital experiences for SaaS and consumer mobile apps. Adept at leading end-to-end design processes from generative research to high-fidelity prototyping. Strong advocate for design systems and accessible UI components.",
  experience: [
    {
      id: "e1",
      jobTitle: "Lead Product Designer",
      company: "Designify",
      startDate: "Apr 2021",
      endDate: "Present",
      responsibilities: "Led the complete redesign of the core web platform, resulting in a 40% reduction in user onboarding drop-off and a 15% increase in daily active users.\nEstablished and maintained a comprehensive design system in Figma, reducing front-end development time by 25%.\nMantained rigorous user testing protocols, conducting bi-weekly usability sessions with 20+ beta testers."
    },
    {
      id: "e2",
      jobTitle: "UX/UI Designer",
      company: "Creative Studio Solutions",
      startDate: "Sep 2017",
      endDate: "Mar 2021",
      responsibilities: "Designed mobile applications for 5 major healthcare clients, adhering strictly to WCAG 2.1 AA accessibility standards.\nCollaborated directly with engineering teams to ensure pixel-perfect implementation of complex animations.\nFacilitated design sprint workshops with key stakeholders to align project goals and reduce iteration cycles."
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "B.F.A. in Interaction Design",
      institution: "California College of the Arts",
      year: "2017"
    }
  ],
  projects: [
    {
      id: "p1",
      name: "HealthTrack Patient App",
      description: "A mobile application designed to help patients monitor chronic conditions. Won the 2019 Digital Health UX Award.",
      link: "dribbble.com/rileychendesign/healthtrack"
    }
  ],
  certifications: [
    {
      id: "c1",
      name: "NN/g UX Certification",
      issuer: "Nielsen Norman Group",
      year: "2020"
    }
  ],
  skills: "Figma, Sketch, Adobe Creative Suite, Prototyping, Wireframing, User Research, Usability Testing, Interaction Design, Design Systems, HTML/CSS",
  coverLetter: {
    recipientName: "Design Director",
    companyName: "CreativeTech",
    jobReference: "Senior Product Designer",
    body: "I am excited to apply for the Senior Product Designer role at CreativeTech. Your commitment to user-centric, accessible design deeply resonates with my own philosophy. With my background in leading complete product redesigns and scaling design systems, I can help CreativeTech elevate its digital footprint..."
  }
};

export const exampleProfiles = [
  { id: "swe", name: "Software Engineer", data: softwareEngineerExample },
  { id: "marketing", name: "Marketing Manager", data: marketingManagerExample },
  { id: "data", name: "Data Scientist", data: dataScientistExample },
  { id: "design", name: "Product Designer", data: productDesignerExample }
];
