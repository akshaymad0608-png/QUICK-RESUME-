import { ResumeData } from "./types";

export const softwareEngineerExample: ResumeData = {
  name: "Alex Morgan",
  title: "Computer Engineer",
  email: "alex.morgan@example.com",
  phone: "(555) 987-6543",
  location: "Austin, TX",
  linkedin: "linkedin.com/in/alexmorgan-ce",
  summary:
    "Innovative Computer Engineer with 6+ years of experience designing and optimizing embedded systems, hardware-software interfaces, and IoT devices. Proficient in C/C++, Verilog, and ARM Microcontrollers, with a strong background in PCB design and real-time operating systems (RTOS).",
  experience: [
    {
      id: "e1",
      jobTitle: "Senior Embedded Systems Engineer",
      company: "TechHardware Solutions",
      startDate: "Mar 2021",
      endDate: "Present",
      responsibilities:
        "Led the hardware-software co-design of a next-generation IoT sensor platform, reducing power consumption by 35%.\nDeveloped highly optimized firmware in C/C++ for ARM Cortex-M processors.\nCollaborated with electrical engineers for PCB layout design, schematic capture, and signal integrity testing.",
    },
    {
      id: "e2",
      jobTitle: "Computer Hardware Engineer",
      company: "InnovateTech Embedded",
      startDate: "Jul 2018",
      endDate: "Feb 2021",
      responsibilities:
        "Designed and implemented FPGA-based hardware accelerators using Verilog, improving data processing speed by 50%.\nDebugged complex hardware-software integration issues using oscilloscopes, logic analyzers, and JTAG.\nAuthored detailed technical documentation and testing protocols for hardware validation.",
    },
  ],
  education: [
    {
      id: "edu1",
      degree: "B.S. Computer Engineering",
      institution: "University of Texas at Austin",
      year: "2018",
    },
  ],
  projects: [
    {
      id: "p1",
      name: "Autonomous Smart Robotics Platform",
      description:
        "Developed a custom motor control system using STM32 microcontrollers and FreeRTOS, featuring obstacle avoidance using LiDAR sensors.",
      link: "github.com/alexmorgan/smart-robot",
    },
  ],
  certifications: [
    {
      id: "c1",
      name: "Certified Embedded Systems Engineer",
      issuer: "IEEE",
      year: "2021",
    },
  ],
  skills:
    "C/C++, Python, Verilog/SystemVerilog, ARM Microcontrollers, RTOS (FreeRTOS), Altium Designer, PCB Design, FPGA (Xilinx, Altera), I2C, SPI, UART, Hardware Debugging",
  coverLetter: {
    recipientName: "Engineering Hiring Manager",
    companyName: "NextGen Electronics",
    jobReference: "Senior Computer Engineer Position",
    body: "I am writing to express my interest in the Senior Computer Engineer position at NextGen Electronics. With over 6 years of experience in hardware-software co-design, embedded systems development, and IoT solutions, I have a proven track record of bringing complex electronic devices from concept to production.\n\nIn my previous role at TechHardware Solutions, I spearheaded the development of an ultra-low-power IoT sensor platform, successfully reducing power consumption by 35% through meticulous firmware optimization on ARM Cortex processors. I am deeply passionate about pushing the boundaries of embedded architecture, seamlessly integrating custom PCBs with robust real-time operating systems.\n\nI have long admired NextGen Electronics for its commitment to cutting-edge hardware innovation and rigorous engineering standards. I am confident that my expertise in C/C++, Verilog, and hardware debugging perfectly aligns with the technical demands of your team.\n\nThank you for considering my application. I look forward to the opportunity to discuss how my background in computer engineering will drive impactful results for your upcoming projects.",
  },
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
  { id: "comp_eng", name: "Computer Engineer", data: softwareEngineerExample },
  { id: "marketing", name: "Marketing Manager", data: marketingManagerExample },
  { id: "data", name: "Data Scientist", data: dataScientistExample },
  { id: "design", name: "Product Designer", data: productDesignerExample }
];
