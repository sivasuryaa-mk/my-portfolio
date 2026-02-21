// Portfolio Content Data
// Sources: LinkedIn Profile + Resume (Dec 2024)
// This file contains all personal content for the portfolio

export const personalInfo = {
  name: "Sivasuryaa M K",
  title: "macOS Developer @ Gen Digital",
  tagline: "Building Digital Experiences",
  subtitle: "CSE Graduate '25 @ CEG, Anna University",
  location: "Chennai, Tamil Nadu, India",
  phone: "+91-9790647514",
  email: "sivasuryaa2004@gmail.com", 
  linkedin: "https://www.linkedin.com/in/sivasuryaa-m-k/",
  github: "https://github.com/sivasuryaa-mk/",
  bio: "Software Engineer at Gen Digital specializing in macOS development. CSE graduate from College of Engineering, Guindy with expertise in Swift, Python, and AI/ML. Passionate about building innovative applications and exploring cutting-edge technologies like LangChain and Prompt Engineering.",
};

export const education = [
  {
    institution: "College of Engineering, Guindy - Anna University",
    degree: "BE in Computer Science",
    score: "GPA: 8.98",
    duration: "November 2021 – 2025",
    location: "Chennai, India",
  },
  {
    institution: "Narayana Junior College",
    degree: "Higher Secondary Education",
    score: "Percentage: 98.4%",
    duration: "May 2019 – March 2021",
    location: "Hyderabad, India",
  },
  {
    institution: "Narayana Olympiad School",
    degree: "Secondary Education",
    score: "Percentage: 90.8%",
    duration: "August 2012 – May 2016",
    location: "Bangalore, India",
  },
];

export const experience = [
  {
    role: "Associate Software Engineer",
    company: "Gen Digital",
    companyDescription: "Formerly NortonLifeLock/Symantec",
    duration: "Jul 2025 – Present",
    durationText: "8 mos",
    type: "Full-time",
    location: "Chennai, Tamil Nadu, India",
    workType: "Hybrid",
    description: [
      "Working as a macOS Developer building desktop applications",
      "Contributing to Gen Digital's security and privacy software products",
    ],
    technologies: ["Swift", "macOS", "Python"],
  },
  {
    role: "Software Engineering Intern",
    company: "Gen Digital",
    companyDescription: "Formerly NortonLifeLock/Symantec",
    duration: "Jan 2025 – Jul 2025",
    durationText: "7 mos",
    type: "Internship",
    location: "Chennai, Tamil Nadu, India",
    workType: "On-site",
    description: [
      "Developed macOS applications using Swift programming language",
      "Worked on AI-powered features using LangChain and Prompt Engineering",
      "Applied Python for backend services and automation",
    ],
    technologies: ["Swift", "Python", "LangChain", "Prompt Engineering", "Artificial Intelligence"],
  },
  {
    role: "Research Intern",
    company: "College of Engineering, Guindy",
    companyDescription: "Anna University",
    duration: "Jun 2024 – Aug 2024",
    durationText: "3 mos",
    type: "Internship",
    location: "Chennai, Tamil Nadu, India",
    workType: "On-site",
    description: [
      "Engaged in research under the guidance of Dr. Mary Anitha Rajam, exploring the MIMIC IV-CXR dataset",
      "Performed comprehensive analysis on the impact of various features on mortality rates using MIMIC IV dataset and chest X-ray embeddings (CXR)",
    ],
    technologies: ["Python", "Machine Learning", "Data Analysis", "Medical Imaging"],
  },
];

// Extracurricular Activities & Volunteering
export const activities = [
  {
    role: "Secretary",
    organization: "Toastmasters International",
    type: "Leadership",
    duration: "Jan 2024 – Jun 2024",
    durationText: "6 mos",
    location: "Chennai, Tamil Nadu, India",
    description: [
      "Coordinated with club officers and members to schedule meetings and special events",
      "Demonstrated excellent teamwork and coordination abilities",
    ],
    skills: ["Public Speaking", "Communication", "Leadership"],
    icon: "Users",
  },
  {
    role: "Member",
    organization: "Toastmasters International",
    type: "Development",
    duration: "Mar 2023 – Dec 2023",
    durationText: "10 mos",
    location: "Chennai, Tamil Nadu, India",
    description: [
      "Actively participated in public speaking and leadership development programs",
      "Enhanced communication and presentation skills",
    ],
    skills: ["Public Speaking", "Communication", "Team Work"],
    icon: "Mic",
  },
  {
    role: "Volunteer",
    organization: "National Service Scheme (NSS)",
    type: "Volunteering",
    duration: "Dec 2021 – Jan 2023",
    durationText: "1 yr 2 mos",
    location: "Chennai, Tamil Nadu, India",
    description: [
      "Organized and participated in community service initiatives",
      "Contributed to social welfare programs and awareness campaigns",
      "Improved teamwork and event planning skills through hands-on experience",
    ],
    skills: ["Community Service", "Teamwork", "Event Planning", "Social Responsibility"],
    icon: "Heart",
  },
];

