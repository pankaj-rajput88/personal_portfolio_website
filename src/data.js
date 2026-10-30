// Yahan apni info edit karo. Poori website isi file se data leti hai.

export const me = {
  name: "Pankaj Lodhi",
  role: "Full Stack Developer",
  location: "Ghaziabad, India",
  education: "B.Tech CS, ABES Engineering College",
  stack: ["React", "NodeJS", "ExpressJS", "MongoDB", "Python"],
  email: "pankajrajput884089@gmail.com",
  github: "https://github.com/pankaj-rajput88",
  linkedin: "https://www.linkedin.com/in/pankaj-rajput-527bb3326",
};

export const skills = [
  { title: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"] },
  { title: "Backend", items: ["NodeJS", "ExpressJS", "Python"] },
  { title: "CS Fundamentals", items: ["C", "C++", "Java"] },
  { title: "Database", items: ["SQL", "MongoDB"] },
  { title: "DevOps", items: ["Git", "GitHub", "Netlify", "VS Code"] },
];

export const projects = [
  {
    title: "Portfolio Website",
    tech: ["HTML", "CSS", "JavaScript", "TypeScript"],
    desc: "A fully responsive personal portfolio showcasing my work as a designer and developer, with smooth animations, clean typography and a modern UI.",
    live: "https://pankaj-rajput88.github.io/updatedportfolio/",
    code: "",   // GitHub repo ka link yahan daalo
    image: "",  // jaise: "/portfolio.png" (public folder me rakho)
  },
  {
    title: "Real-Time Weather Forecast",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    desc: "Weather app that fetches real-time data from a weather API and lets users search any city for current conditions.",
    live: "",   // live link milne par yahan daalo
    code: "",   // GitHub repo ka link
    image: "",
  },
  {
    title: "Spotify Clone",
    tech: ["HTML", "CSS", "JavaScript", "Spotify API"],
    desc: "Music streaming UI that uses the Spotify API to fetch playlists, tracks and artist information with dynamic search.",
    live: "",
    code: "",
    image: "",
  },
];

export const journey = [
  {
    type: "Experience",
    date: "Jan 2025 — Mar 2025",
    title: "Programming Tutor — C, C++, HTML & CSS",
    sub: "Offline classes",
    text: "Taught C, C++, HTML and CSS basics in offline mode, helping beginners write their first programs and web pages.",
  },
  {
    type: "Achievement",
    date: "2025",
    title: "Built and deployed multiple front-end projects",
    text: "Developed and deployed a personal portfolio, a real-time weather app and a Spotify clone using HTML5, CSS3, JavaScript (ES6+) and Bootstrap, while maintaining a strong academic record.",
  },
  {
    type: "Education",
    date: "2023 — 2027",
    title: "B.Tech — Computer Science",
    sub: "ABES Engineering College, Ghaziabad",
    text: "Undergraduate degree in Computer Science. CGPA: 7.1.",
  },
];