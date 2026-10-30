# My Portfolio

This is my personal portfolio website. I made it so I can show my projects and skills to companies when I apply for off-campus jobs and internships. I'm a B.Tech CSE student at ABES Engineering College, Ghaziabad, and I'm learning full stack development.

Live site: (add link after deploying)

## What's in it

The site has a hero section, an about section, my skills, my projects, a small timeline of my journey, and a contact form. There is a dark and light mode button, and it works on both phone and laptop. You can also download my resume from the hero section.

All the text on the site (skills, projects, links) comes from one file, `src/data.js`. So if I want to add a new project, I only change that file.

## Built with

React (using Vite), JavaScript, plain CSS, lucide-react for icons, and Git/GitHub.

## How to run it

```bash
git clone https://github.com/pankaj-rajput88/your-repo-name
cd your-repo-name
npm install
npm run dev
```

It opens on http://localhost:5173

## Problems I ran into

This was my first time building a full portfolio in React, so I got stuck a few times.

At the start I didn't understand where each file should go. Vite makes some default files and I had to replace some of them and delete others, like App.css. I pasted code in the wrong place a couple of times and got errors. After a while I understood how main.jsx, App.jsx and the components connect to each other.

My Skills and Projects sections were not showing at all. I spent time on it and found that my data.js only had `me` in it. The other things (skills, projects, journey) were missing, so the components had nothing to import. That's when I properly understood how export and import work, and that the names have to match exactly.

Something similar happened with the Journey section. I made the component, but it still didn't show on the page, because I forgot to import it in App.jsx and add it there. Just creating a file is not enough.

I also made a silly mistake in my email, my name got repeated twice. Then I checked my resume and saw some links were still placeholders like `ProjectLink.com`. If a recruiter clicks a wrong link, they can't reach me, so I now check every link.

The dark/light mode took me the longest to understand. What I got in the end is that colors are stored in CSS variables, and the button just changes a `data-theme` value on the page. The variables change and the whole site changes with them.

Things I'm still not fully comfortable with: useEffect, how props are passed between components, and Grid vs Flexbox. I'm practicing these.

## How I made it

I used AI help to get started and to understand how things work. After that I went through the code, changed things on my own, and fixed the errors above. I'm still learning, and I can explain what each part of this project does.

## What I want to add next

A backend with Node, Express and MongoDB so the contact form messages get saved in a database. Also project screenshots, some animations, and then deploying everything.

## Contact

Email: pankajrajput884089@gmail.com
LinkedIn: https://www.linkedin.com/in/pankaj-rajput-527bb3326
GitHub: https://github.com/pankaj-rajput88