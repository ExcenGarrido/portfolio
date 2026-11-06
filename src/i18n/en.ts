import type { Dictionary } from './es';

export const en: Partial<Dictionary> = {
  metaTitle: 'Pablo Dev Garrido — Backend Developer & AI Engineer',
  metaDescription: 'Portfolio of Pablo Dev Garrido, specializing in backend development, automation, and AI engineering.',
  locale: 'en_US',
  languageLabel: 'Language',
  spanishVersion: 'Versión en español',
  englishVersion: 'English version',
  portfolio: 'PORTFOLIO · BS AS',
  navImpact: 'Impact',
  navProjects: 'Projects',
  navApproach: 'Approach',
  navAbout: 'About me',
  navContact: 'Contact',
  talk: "Let's talk",
  available: 'Available for remote roles · Buenos Aires, AR',
  avatarAlt: 'Profile photo of Pablo Dev Garrido',
  heroSubtitle: 'Backend Developer · Focused on AI and Automation',
  heroDescription: 'I build backend systems and intelligent data pipelines using Python, FastAPI, and LLMs to transform unstructured documents into valuable business information.',
  viewProjects: 'View selected projects',
  startConversation: 'Start a conversation',
  cvSpanish: 'CV in Spanish (PDF)',
  cvEnglish: 'CV in English (PDF)',
  // TODO: agregar hosting cuando esté desplegado
  footerLocation: 'Buenos Aires, AR · Built with Astro.',
  footerEmail: 'Email',
  utc: 'UTC-3',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  gitlab: 'GitLab',
  email: 'pabloagustingarrido@gmail.com',
  impactEyebrow: '01 / VERIFIABLE RESULTS',
  impactTitle: 'Measurable impact',
  impactIntro: 'Every data point comes from a system I built.',
  projectsEyebrow: '02 / PORTFOLIO',
  projectsTitle: 'Selected projects',
  projectsIntro: 'AI pipelines and web systems, from idea to working demo.',
  focusEyebrow: '03 / APPROACH · DATA BEFORE AGENTS',
  focusTitle: 'Data first, agents second',
  focusIntro: 'Putting messy files into an AI chat and asking for a summary does not scale. Before connecting agents, the information must be cleaned and structured.',
  aboutEyebrow: '04 / ABOUT ME',
  aboutTitle: 'How I work',
  aboutIntro: 'Principles I apply to every pipeline.',
  skills: 'Skills',
  education: 'Education',
  certifications: 'Certifications',
  languages: 'Languages',
  contactEyebrow: '05 / CONTACT',
  contactTitle: 'Do you have a project or opportunity in mind?',
  contactDescription: 'Tell me what you need. I can help you automate a process, organize messy data, or build an API that reaches production.',
  writeByEmail: 'Email me',
  directChannel: 'DIRECT CHANNEL',
  copyEmail: 'Copy email',
  copyEmailInitial: 'Copy email',
  copied: 'Copied!',
  impactCost: 'COST',
  impactCostValue: '< 0.10 USD',
  perDocument: 'per document',
  impactCostDescription: 'A pipeline of 3 chained AI agents that processes a complete document end to end.',
  agents: 'AGENTS',
  threeChained: '3 CHAINED',
  impactInput: 'INPUT',
  threeFormats: '3 formats',
  formats: 'PPTX · PDF · XLSX',
  impactInputDescription: 'A FastAPI REST API that ingests messy documents and turns them into structured data in PostgreSQL (JSONB).',
  storage: 'STORAGE',
  jsonb: 'JSONB',
  impactDeployment: 'DEPLOYMENT',
  production: 'In production',
  impactDeploymentDescription: 'An AI invoice processing API with public Swagger, deployed on Azure with CI/CD.',
  pipeline: 'PIPELINE',
  githubActions: 'GITHUB ACTIONS'
  ,menu: 'Menu'
  ,backToProjects: '← Back to projects'
  ,inThisCase: 'IN THIS CASE'
  ,nextCase: 'NEXT CASE'
  ,projectType: 'TYPE'
  ,projectRole: 'ROLE'
  ,projectPeriod: 'PERIOD'
  ,projectStatus: 'STATUS'
  ,mediaPending: 'Media pending'
  ,testDataNote: 'Screenshots use test data.'
  ,privateRepository: 'The code is in a private repository.'
  ,impactBefore: 'BEFORE · THE CHAOS'
  ,impactAfter: 'AFTER · THE FOUNDATION'
  ,focusApplied: 'The approach I use'
  ,focusClosing: 'Garbage in, garbage out. Processing a complete document with 3 chained agents costs'
  ,viewProject: 'View the project'
  ,clearContracts: 'Clear contracts'
  ,clearContractsDescription: 'A REST API with FastAPI and Pydantic to validate what comes in and what goes out.'
  ,traceability: 'Persist with traceability'
  ,traceabilityDescription: 'Transactional storage in PostgreSQL and JSONB so every result can be audited.'
  ,endToEnd: 'Automate end to end'
  ,endToEndDescription: 'n8n orchestrates the flow from the file to the insights dashboard.'
  ,productionCicd: 'To production with CI/CD'
  ,productionCicdDescription: 'Deployment on Azure with GitHub Actions, not just code running locally.'
  ,impactBeforeTitle: 'Loose PPTX, PDF, and Excel files'
  ,impactBeforeDescription: 'Business information scattered across different formats, without structure or a way to query it.'
  ,impactAfterTitle: 'Structured data'
  ,impactAfterDescription: 'Clean text stored in PostgreSQL (JSONB), ready to audit, search, and feed AI agents.'
  ,focusAppliedExtract: 'Extract'
  ,focusAppliedExtractDescription: 'A FastAPI REST API that ingests PPTX, PDF, and XLSX files.'
  ,focusAppliedClean: 'Clean and analyze'
  ,focusAppliedCleanDescription: 'deep text cleaning and chained AI agents (Market Analyst → Brand Analyst) with Groq.'
  ,focusAppliedPersist: 'Persist'
  ,focusAppliedPersistDescription: 'structured storage in PostgreSQL with JSONB, ideal for auditing and fast searches.'
  ,focusAppliedAutomate: 'Automate'
  ,focusAppliedAutomateDescription: 'n8n consumes the database and generates insight dashboards for consultants.'
  ,focusCostSuffix: 'less than 0.10 USD'
  ,caseStudy: 'View case study'
  ,problem: 'Problem'
  ,solution: 'Solution'
  ,result: 'Result'
  ,personalProduction: 'PERSONAL PROJECT · IN PRODUCTION'
  ,personalAzureDemo: 'PERSONAL PROJECT · AZURE DEMO'
  ,academicTeam: 'ACADEMIC PROJECT · UTN HAEDO · TEAM'
  ,invoiceAutomation: 'AI invoice automation'
  ,invoiceProblem: 'PDF and text invoices are unstructured documents that are difficult to query and integrate with other systems.'
  ,invoiceSolution: 'A Python pipeline that extracts key data with LLMs (Groq), stores it transactionally in PostgreSQL, and exposes it through a REST API, with the flow orchestrated in n8n.'
  ,invoiceResult: 'API deployed on Azure with CI/CD and public Swagger. Open-source code.'
  ,documentProcessing: 'Intelligent document processing'
  ,documentProblem: 'Much of the business intelligence is trapped in messy PPTX, PDF, and Excel files that cannot be queried.'
  ,documentSolution: 'A FastAPI REST API that ingests files, cleans them, and passes them through a chain of AI agents (Market Analyst → Brand Analyst). The result is stored in PostgreSQL (JSONB), and n8n generates insight dashboards.'
  ,documentResult: 'Processing a complete document with 3 chained agents costs less than 0.10 USD.'
  ,testData: 'TEST DATA'
  ,ficheroAcademic: 'ACADEMIC PROJECT · UTN HAEDO · TEAM'
  ,ficheroTitle: 'Fichero Online'
  ,ficheroProblem: 'Managing employees, branches, shifts, and attendance needs to be centralized in a web system.'
  ,ficheroSolution: 'A web system with an authenticated panel, manual and QR-code clock-in, location validation, an attendance dashboard, and PDF-exportable reports.'
  ,screenshotPending: 'Screenshot pending'
  ,skillsBackend: 'BACKEND'
  ,skillsData: 'DATA'
  ,skillsInfrastructure: 'INFRASTRUCTURE'
  ,skillsAi: 'AI & AUTOMATION'
  ,skillsLanguages: 'LANGUAGES'
  ,skillsMethodology: 'METHODOLOGY'
  ,fastapi: 'FastAPI'
  ,pydantic: 'Pydantic'
  ,sqlAlchemy: 'SQLAlchemy'
  ,rest: 'REST'
  ,dotNet: '.NET'
  ,postgresql: 'PostgreSQL'
  ,jsonbChip: 'JSONB'
  ,sqlServer: 'SQL Server'
  ,mysqlMaria: 'MySQL/MariaDB'
  ,docker: 'Docker'
  ,azureAppService: 'Azure App Service'
  ,gitHubActions: 'GitHub Actions'
  ,cicd: 'CI/CD'
  ,git: 'Git'
  ,groqApi: 'Groq API'
  ,llms: 'LLMs'
  ,chainedAgents: 'Chained agents'
  ,n8n: 'n8n'
  ,python: 'Python'
  ,cSharp: 'C#'
  ,sql: 'SQL'
  ,php: 'PHP'
  ,javascript: 'JavaScript'
  ,html: 'HTML'
  ,css: 'CSS'
  ,scrum: 'Scrum'
  ,jira: 'Jira'
  ,userStories: 'User stories'
  ,acceptanceCriteria: 'Acceptance criteria'
  ,miro: 'Miro'
  ,degree: 'University Technical Degree in Programming'
  ,degreeAverage: 'Average grade 8.46 / 10 · Graduate · Diploma in process'
  ,university: 'UTN Haedo Regional Faculty'
  ,academicRecord: 'View academic transcript'
  ,certificationCcna: 'CCNA: Introduction to Networks (ITN) 1'
  ,certificationSrwe: 'CCNA Switching, Routing, and Wireless Essentials (SRWE)'
  ,spanish: 'Spanish'
  ,nativeLevel: 'Native'
  ,englishLanguage: 'English'
  ,b2: 'B2'
  ,projectLink: 'View the project'
  ,invoiceImageAlt: 'Swagger for the invoice API deployed on Azure, showing the JSON response with data extracted by the LLM'
  ,documentImageAlt: 'PostgreSQL database in Neon with document analysis stored in JSONB format'
  ,ficheroImageAlt: 'Fichero Online attendance dashboard with indicators, charts, and daily details'
  ,backendWeb: 'Backend and web'
};
