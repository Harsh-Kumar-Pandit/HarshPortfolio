export const projects = [
  {
    id: "nexinterview",
    title: "NexInterview — AI Technical Interview Platform",
    description: "AI-powered technical interview platform with real-time code execution, video interviews, and intelligent feedback analysis.",
    category: "Full Stack",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Stream SDK", "Monaco Editor", "Piston API", "Gemini API"],
    image: "/assets/images/nexinterview.png",
    github: "https://github.com/Harsh-Kumar-Pandit/NexInterview",
    liveDemo: "https://github.com/Harsh-Kumar-Pandit/NexInterview",
    featured: true,
    details: "NexInterview is a full-stack AI-powered interview platform where interviewers and candidates connect via live 1-on-1 video calls, collaborate in a real VSCode-powered code editor, and receive instant feedback. Built using Stream SDK for real-time video and chat, it includes an in-browser code editor with Monaco Editor supporting Java, Python, and JavaScript, integrating Piston API for automated test case execution, and utilizes Gemini API for real-time code analysis."
  },
  {
    id: "nexchat",
    title: "NexChat — Real-Time Messaging",
    description: "Low-latency real-time messaging platform with group chat, media sharing, and secure authentication.",
    category: "Full Stack",
    techStack: ["React", "Node.js", "Express", "Socket.io", "MongoDB", "Tailwind CSS", "JWT", "Zustand"],
    image: "/assets/images/nexchat.png",
    github: "https://github.com/Harsh-Kumar-Pandit/Nex-Chat-Real-Time-Chatting",
    liveDemo: "https://nex-chat-real-time-chatting.vercel.app/chat",
    featured: true,
    details: "NexChat is a messaging web application designed with low latency in mind (<100ms message delivery). It uses Socket.io for group and direct communication, incorporates secure JWT authentication with HTTP-only cookies, and integrates cloud storage for image and file sharing."
  },
  {
    id: "aurex",
    title: "Aurex — Full-Stack E-Commerce Platform",
    description: "Full storefront + admin dashboard + REST API with Stripe payments and optimized checkout.",
    category: "Full Stack",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Cloudinary", "Tailwind CSS"],
    image: "/assets/images/aurex.png",
    github: "https://github.com/Harsh-Kumar-Pandit/E-commerce-backend",
    liveDemo: "https://e-commerce-frontend-five-khaki.vercel.app",
    adminDemo: "https://ecommerce-admin-sable-two.vercel.app",
    featured: true,
    details: "Aurex is a full-stack e-commerce platform with a customer storefront and admin dashboard, managing an inventory of over 50 products. It integrates Stripe payment gateway enabling secure checkout and order processing workflows, and optimizes MongoDB queries and indexing strategy to minimize API latency."
  },
  {
    id: "siteforge",
    title: "SiteForge — AI Website Builder (Ongoing)",
    description: "AI website builder and portfolio generator with editable code in real time.",
    category: "Full Stack",
    techStack: ["React", "Node.js", "Express", "MongoDB", "TypeScript"],
    image: "/assets/images/dashboard.png",
    github: "https://github.com/Harsh-Kumar-Pandit/SiteForge",
    liveDemo: "https://github.com/Harsh-Kumar-Pandit/SiteForge",
    featured: false,
    details: "SiteForge is an AI website builder and portfolio generator with editable code output, enabling users to customize their generated layouts in real time. It uses Node.js and MongoDB to manage templates and user projects."
  },
  {
    id: "realestate",
    title: "Real Estate — Property Listing Platform",
    description: "React-based property listing frontend with search, filters, and detailed property views.",
    category: "Frontend",
    techStack: ["React", "Tailwind CSS", "React Router", "JavaScript"],
    image: "/assets/images/dashboard.png",
    github: "https://github.com/Harsh-Kumar-Pandit/real-estate-frontend",
    liveDemo: "https://real-estate-frontend-bay-ten.vercel.app",
    featured: false,
    details: "A responsive React frontend for a real estate platform. Users can browse property listings, filter by type and budget, and view detailed property pages. Deployed live on Vercel."
  },
  {
    id: "courseselling",
    title: "Course Selling — Backend API System",
    description: "Backend REST API for a course-selling platform with auth, admin roles, and purchase access control.",
    category: "Backend",
    techStack: ["Node.js", "Express", "MongoDB", "JWT", "Mongoose", "Zod"],
    image: "/assets/images/dashboard.png",
    github: "https://github.com/Harsh-Kumar-Pandit/course-selling-",
    liveDemo: "https://github.com/Harsh-Kumar-Pandit/course-selling-",
    featured: false,
    details: "A complete backend system for a course selling platform. Implements user and admin authentication using JWT, role-based access control, course creation by admins, and purchase verification for learners. Validated with Zod schema validation."
  },
  {
    id: "sukoon",
    title: "Sukoon — Wellness & Mindfulness App",
    description: "Full-stack wellness application focused on mental health, mood tracking, and mindfulness resources.",
    category: "Frontend",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "/assets/images/dashboard.png",
    github: "https://github.com/Harsh-Kumar-Pandit/Sukoon-repo",
    liveDemo: "https://sukoon-repo.vercel.app",
    featured: false,
    details: "Sukoon is a wellness-focused full-stack web application providing mindfulness content, mood tracking, and mental health resources. Built with a React frontend and Node.js/Express backend, deployed on Vercel."
  },
  {
    id: "eateasy",
    title: "EatEasy — Food Ordering App",
    description: "Food ordering web app with menu browsing, cart management, and order placement.",
    category: "Full Stack",
    techStack: ["React", "JavaScript", "CSS3", "React Router"],
    image: "/assets/images/dashboard.png",
    github: "https://github.com/Harsh-Kumar-Pandit/EatEasy",
    liveDemo: "https://github.com/Harsh-Kumar-Pandit/EatEasy",
    featured: false,
    details: "EatEasy is a React-based food ordering application featuring menu browsing by category, a cart system, and an order placement flow. Built to practice React component architecture and state management."
  }
];

export default projects;