export const projects = [
  {
    id: "automated-parking-system",
    title: "Automated Parking System",
    description:
      "A mobile app for automated parking management with real-time slot booking, OTP authentication, and integrated payments.",
    longDescription:
      "Developed an automated parking system app using Flutter by incorporating various Object-Oriented Programming (OOP) concepts throughout the application. Implemented user authentication via real-time OTP generation with Firebase API and real-time payment support has been integrated using RazorPay API.",
    technologies: ["Flutter", "Firebase", "RazorPay API", "Dart"],
    features: [
      "Real-time OTP authentication",
      "Live parking slot availability",
      "Integrated payment gateway",
      "User-friendly booking interface",
    ],
    image: "", // Add project screenshot
    github: "",
    live: "",
    featured: true,
  },
  {
    id: "hospital-management-system",
    title: "Hospital Management System",
    description:
      "A comprehensive digital solution for hospital administration, patient records, and appointment scheduling.",
    longDescription:
      "Engineered an efficient Hospital Management System, streamlining administrative tasks and patient care through comprehensive digital records and appointment scheduling.",
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript", "Node.js", "SQL"],
    features: [
      "Patient record management",
      "Appointment scheduling",
      "Admin dashboard",
      "Digital health records",
    ],
    image: "", // Add project screenshot
    github: "",
    live: "",
    featured: true,
  },
  {
    id: "car-rental-website",
    title: "Car Rental Website",
    description:
      "A dynamic website for car rental services showcasing vehicle options, rates, and reservation functionalities.",
    longDescription:
      "Created a dynamic static website for a Car Rental System, showcasing vehicle options, rates, and reservation functionalities. Demonstrated proficiency in web design and user experience enhancement.",
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    features: [
      "Vehicle catalog with filters",
      "Rate comparison",
      "Reservation system",
      "Responsive design",
    ],
    image: "", // Add project screenshot
    github: "",
    live: "",
    featured: true,
  },
];

export const skills = {
  languages: [
    { name: "Swift", level: 90 },
    { name: "Python", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Java", level: 80 },
    { name: "C", level: 75 },
    { name: "SQL", level: 80 },
    { name: "HTML/CSS", level: 90 },
    { name: "Dart", level: 75 },
  ],
  frameworks: [
    { name: "Flutter", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Bootstrap", level: 85 },
    { name: "React.js", level: 75 },
  ],
  aiAndData: [
    { name: "LangChain", level: 85 },
    { name: "Prompt Engineering", level: 85 },
    { name: "Artificial Intelligence", level: 80 },
    { name: "Machine Learning", level: 75 },
  ],
  other: [
    { name: "macOS Development", level: 90 },
    { name: "OOP", level: 85 },
    { name: "Data Structures", level: 85 },
    { name: "DBMS", level: 80 },
    { name: "Git/GitHub", level: 85 },
    { name: "Firebase", level: 80 },
  ],
};

// Skill categories for the Skills section with icons
export const skillCategories = [
  {
    name: "Languages",
    icon: "Code2",
    skills: ["Swift", "Python", "JavaScript", "Java", "C", "SQL", "HTML/CSS", "Dart"],
  },
  {
    name: "Frameworks",
    icon: "Layout",
    skills: ["Flutter", "Node.js", "Bootstrap", "React.js"],
  },
  {
    name: "AI & ML",
    icon: "Brain",
    skills: ["LangChain", "Prompt Engineering", "Artificial Intelligence", "Machine Learning"],
  },
  {
    name: "Tools & Other",
    icon: "Wrench",
    skills: ["macOS Development", "Git/GitHub", "Firebase", "OOP", "Data Structures", "DBMS"],
  },
];

// All skills from LinkedIn (28 total)
export const allSkills = [
  "LangChain",
  "Prompt Engineering",
  "Artificial Intelligence (AI)",
  "Team Work",
  "Flutter",
  "Swift",
  "CSS",
  "Bootstrap",
  "NodeJS",
  "Object-Oriented Programming (OOP)",
  "Data Structures",
  "Database Management System (DBMS)",
  "OOAD",
  "Machine Learning",
  "Python",
  "Leadership Development",
  "Teamwork",
  "Leadership",
  "Communication",
  "Public Speaking",
];

export const organizations = [
  {
    name: "Toastmasters International",
    role: "Secretary",
    duration: "Jan 2024 – Jun 2024",
    description:
      "Coordinated with club officers and members to schedule meetings and special events, showcasing excellent teamwork and coordination abilities.",
    skills: ["Public Speaking", "Communication", "Leadership"],
  },
  {
    name: "National Service Scheme",
    role: "Student Organizer",
    description:
      "Organized and participated in community service initiatives, which improved my teamwork and event planning skills.",
    skills: ["Teamwork", "Event Planning"],
  },
];

export const achievements = [
  {
    title: "B.A. Degree in Hindi",
    description:
      "Completed all eight exams conducted by Dakshina Bharat Hindi Prachar Sabha.",
  },
];

export const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sivasuryaa-m-k/",
    icon: "Linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/sivasuryaa-mk/",
    icon: "Github",
  },
  {
    name: "Email",
    url: "mailto:sivasuryaa2004@gmail.com",
    icon: "Mail",
  },
];

// Navigation items
export const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Activities", href: "#activities" },
  { name: "Contact", href: "#contact" },
];
