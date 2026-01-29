# Voting Application - Frontend

A modern, responsive voting application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Running with Docker](#running-with-docker)
- [Building for Production](#building-for-production)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)

## 📦 Prerequisites

### Local Development

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher (or yarn/pnpm)

### Docker

- **Docker** 20.10 or higher
- **Docker Compose** 2.0 or higher

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/voting-app.git
cd voting-app/day-1
```

### 2. Install Dependencies (Local)

```bash
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag is required due to `react-nepal-map` being built for React 16 while the project uses React 19.

## 🏃 Running Locally

### Development Mode (with Hot Reload)

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

Changes to your code will automatically refresh the browser.

### Preview Production Build

```bash
npm run build    # Build the application
npm run preview  # Preview the production build
```

The preview will be available at `http://localhost:4173`

## 🐳 Running with Docker

### Prerequisites Setup

Docker and Docker Compose automatically handle dependency installation with `--legacy-peer-deps`.

### Development with Docker (Recommended for isolation)

```bash
docker compose up
```

- Application runs at `http://localhost:5173`
- Supports hot reload - changes to code update automatically
- Volume mapping keeps your local and container code in sync

### Rebuild (if you add new dependencies)

```bash
docker compose down
docker compose build --no-cache
docker compose up
```

### Stop Docker

```bash
docker compose down
```

## 🏗️ Building for Production

### Local Build

```bash
npm run build
```

Output will be in the `dist/` folder.

### Docker Production Build

```bash
docker build -f Dockerfile -t voting-app:prod .
docker run -p 4173:4173 voting-app:prod
```

## 🔧 Environment Variables

Create a `.env.local` file in the `day-1` directory for local development:

```env
VITE_API_URL=http://localhost:5000/api
```

An `.env.example` file is provided as a template.

## 📁 Project Structure

```
day-1/
├── src/
│   ├── components/        # Reusable React components
│   ├── features/          # Feature-specific components
│   ├── context/           # React Context (auth, state management)
│   ├── api/               # API setup and data fetching
│   ├── layout/            # Layout components
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Entry point
│   └── index.css           # Global styles
├── public/                # Static assets
├── Dockerfile            # Production Docker image
├── Dockerfile.dev        # Development Docker image
├── docker-compose.yml    # Docker Compose configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## 📝 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server (port 5173) |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview production build locally     |
| `npm run lint`    | Run ESLint to check code quality     |

## 🔗 Dependencies

### Core

- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Routing

### Styling

- `tailwindcss` - Utility-first CSS framework
- `clsx` - Classname utilities

### Forms & Validation

- `react-hook-form` - Performant form library

### Icons & UI

- `react-icons` - Icon library
- `react-loading-indicators` - Loading spinners
- `react-nepal-map` - Nepal map component

### API

- `axios` - HTTP client

### Development Tools

- `typescript` - Type safety
- `vite` - Build tool
- `eslint` - Code linting

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### Issue: `Cannot find module '@rollup/rollup-linux-x64-gnu'`

**Solution:** Delete `node_modules` and `package-lock.json`, then reinstall:

```bash
rm -r node_modules package-lock.json  # Mac/Linux
Remove-Item -Recurse -Force node_modules, package-lock.json  # Windows
npm install --legacy-peer-deps
```

### Issue: Port 5173 already in use

**Solution:** Change the port in `vite.config.ts` or use Docker to isolate the environment:

```bash
docker compose up
```

### Issue: Hot reload not working in Docker

**Solution:** Ensure volumes are properly mounted:

```yaml
volumes:
  - .:/app # Mount entire project
  - /app/node_modules # Preserve container node_modules
```

## 📞 Support

For issues and questions, please create an issue in the GitHub repository.

---

**Happy coding! 🎉**
