import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
  pano,
  eventmaker,
  enovee,
  dsp,
  mainlogo,
  edumation,
  edumation_login,
  edumation_schedule,
  edumation_profile,
  railguessr,
  railguessr_home,
  railguessr_daily,
  fuchibol,
  fuchibol_prediction,
  fuchibol_games,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Front End Developer",
    icon: web,
  },
  {
    title: "Back End Developer",
    icon: mobile,
  },
  {
    title: "DevOps",
    icon: backend,
  },
  {
    title: "Web Programming Teacher",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Front End Developer",
    company_name: "EventMaker",
    icon: eventmaker,
    iconBg: "#383E56",
    date: "Jan 2016 - Dec 2016",
    points: [
      "Developing and maintaining web pages for major European Events",
      "Creation of landing pages for subscriptions",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Working in a agile environment",
    ],
  },
  {
    title: "Back End Developer",
    company_name: "Enovee",
    icon: enovee,
    iconBg: "#E6DEDD",
    date: "Jan 2017 - Dec 2017",
    points: [
      "Developing and maintaining web applications using AngularJS, CakePHP and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Back End  Developer",
    company_name: "Panorabanques",
    icon: pano,
    iconBg: "#383E56",
    date: "Jan 2018 - Dec 2018",
    points: [
      "Creation and maintaining of automation bots",
      "Working close with client for better customization of the product",
      "Implementing automation tasks in several technologies as Javascript, PHP and Java",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Digital School of Paris",
    icon: dsp,
    iconBg: "#E6DEDD",
    date: "Jan 2018 - Dec 2018",
    points: [
      "Developing a activity reservation Progressive Web App using ReactJS",
      "Conception and deployment of an API using NodeJS and Express framework",
      "Implementing a CI/CD pipeline for test and deployment automation using Jenkins, Git and Docker",
      "Creation of large variety of tests, unitary, functional and end to end testing",
    ],
  },
  {
    title: "Freelance Web Developer",
    company_name: "Independent",
    icon: mainlogo,
    iconBg: "#383E56",
    date: "Jan 2019 - today",
    points: [
      "As a Freelance Full Stack Developer, I design and build custom web applications from concept to production.",
      "I work across the entire development lifecycle including architecture design, front-end and back-end implementation, database modeling, deployment and maintenance.",
      "My work primarily focuses on scalable React and Node.js applications, API development, automation workflows and production-ready systems deployed using modern DevOps practices.",
      "I collaborate directly with clients to transform business ideas into functional digital products, ensuring performance, maintainability and long-term scalability while adapting quickly to evolving project requirements.",
    ],
  },
  {
    title: "Freelance Programming Teacher",
    company_name: "Independent",
    icon: mainlogo,
    iconBg: "#1d1836",
    date: "Jan 2019 - today",
    points: [
      "As an Independent Programming Instructor, I have delivered over 7,000 hours of technical training in private higher-education institutions, teaching students from Bachelor to Master level.",
      "My teaching covers both theoretical foundations and real-world software engineering practices, helping students understand not only how to code but how to design, structure and communicate complex technical systems.",
      "This experience has strengthened my ability to break down complex concepts, document architectures clearly and collaborate efficiently with both technical and non-technical stakeholders — skills directly transferable to professional software development environments.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Edumation",
    description:
      "Edumation is a comprehensive education management platform focused on solving complex scheduling and administrative challenges.",
    longDescription:
      "Edumation is a comprehensive education management platform focused on solving complex scheduling and administrative challenges. The application enables institutions to manage schools, teachers, students, courses, programs and quizzes while automatically generating optimized schedules based on availability constraints. Designed with scalability in mind, the project aims to progressively evolve into a complete ecosystem for professional training and educational operations.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "docker",
        color: "pink-text-gradient",
      },
    ],
    image: edumation,
    images: [edumation, edumation_login, edumation_schedule, edumation_profile],
    source_code_link: "https://github.com/",
  },
  {
    name: "Railguessr",
    description:
      "Railguessr is an online geography and transit-based game inspired by exploration and deduction mechanics.",
    longDescription:
      "Railguessr is an online geography and transit-based game inspired by exploration and deduction mechanics. Players can guess the station of the day or reconstruct metro routes in the correct order across multiple cities and difficulty modes. Built as an experimentation project around game design, engagement mechanics and web monetization through advertising.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "canvas",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
      {
        name: "online",
        color: "orange-text-gradient",
      },
    ],
    image: railguessr,
    images: [railguessr, railguessr_home, railguessr_daily],
    source_code_link: "https://github.com/",
    live_link: "https://railguessr.com/",
  },
  {
    name: "FuchibolHub",
    description:
      "FuchibolHub is a football-focused platform gathering multiple interactive mini-games designed for fan engagement and competition.",
    longDescription:
      "FuchibolHub is a football-focused platform gathering multiple interactive mini-games designed for fan engagement and competition. Its flagship feature is a large-scale prediction system built around the 2026 FIFA World Cup, allowing users to forecast match outcomes and tournament progress. The project explores gamification, community interaction and scalable event-driven application design.",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "socket.io",
        color: "pink-text-gradient",
      },
    ],
    image: fuchibol,
    images: [fuchibol, fuchibol_prediction, fuchibol_games],
    source_code_link: "https://github.com/",
  },
  {
    name: "Fresh.win",
    description:
      "Fresh.win is a sports prediction platform centered around football competitions from Europe’s top leagues.",
    longDescription:
      "Fresh.win is a sports prediction platform centered around football competitions from Europe’s top leagues. Instead of gambling with money, users compete through probability-based match predictions, rankings and community challenges. The platform integrates gamification systems such as daily rewards, referral programs, streak mechanics and seasonal competitions to maximize engagement while promoting responsible play.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "gamification",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: null,
    images: [],
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
