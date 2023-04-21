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
  pano,
  eventmaker,
  enovee,
  dsp,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
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
    title: "Web Programming Teacher",
    company_name: "Freelance",
    icon: dsp,
    iconBg: "#E6DEDD",
    date: "Jan 2019 - today",
    points: [
      "Teaching to Bachelor and Master Degrees computer science and web development",
      "Creation of programms including exercices for better learning experience",
      "Working in several schools and university and having different feedbacks from different profiles",
      "Improving communication skills and learning how to drive long courses",
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
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
