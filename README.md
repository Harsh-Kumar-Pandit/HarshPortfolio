# Premium MERN Stack Glassmorphic Portfolio

A high-performance, modern, and production-ready portfolio website featuring a sleek glassmorphic UI design, real-time interactive showcases, and full-stack integrations.

---

## 🚀 Features

- **Premium Design System**: Replicated from state-of-the-art glassmorphism tokens, utilizing curated deep space colors, neon gradients, and premium typography.
- **Dynamic Theming**: Interactive Light/Dark mode switcher with seamless local persistence.
- **Interactive Project Showcase**: Dynamic filtering (by stack categories) and search parsing on the Projects page.
- **Detailed Modals**: Engaging modal overlays containing full project details, tech lists, and CTA links.
- **B.Tech CSE Timeline**: Interactive milestone tracker detailing engineering education and internship history.
- **MERN Contact Form**: A glassmorphic form with validation connecting directly to a Node.js/Express backend storing messages securely in MongoDB Atlas.
- **SEO Optimized**: Pre-configured page titles and descriptions via `react-helmet-async`.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS v3.4.15**
- **Framer Motion** (for micro-animations and route transitions)
- **React Router DOM**
- **Axios** (for API communication)
- **Lucide React** (iconography)

### Backend
- **Node.js**
- **Express.js**

### Database & Security
- **MongoDB Atlas**
- **Mongoose** (ODM)
- **CORS & Dotenv**

---

## 📂 Project Structure

```text
portfolio/
├── client/                 # React Frontend
│   ├── public/             # Static Assets (Images, PDFs, Resume)
│   ├── src/
│   │   ├── assets/         # Dynamic asset files
│   │   ├── components/     # Reusable components (Navbar, Footer, ProjectCard)
│   │   ├── data/           # Local static data files (projects, skills, timeline)
│   │   ├── hooks/          # Custom hooks (useTheme)
│   │   ├── layouts/        # Layout wrappers
│   │   ├── pages/          # Routed pages (Home, Projects, About)
│   │   ├── services/       # API call wrappers (api.js)
│   │   ├── utils/          # Utility scripts
│   │   ├── App.jsx         # App routes & provider wraps
│   │   ├── index.css       # Tailwind directives & custom glass tokens
│   │   └── main.jsx        # Root index entry
│   ├── tailwind.config.js  # Curated design tokens
│   └── vite.config.js      # Vite build setup
│
├── server/                 # Express Backend
│   ├── config/             # DB configurations
│   ├── controllers/        # Route controllers
│   ├── models/             # Schema definitions (Message)
│   ├── routes/             # REST route mappings
│   ├── middleware/         # Express middleware
│   ├── server.js           # Server application entry
│   └── .env.example        # Environment parameters
│
├── README.md               # Setup and info manual
└── PROJECT_FLOW.md         # Full architecture and flow specs
```

---

## ⚙️ Quick Start

### Prerequisites
- Node.js (v18+)
- npm / yarn
- A MongoDB Atlas Database URL

### 1. Database & Server Setup
1. Navigate to the server folder:
   ```bash
   cd portfolio/server
   ```
2. Install server-side dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Edit the `.env` file and replace `MONGODB_URI` with your MongoDB connection string (e.g. `mongodb+srv://...`):
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   NODE_ENV=development
   ```
5. Start the Express backend:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000` and confirm MongoDB connectivity in the terminal.

### 2. Client Setup
1. Navigate to the client folder:
   ```bash
   cd portfolio/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will launch on `http://localhost:5173`.

---

## 🧪 Production Verification

To build and compile the application for deployment:

### Client Build
```bash
cd portfolio/client
npm run build
```
This output is saved into the `dist/` directory, optimized and ready for production hosting.

### Server Deployment
Set the `NODE_ENV` to `production` and configure the environment variables in your server hosting settings (e.g., Render, Railway, AWS).
